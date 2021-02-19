import * as React from 'react';
import { StyleSheet, Text, View, Button, Platform, TouchableOpacity, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import { Octicons, AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';
import BottomSheet from 'reanimated-bottom-sheet';
import moment, { weekdays } from 'moment';
import { Card } from 'native-base';
import { AddressContent, BackgroundHeader, screenHeight, screenWidth } from '../../../../../../components/Styles';
import { ROUTES } from '../../../../../../config/consts/routes';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reducers';

import tennisIcon from '../../../../../../assets/images/calendar/tennis_2x.png';
import france_vs_italy from '../../../../../../assets/images/discover/france_vs_italy_2x.png';

const BottomSheetComponent = ({ bottomSheetFirstPoint, bottomSheetSecondPoint, activeDate, setHorizontal }: any) => {
  const { goBack, navigate } = useNavigation();   
  const sheetRef = React.useRef(null);
  const events = useSelector((state: RootState) => state.event)
  const [currentDayEvents, setCurrentDayEvents] = useState<any[]>([])

  const eventDetailsHandler = (eventId: any) => {
    navigate(ROUTES.SCREEN_EVENTS_DETAILS, {
        eventId
    });
  }

  const CalendarItem = ({ content }: any) => {
    let currentDate = '';
    return (
        // <ScrollView showsVerticalScrollIndicator={false}>
            content.sort((a: any, b: any) => { return +moment(a.time) - +moment(b.time) }).map((item: any, index: any) => {
                let showDate = false;
                if(currentDate.length === 0) {
                    currentDate = moment(item.time).format('YYYY-MM-DD')
                    showDate = true;
                } else {
                    if(moment(currentDate).format('YYYY-MM-DD') !== moment(item.time).format('YYYY-MM-DD')) {
                        currentDate = moment(item.time).format('YYYY-MM-DD')
                        showDate = true;
                    }
                }
                return(<View key={index}>
                    {showDate ? <Text style={{ textTransform: 'uppercase', fontSize: 20, backgroundColor: '#FFFFFF', marginTop: 10 ,paddingStart: 25, paddingEnd: 25 }}>
                        <Text style={{fontWeight: 'bold', fontFamily: 'TradeGothic_bold'}}>{moment(item.time).format("DD MMMM")}</Text>
                        <Text style={[{ fontFamily: 'TradeGothic_bold', color: '#FFFFFF' }, styles.outLineText]}>{" "}{moment(item.time).format("dddd")}</Text>
                    </Text> : null}
                    <TouchableOpacity onPress={() => eventDetailsHandler(item.id)} style={{flexDirection: 'row', width: (screenWidth), marginTop: 10 ,paddingStart: 25, paddingEnd: 25, backgroundColor: "#FFFFFF"}}>
                        <Card style={{height:120, width: '40%', backgroundColor: '#122C5B', overflow: 'hidden'}}>
                            <BackgroundHeader source={france_vs_italy} style={{ justifyContent: 'center'}}/>
                            <View style={{ position: 'absolute', bottom: 5, left: 5, width: 30, height: 30, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                                <Image source={{ uri: item.sport.icon }} style={{ width: 20, height: 20 }} />
                            </View>
                        </Card>
                        <View style={{marginTop: 5,marginBottom: 5, width: '60%', paddingLeft: 10, paddingRight: 10}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                                <Text style={{fontFamily: 'TradeGothic_bold',fontSize: 12, color: true ? '#A9EA1B' : false ? '#FFB550' : '#FE736C'}}><Entypo name={'ticket'} size={14} style={{transform: [{rotateY: '100deg'}]}}/>{' '}Tickets Available</Text>
                                <Text style={{ fontSize: 12, color: '#9B9B9B'}}><AntDesign name='clockcircleo'/>{' '}{moment(item.time).format('h:mm a')}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 17, color: '#000000', textTransform: 'uppercase', fontWeight: 'bold', fontFamily: 'TradeGothic_bold'}}>{item.title}</Text>
                            </View>
                            <AddressContent>
                                {item.venue}
                            </AddressContent>
                            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                <View style={{flexDirection: 'row', bottom: 0, justifyContent: 'space-between', alignItems: 'center'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{backgroundColor: '#F0F0F0', padding: 5, borderRadius: 5}}>
                                            <Text style={{fontSize: 12, fontFamily: 'OpenSans_semibold'}}>
                                                {!!item.tournament ? item.tournament.name : 'No Info'}
                                            </Text>
                                        </View>
                                        <TouchableOpacity style={{marginLeft: 10, backgroundColor: '#F0F0F0', padding: 5, borderRadius: 5}}>
                                            <FontAwesome name='television' size={15} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity>
                                        <AntDesign name='hearto' color='#000000' size={15}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>)
            })
        // </ScrollView>
    );
  }

  const bottomSheetContent = () => {
      return (
          <View style={[{ backgroundColor: '#FFFFFF',width: '100%'}, currentDayEvents.length < 5 && {height: screenHeight}]}>
              {/* <TouchableOpacity style={{ position: 'absolute', marginTop: 25 }}>
                  <View style={{ width: 50, backgroundColor: '#000000', height: 4 }} />
              </TouchableOpacity> */}
              {currentDayEvents.length > 0 ? 
                  <CalendarItem content={currentDayEvents} /> :
                  <Text style={{ textAlign: 'center', fontFamily: 'OpenSans_semibold', textTransform: 'uppercase', marginTop: 20}}>No event</Text>
              }
          </View>
      )
  }

  const bottomSheetHeader = () => {
      return (
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#FFFFFF', height: 50, borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
              <TouchableOpacity style={{ position: 'absolute', marginTop: 25 }}>
                  <View style={{ width: 50, backgroundColor: '#000000', height: 4 }} />
              </TouchableOpacity>
              {/* <View>
                  <CalendarItem content={data} />
              </View> */}
          </View>
      )
  }

  useEffect(() => {
      if(events.events.length > 0) {
        let filterCurrentDayEvents: any[] = [];
        filterCurrentDayEvents = events.events.filter((event) => moment(event.time).format('YYYY-MM-DD') === moment(activeDate).format('YYYY-MM-DD'));
        setCurrentDayEvents(filterCurrentDayEvents)
      }
      // console.log('Marked Dates: ',markedDates)
  }, [events.events,activeDate])

  return (
    <>
      <BottomSheet 
          key={bottomSheetFirstPoint}
          ref={sheetRef} 
          snapPoints={[bottomSheetFirstPoint, bottomSheetSecondPoint]}
          // snapPoints={[Platform.OS === 'ios' ? calendarHeight-60: calendarHeight-15, Platform.OS === 'ios' ? (screenHeight-(screenHeight*.6))+210: (screenHeight-(screenHeight*.6))+180]}
          // borderRadius={25}      
          initialSnap={0}  
          renderContent={bottomSheetContent}
          renderHeader={bottomSheetHeader}
          enabledBottomInitialAnimation={false}
          // callbackNode={drawerCallbackNode}
          onOpenEnd={() => setHorizontal(true)}
          onCloseEnd={() => setHorizontal(false)}
      />
    </>
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


export default BottomSheetComponent;