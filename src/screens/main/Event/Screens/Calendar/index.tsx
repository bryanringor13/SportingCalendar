import React, { useEffect, useState } from 'react'
import { Container, Header, Button, Left, Icon, Body, Title, Right, Content, Card } from 'native-base';
import { View, Text, TouchableOpacity, Image, Platform, Animated, PanResponderGestureState, PanResponder, StyleSheet, ScrollView} from 'react-native';
import { Octicons, AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../../../config/consts/routes';
// import { Calendar, CalendarList, Agenda, CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import { Calendar } from 'react-native-toggle-calendar';
import { SvgXml } from "react-native-svg"; 

// import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import moment, { weekdays } from 'moment';
import { format } from 'date-fns'

import horseRace from '../../../../../assets/images/calendar/horse_race_2x.png';
import ticketGreen from '../../../../../assets/images/calendar/ticket_green.png';
import ticketOrange from '../../../../../assets/images/calendar/ticket_orange.png';
import ticketRed from '../../../../../assets/images/calendar/ticket_red.png';
import tennisIcon from '../../../../../assets/images/calendar/tennis_2x.png';

import { AddressContent, BackgroundHeader, Divider, HeaderTitlePage, HeaderTitleText, LinerInBetween, screenHeight, ScrollContent, TextOr } from '../../../../../components/Styles';

import { ActiveDay, CurrentDay } from './styles';
import { appColor, icon } from '../../../../../config/consts/theme';
import TennisSvg from '../../../../../components/Svg/TennisSvg';
import SearchBar from '../../../../../components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvent } from '../../../../../redux/actions/event';
import { RootState } from '../../../../../redux/reducers';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BottomSheetComponent from './BottomSheetComponent';

const timeToString = (time: any) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

let selectedCalendarDate = moment();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const weekNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa","Su"]
const minimumDate = moment().add(-1, 'day'); // one day before for midnight check-in usecase
const dateNow = moment();

const CalendarScreen = () => {
    const { goBack, navigate } = useNavigation();   
    // const [items, setItems] = useState({});
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)
    const events = useSelector((state: RootState) => state.event)
    const [dateToday, setDateToday] = useState(selectedCalendarDate.format('YYYY-MM-DD'));
    const [heightReady, setHeightReady] = useState(false);
    const [currentDateChanged, setCurrentDateChanged] = useState(false)

    // const [events, setEvents] = useState({})
    const [markedDates, setMarkedDates] = useState({})
    const [activeDate, setActiveDate] = useState(selectedCalendarDate.format('YYYY-MM-DD'))
    const [activeSearchBar, setActiveSearchBar] = useState(false)
    const handleGoBack = () => {
        goBack();
    }

    const [timerHeightReady, setTimerHeightReady] = useState(null);

    // Calendar

    const [horizontal, setHorizontal] = useState(false)
    const sheetRef = React.useRef(null);
    const calendarRef = React.useRef(null);
    const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));
    const [bottomSheetFirstPoint, setBottomSheetFirstPoint] = useState(0);
    const [bottomSheetSecondPoint, setBottomSheetSecondPoint] = useState(0);
    const [currentPosition, setCurrentPosition] = useState({
        firstPosition: 0,
        secondPosition: 0
    });

    //  PanResponder
    const [allowAction, setAllowAction] = useState(false);
    const [swipeAction, setSwipeAction] = useState('');
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (_, gestureState) => setAllowAction(true),
        onPanResponderMove: (_, gestureState) => onMove(gestureState),
    })

    const onMove = (gestureState: PanResponderGestureState) => {
        console.log(gestureState.dx)
        if(gestureState.dx > 0){ 
            if(allowAction) {
                setAllowAction(false)
                console.log('Right'); 
                calendarOnSwipRight(); 
            }
        }
        if(gestureState.dx < 0){ 
            if(allowAction) {
                setAllowAction(false)
                console.log('Left'); 
                calendarOnSwipLeft(); 
            }
        }
    }

    // CalendarEnd

    const handleNavigationToFilterPage = () => {
        navigate(ROUTES.SCREEN_FILTER);
    }

    const handleNavigationToFavouritesPage = () => {
        navigate(ROUTES.SCREEN_FAVOURITES);
    }

    // const onUpdateSelectedDate = (date: any) => {
    //     setEvents({
    //         [date.dateString] : data[date.dateString]
    //     })
    // }

    const calendarHeaderComponent = () => {
        const currentDate = new Date(dateToday)
        // console.log('Date: ', date, 'Month: ',currentDate.getMonth())
        return (<View {...panResponder.panHandlers} style={{ marginTop: 20, backgroundColor: '#F7F7F7' }}>
                <CalendarHeadComponent currentDate={currentDate} />
            </View>
        )
    }

    const CalendarHeadComponent = ({ currentDate } : any) => {
        return (
            <>
                <View style={{ flexDirection: 'row' }}>
                        {months.map((month: any, index: any) => (
                            index >= currentDate.getMonth() &&
                            <Text key={index} style={[styles.monthHeadStyle, index > currentDate.getMonth() && styles.outLineText, { color: index === currentDate.getMonth() ? '#000000' : '#FFFFFF' }]} >{month}</Text>
                        ))}
                    </View>
                    { horizontal ? null : 
                <View style={{  marginTop: 15, marginBottom: 15, paddingStart: 15, paddingEnd: 15, padding: 5,flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#122C5B'}}>
                    {weekNames.map((day, index) => (
                        <Text style={{ textTransform: 'uppercase', color: '#FFFFFF', fontFamily: 'TradeGothic_bold' }} key={index} numberOfLines={1}>
                            {day}
                        </Text>
                    ))}
                </View>}
            </>
        )
    }

    const onPressArrowLeftHandler = (currentMonth: any, addMonthCallback: any) => {
        const monthStartDate = moment(currentMonth.getTime()).startOf('month');
        // don't go back for past months
        if (monthStartDate > dateNow) {
            addMonthCallback(-1);
            const selectedCalendarMonthString = moment(currentMonth.getTime())
                .add(-1, 'month')
                .format('YYYY-MM-DD');
            setDateToday(selectedCalendarMonthString);
        }
    }

    const onPressArrowRightHandler = (currentMonth: any, addMonthCallback: any) => {
        addMonthCallback(1);
        const selectedCalendarMonthString = moment(currentMonth.getTime())
            .add(1, 'month')
            .format('YYYY-MM-DD');
        setDateToday(selectedCalendarMonthString);
    }

    const calendarOnSwipLeft = () => {
        // resetTimer()
        const selectedCalendarMonthString = moment(dateToday).add(1, 'months').format('YYYY-MM-DD');
        setDateToday(selectedCalendarMonthString);
    }

    const calendarOnSwipRight = () => {
        // resetTimer()
        if (moment(dateToday).format('YYYY-MM-DD') > moment(dateNow).format('YYYY-MM-DD')) {
            const selectedCalendarMonthString = moment(dateToday).subtract(1, 'months').format('YYYY-MM-DD');
            setDateToday(selectedCalendarMonthString);
        }
    }

    const selectActieDateHandler = (date: any) => {
        console.log('Active Date: ', date)
        setActiveDate(date)
    }

    const CalendarComponent = () => {
        return (
        <Calendar
            ref={calendarRef}
            current={dateToday}
            showPastDatesInHorizontal={31}
            horizontal={horizontal}
            firstDay={1}
            markingType={'period'}
            markedDates={markedDates}
            dayComponent={({date, state, marking}: any) => {
            
                // if (marking.marked) {
                    // items = calendarData[date.dateString].length
                // }

                // console.log('Calendar Data', calendarData)
            
                return (
                    horizontal ? <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 7,
                        paddingRight: 7,
                        paddingTop: 20,
                        backgroundColor: '#F7F7F7'
                    }}>
                        <TouchableOpacity onPressIn={() => selectActieDateHandler(date.dateString)} style={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        {moment(dateNow).format('YYYY-MM-DD') === moment(date.dateString).format('YYYY-MM-DD') ? moment(activeDate).format('YYYY-MM-DD') === moment(date.dateString).format('YYYY-MM-DD') ? <CurrentDay>
                                <Text style={{textAlign: 'center', color: '#FFFFFF', fontFamily: 'OpenSans_semibold'}}>
                                    {date.day}
                                </Text>
                                {!!marking.marked && marking.marked && <View style={{
                                    width: 5,
                                    height: 5,
                                    marginTop: 1,
                                    marginHorizontal: 1,
                                    borderRadius: 2,
                                    opacity: 1,
                                    backgroundColor: appColor.dotColor,
                                    alignSelf: 'center'
                                }} />}
                            </CurrentDay> : <ActiveDay>
                                <Text style={{textAlign: 'center', color: '#FFFFFF', fontFamily: 'OpenSans_semibold'}}>
                                    {date.day}
                                </Text>
                                {!!marking.marked && marking.marked && <View style={{
                                    width: 5,
                                    height: 5,
                                    marginTop: 1,
                                    marginHorizontal: 1,
                                    borderRadius: 2,
                                    opacity: !!marking.marked && marking.marked ? 1 : 0,
                                    backgroundColor: appColor.dotColor,
                                    alignSelf: 'center'
                                }} />}
                            </ActiveDay> : moment(activeDate).format('YYYY-MM-DD') === moment(date.dateString).format('YYYY-MM-DD') ? <CurrentDay>
                                <Text style={{textAlign: 'center', color: '#FFFFFF', fontFamily: 'OpenSans_semibold'}}>
                                    {date.day}
                                </Text>
                                {!!marking.marked && marking.marked && <View style={{
                                    width: 5,
                                    height: 5,
                                    marginTop: 1,
                                    marginHorizontal: 1,
                                    borderRadius: 2,
                                    opacity: !!marking.marked && marking.marked ? 1 : 0,
                                    backgroundColor: appColor.dotColor,
                                    alignSelf: 'center'
                                }} />}
                            </CurrentDay> :
                            <View style={{ padding: 5 }}>
                                <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black', fontFamily: 'OpenSans_semibold'}}>
                                    {date.day}
                                </Text>
                                {!!marking.marked && marking.marked &&
                                <View style={{
                                    width: 5,
                                    height: 5,
                                    marginTop: 1,
                                    marginHorizontal: 1,
                                    borderRadius: 2,
                                    opacity: 1,
                                    backgroundColor: appColor.dotColor,
                                    alignSelf: 'center'
                                }} />}
                            </View>
                        }
                        </TouchableOpacity>
                    </View> :
                    <TouchableWithoutFeedback onPress={() => selectActieDateHandler(date.dateString)} >
                        {moment(dateNow).format('YYYY-MM-DD') === moment(date.dateString).format('YYYY-MM-DD') ? moment(activeDate).format('YYYY-MM-DD') === moment(date.dateString).format('YYYY-MM-DD') ? <CurrentDay>
                                <Text style={{textAlign: 'center', color: '#FFFFFF', fontFamily: 'OpenSans_semibold'}}>
                                    {date.day}
                                </Text>
                                {!!marking.marked && marking.marked && <View style={{
                                    width: 5,
                                    height: 5,
                                    marginTop: 1,
                                    marginHorizontal: 1,
                                    borderRadius: 2,
                                    opacity: !!marking.marked && marking.marked ? 1 : 0,
                                    backgroundColor: appColor.dotColor,
                                    alignSelf: 'center'
                                }} />}
                            </CurrentDay> : <ActiveDay>
                                <Text style={{textAlign: 'center', color: '#FFFFFF', fontFamily: 'OpenSans_semibold'}}>
                                    {date.day}
                                </Text>
                                {!!marking.marked && marking.marked && <View style={{
                                    width: 5,
                                    height: 5,
                                    marginTop: 1,
                                    marginHorizontal: 1,
                                    borderRadius: 2,
                                    opacity: !!marking.marked && marking.marked ? 1 : 0,
                                    backgroundColor: appColor.dotColor,
                                    alignSelf: 'center'
                                }} />}
                            </ActiveDay> : moment(activeDate).format('YYYY-MM-DD') === moment(date.dateString).format('YYYY-MM-DD') ? <CurrentDay>
                                <Text style={{textAlign: 'center', color: '#FFFFFF', fontFamily: 'OpenSans_semibold'}}>
                                    {date.day}
                                </Text>
                                {!!marking.marked && marking.marked && <View style={{
                                    width: 5,
                                    height: 5,
                                    marginTop: 1,
                                    marginHorizontal: 1,
                                    borderRadius: 2,
                                    opacity: !!marking.marked && marking.marked ? 1 : 0,
                                    backgroundColor: appColor.dotColor,
                                    alignSelf: 'center'
                                }} />}
                            </CurrentDay> :
                            <View style={{ padding: 10 }}>
                                <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black', fontFamily: 'OpenSans_semibold'}}>
                                    {date.day}
                                </Text>
                                {!!marking.marked && marking.marked && <View style={{
                                    width: 5,
                                    height: 5,
                                    marginTop: 1,
                                    marginHorizontal: 1,
                                    borderRadius: 2,
                                    opacity: !!marking.marked && marking.marked ? 1 : 0,
                                    backgroundColor: appColor.dotColor,
                                    alignSelf: 'center'
                                }} />}
                            </View>
                        }
                    </TouchableWithoutFeedback>
                );
            }}
            calendarHeaderComponent={(date: any) => calendarHeaderComponent()}
            style={{ paddingLeft: 0, paddingRight: 0, backgroundColor: '#F7F7F7' }}
            theme={{
                'stylesheet.calendar.main': {
                    monthView: {
                        backgroundColor: '#F7F7F7',
                        paddingLeft: 20,
                        paddingRight: 20
                    }
                }
            }}

            // horizontalEndReachedThreshold={50}
            // horizontalStartReachedThreshold={0}
            
            onPressArrowLeft={(currentMonth: any, addMonthCallback: any) => onPressArrowLeftHandler(currentMonth, addMonthCallback)}
            onPressArrowRight={(currentMonth: any, addMonthCallback: any) => onPressArrowRightHandler(currentMonth, addMonthCallback)}
        />)
    }

    const resetTimer = () => {
        
        clearTimeout(timerHeightReady);

        const timer = setTimeout( () => {
            setHeightReady(true)
            // console.log("Height Ready", bottomSheetFirstPoint, bottomSheetSecondPoint)
            setCurrentPosition({
                firstPosition: bottomSheetFirstPoint,
                secondPosition: bottomSheetSecondPoint
            })
        }, 100);
        
        setTimerHeightReady(timer)
    }

    useEffect(() => {
        resetTimer()
    }, [])

    useEffect(() => {
        resetTimer()
    }, [bottomSheetFirstPoint, bottomSheetSecondPoint])

    useEffect(() => {
        dispatch(fetchEvent(user.token))
    }, [])

    useEffect(() => {
        let setMarkedDate = {};
        events.events.map((data, index) => {
            Object.assign(setMarkedDate, {
                [moment(data.time).format('YYYY-MM-DD')] : { marked: true}
            })
        })

        setMarkedDates(setMarkedDate)
    },[events.events])

    return (
        <Container style={{ backgroundColor: '#F7F7F7' }}>
            {activeSearchBar ? <View style={{ flex: 1, backgroundColor: appColor.mediumLightGray }}>
                <SearchBar cancelHandler={setActiveSearchBar} />
            </View> : 
            <>
                <View 
                    onLayout={(event) => {
                            // setHeightReady(false)
                            setBottomSheetSecondPoint((screenHeight-220)-(Math.trunc(event.nativeEvent.layout.height)))
                    }}
                    >
                    <Header transparent>
                        <Left style={{ flex: 0.2 }} />
                        <Body style={{ flex: 0.4 }} />
                        <Right style={{ flex: 0.6, paddingRight: 10 }}>
                            <Button transparent onPress={() => handleNavigationToFavouritesPage()}>
                                <AntDesign name='hearto' size={24} style={{ color: '#000000' }} />
                            </Button>
                            <Button transparent onPress={() => setActiveSearchBar(true)}>
                                <Octicons name='search' size={24} style={{ color: '#000000' }} />
                            </Button>
                            <Button transparent onPress={() => handleNavigationToFilterPage()}>
                                <Image source={icon.settings} style={{ height: 25, width: 20,resizeMode: 'contain' }} />
                            </Button>
                        </Right>
                    </Header>
                    <HeaderTitlePage>
                        <HeaderTitleText>
                            My Calendar
                        </HeaderTitleText>
                    </HeaderTitlePage>
                </View>
                {horizontal ? 
                    <CalendarComponent /> : 
                    // <GestureRecognizer  
                    //     onSwipe={(gestureName) => onSwipeHandler(gestureName)}   
                    //     config={{
                    //         velocityThreshold: 0.3,
                    //         directionalOffsetThreshold: 80
                    //     }}
                    // >
                    <Animated.View {...panResponder.panHandlers}>
                        <CalendarComponent />
                    </Animated.View>
                    // </GestureRecognizer>
                }
                <View 
                    style={{
                        flex: 1,
                    }}
                    onLayout={(event) => {
                        if(!horizontal) {
                            // setHeightReady(false)
                            setBottomSheetFirstPoint(Math.trunc(event.nativeEvent.layout.height))
                        }
                    }} />
                {currentPosition.firstPosition > 0 && currentPosition.secondPosition > 0 && <BottomSheetComponent 
                    bottomSheetFirstPoint={currentPosition.firstPosition} 
                    bottomSheetSecondPoint={currentPosition.secondPosition} 
                    activeDate={activeDate} 
                    setHorizontal={setHorizontal} 
                />}
            </>}
        </Container>
    );
}

const styles = StyleSheet.create({
    monthHeadStyle: { 
        marginStart: 20, 
        marginRight: 50,
        textTransform: 'uppercase', 
        fontSize: 18, 
        fontWeight: 'bold', 
        fontFamily: 'TradeGothic_bold', 
    },
    outLineText: {
        textShadowOffset: {width: 0, height: 0}, 
        textShadowRadius: 1, 
        textShadowColor: '#000000'
    }
});
  

export default CalendarScreen
