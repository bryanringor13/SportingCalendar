import React, { useEffect, useState } from 'react'
import { View, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Body, Container, Left, Right, List, ListItem, Card, CardItem, Thumbnail, Button, Text, Separator, Header } from 'native-base';
import { FontAwesome, AntDesign, Octicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import moment, { weekdays } from 'moment';
import { BackgroundHeader, Content, EventName, HeaderContent, HeaderIcon, HeaderTitle, HeaderTitlePage, HeaderTitleText, HightLightHead, HightLightHeadText, ScreenBackground, ThumbnailContent, VerticalDivider } from '../../../../../components/Styles';

import arsenal_vs_tottenham from '../../../../../assets/images/discover/arsenal_vs_tottenham_2x.png';
import france_vs_italy from '../../../../../assets/images/discover/france_vs_italy_2x.png';
import first_race from '../../../../../assets/images/discover/first_race_2x.png';

import sportsFootball from '../../../../../assets/images/discover/football_2x.png';
import sportsDart from '../../../../../assets/images/discover/dart_2x.png';
import sportsGolf from '../../../../../assets/images/discover/golf_2x.png';
import sportsCricket from '../../../../../assets/images/discover/cricket_2x.png';
import sportsRugby from '../../../../../assets/images/discover/rugby_2x.png';
import sportsRacing from '../../../../../assets/images/discover/racing_2x.png';
import sportsHorseRacing from '../../../../../assets/images/discover/horse_racing_2x.png';
import sportsTennis from '../../../../../assets/images/discover/tennis_2x.png';

import { windowWidth } from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import { ROUTES, SCREEN } from '../../../../../config/consts/routes';
import { appColor, icon } from '../../../../../config/consts/theme';
import { RootState } from '../../../../../redux/reducers';
import SearchBar from '../../../../../components/SearchBar';

const DiscoverScreen = () => {
    const { goBack, navigate } = useNavigation();
    const route = useRoute(); // route.name
    const sports = useSelector((state: RootState) => state.sports);
    const events = useSelector((state: RootState) => state.event);
    const [activeSearchBar, setActiveSearchBar] = useState(false)
    const [majorEvents, setMajorEvents] = useState<any[]>([])
    const [featuredEvents, setFeaturedEvents] = useState<any[]>([])
    const routeName = route.name.toLowerCase();
    // const [featuredEvents, setFeaturedEvents] = useState([
    //     {id: '1', eventHeaderImage: arsenal_vs_tottenham, eventLeague: 'Premier League', eventIcon: '', eventTicketStatus: 1, eventTicketStatusText: 'Tickets Low', eventTime: '6:00 pm', eventName: 'Arsenal vs Tottenham', eventAddress: 'Rangers Lodge, Hyde Park, London, W2 2UH'},
    //     {id: '2', eventHeaderImage: france_vs_italy, eventLeague: 'Premier League', eventIcon: '', eventTicketStatus: 2, eventTicketStatusText: 'Tickets Available', eventTime: '6:00 pm', eventName: 'France vs Italy', eventAddress: 'Rangers Lodge, Hyde Park, London, W2 2UH'},
    // ])
    const [eventsNearMe, setEventsNearMe] = useState([])
    // const [eventsNearMe, setEventsNearMe] = useState([
    //     {id: '1', eventHeaderImage: france_vs_italy, eventLeague: 'Six Nations', eventIcon: '', eventTicketStatus: 1, eventTicketStatusText: 'Tickets Low', eventTime: '6:00 pm', eventName: 'France vs ITALY', eventAddress: 'Rangers Lodge, Hyde Park, London, W2 2UH'},
    //     {id: '2', eventHeaderImage: arsenal_vs_tottenham, eventLeague: 'Six Nations', eventIcon: '', eventTicketStatus: 1, eventTicketStatusText: 'Tickets Low', eventTime: '6:00 pm', eventName: 'France vs ITALY', eventAddress: 'Rangers Lodge, Hyde Park, London, W2 2UH'},
    // ])
    const [eventHappeningNow, setEventHappeningNow] = useState([])
    // const [eventHappeningNow, setEventHappeningNow] = useState([
    //     {id: '1', eventHeaderImage: first_race, eventLeague: 'Grand National', eventIcon: '', eventTicketStatus: 0, eventTicketStatusText: 'Tickets Sold Out', eventTime: '6:00 pm', eventName: 'FIRST RACE', eventAddress: 'Rangers Lodge, Hyde Park, London, W2 2UH'},
    //     {id: '2', eventHeaderImage: first_race, eventLeague: 'Grand National', eventIcon: '', eventTicketStatus: 0, eventTicketStatusText: 'Tickets Sold Out', eventTime: '6:00 pm', eventName: 'SECOND RACE', eventAddress: 'Rangers Lodge, Hyde Park, London, W2 2UH'},
    // ])

    // const [sportsThumbnailData, setSportsThumbnailData] = useState([
    //     {id: '123qwe', sportsTitle:  'Football', sportsImage: sportsFootball, themeColor: '#122C5B', fontColor: '#FFFFFF'},
    //     {id: '223qwe', sportsTitle:  'Darts', sportsImage: sportsDart, themeColor: '#1C5769', fontColor: '#FFFFFF'},
    //     {id: '323qwe', sportsTitle:  'Golf', sportsImage: sportsGolf, themeColor: '#1C5769', fontColor: '#CFF973'},
    //     {id: '1423qwe', sportsTitle:  'Cricket', sportsImage: sportsCricket, themeColor: '#122C5B', fontColor: '#FFFFFF'},
    //     {id: '523qwe', sportsTitle:  'Rugby Union', sportsImage: sportsRugby, themeColor: '#122C5B', fontColor: '#FFFFFF'},
    //     {id: '1623qwe', sportsTitle:  'Formula 1', sportsImage: sportsRacing, themeColor: '#1C5769', fontColor: '#CFF973'},
    //     {id: '1723qwe', sportsTitle:  'Horse Racing', sportsImage: sportsHorseRacing, themeColor: '#1C5769', fontColor: '#FFFFFF'},
    //     {id: '1823qwe', sportsTitle:  'Tennis', sportsImage: sportsTennis, themeColor: '#122C5B', fontColor: '#FFFFFF'},
    // ]);

    const handleGoBack = () => {
        goBack();
    }

    const featuredEventsHandler = (titlePage: any) => {
        navigate(ROUTES.SCREEN_FEATURED_EVENTS,{
            titlePage: titlePage
        });
    }

    const eventDetailsHandler = (eventId: string) => {
        navigate(ROUTES.SCREEN_EVENTS_DETAILS, {
            eventId
        });
    }

    const handleNavigationToFilterPage = () => {
        navigate(ROUTES.SCREEN_FILTER);
    }

    const featuredDetails = (titlePage: any, titleColor: any, headBackground: any) => {
        navigate(ROUTES.SCREEN_FEATURED, {
            titlePage: titlePage,
            titleColor: titleColor,
            headBackground: headBackground
        });
    }

    const EmptyComponent = () => {
        return (
            <Text>{'No Data Available'}</Text>
        )
    }

    const DividerContent = ({ leftText, rightText, highlighted}: any) => {
        return (
            <HightLightHead style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20, paddingRight: 20, backgroundColor: highlighted ? '#00000029' : '#f0f8ff00'}}>
                <HightLightHeadText style={{marginLeft: 0}}>
                    {leftText.map((text: any, index: any) => (
                        index > 0 ? 
                        <Text key={index} style={{fontSize: 12}}>
                            {' '} &#8226; {text}
                        </Text> : 
                        <Text key={index} style={{fontSize: 12}}>
                            {text}
                        </Text>
                    ))}
                </HightLightHeadText>
                <TouchableOpacity onPress={() => featuredEventsHandler(leftText[0])}>
                    <HightLightHeadText style={{fontSize: 12, textTransform: 'none'}}>
                                {rightText}
                    </HightLightHeadText>
                </TouchableOpacity>
            </HightLightHead>
        )
    }

    const EventsComponent = ({ events }: any) => {
        return (
            <Content>
                {!!events && events.length > 0 ? 
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                {
                    events.map((event: any, index: any) => {
                        return (
                            <TouchableOpacity onPress={() => eventDetailsHandler(event.id)} key={index} style={{width: (windowWidth * 0.8), marginRight: 25}}>
                                <Card style={{height:120, width: '100%', backgroundColor: '#122C5B'}}>
                                    <BackgroundHeader source={{uri: !!event.sport ? event.sport.image : 'nourl'}} style={{justifyContent: 'center'}} />
                                    <View style={{ position: 'absolute', bottom: 5, left: 5, width: 30, height: 30, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                                        <Image source={{ uri: event.sport.icon }} style={{ width: 20, height: 20 }} />
                                    </View>
                                    <View style={{ position: 'absolute', top: 5, right: 5, padding: 5, paddingStart: 10, paddingEnd: 10, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                                        <Text style={{ fontFamily: 'OpenSans_semibold', fontSize: 11 }}>{!!event.tournament ? event.tournament.name : 'No Data'}</Text>
                                    </View>
                                </Card>
                                <View style={{marginTop: 10}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                                        <Text style={{fontSize: 12, color: false ? '#FFB550' : true ? '#A9EA1B' : '#FE736C'}}><Entypo name='ticket'/>{' '}Ticket Available</Text>
                                        <Text style={{ fontSize: 12, color: '#9B9B9B'}}><AntDesign name='clockcircleo'/>{' '}{!!event.time ? moment(event.time).format('h:mm a') : 'No data'}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <EventName>{event.title}</EventName>
                                        <TouchableOpacity>
                                            <AntDesign name='hearto' color='#000000' size={20}/>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{fontSize: 12}}>
                                        {!!event.venue ? event.venue : 'No data'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
                </ScrollView> : <Text style={{ textAlign: 'center' }}>
                    No event
                </Text>}
            </Content>
        )
    }

    const HorizontalScrollEvent = ({ events }: any) => {
        return (
            <View style={{paddingStart: 20, paddingTop: 20, paddingBottom: 20}}>
                {events.length > 0 ? <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}>
                {
                    events.map((event: any, index: any) => {
                        return (
                            <TouchableOpacity onPress={()=> eventDetailsHandler(event.eventName, event.eventHeaderImage)} key={index} style={{flexDirection: 'row', width: (windowWidth * 0.8), marginRight: 25}}>
                                <Card style={{height:120, width: '40%', backgroundColor: '#122C5B'}}>
                                    <BackgroundHeader source={event.eventHeaderImage} style={{justifyContent: 'center'}} />
                                    <View style={{ position: 'absolute', bottom: 5, left: 5, width: 30, height: 30, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                                        <MaterialCommunityIcons name={'soccer'} size={20} />
                                    </View>
                                </Card>
                                <View style={{marginTop: 5,marginBottom: 5, width: '60%', paddingLeft: 10, paddingRight: 10}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                                        <Text style={{fontSize: 12, color: event.eventTicketStatus === 1 ? '#FFB550' : event.eventTicketStatus === 2 ? '#A9EA1B' : '#FE736C'}}><Entypo name='ticket'/>{' '}{event.eventTicketStatusText}</Text>
                                        <Text style={{ fontSize: 12, color: '#9B9B9B'}}><AntDesign name='clockcircleo'/>{' '}{event.eventTime}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <EventName>{event.eventName}</EventName>
                                    </View>
                                    <Text style={{fontSize: 12}}>
                                        {event.eventAddress}
                                    </Text>
                                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                        <View style={{flexDirection: 'row', bottom: 0, justifyContent: 'space-between', alignItems: 'center'}}>
                                            <View style={{flexDirection: 'row'}}>
                                                <View style={{backgroundColor: '#F0F0F0', padding: 5, borderRadius: 5}}>
                                                    <Text style={{fontSize: 12}}>
                                                        {event.eventLeague}
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
                        )
                    })
                }
                </ScrollView> : <Text style={{ textAlign: 'center' }}>No event</Text>}
            </View>
        )
    }

    const SportsThumbnail = ({ featuredSports }: any) => {
        return (
            <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 20, paddingRight: 20, justifyContent: 'space-between'}}>
                {
                    featuredSports.map((sport: any, index: any) => (
                        <TouchableOpacity onPress={() => featuredDetails(sport.details.name, '#FFFFFF', sport.details.image)} style={{ flexDirection: 'row', width: (windowWidth * 0.43), marginBottom: 10}} key={index}>
                            <Card style={{height:120, width: '100%',backgroundColor: '#122C5B'}}>
                                <BackgroundHeader source={{uri: sport.details.image}} style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{color: '#FFFFFF', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 25, flexWrap: 'wrap', width: 150, textAlign: 'center', fontFamily: 'TradeGothic_italic_bold'}}>
                                        {sport.details.name}
                                    </Text>
                                </BackgroundHeader>
                            </Card>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    useEffect(() => {
        let majorEvents: any[] = [], featuredEvents: any[] = [];
        if(events.events.length > 0) {
            majorEvents = events.events.filter((major) => major.is_major === true)
            featuredEvents = events.events.filter((featured) => featured.is_featured === true)
            setMajorEvents(majorEvents)
            setFeaturedEvents(featuredEvents)

            console.log('Major Events: ', majorEvents, 'Featured Events: ', featuredEvents)
        }
    }, [events.events])

    return (
        <Container>
            {activeSearchBar ? <View style={{ flex: 1, backgroundColor: appColor.mediumLightGray }}>
                <SearchBar cancelHandler={setActiveSearchBar} />
            </View> : 
            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
                <ScreenBackground theme={{ backgroundcolor: SCREEN[routeName].backgroundColor }} />
                <Header transparent>
                    <Left style={{ flex: 0.2 }} />
                    <Body style={{ flex: 0.4 }} />
                    <Right style={{ flex: 0.6, paddingRight: 10 }}>
                        <Button transparent onPress={handleNavigationToFilterPage}>
                            {/* <Octicons name='settings' size={24} style={{ color: '#000000' }} /> */}
                            <Image source={icon.settings} style={{ height: 25, width: 20,resizeMode: 'contain' }} />
                        </Button>
                        <Button transparent onPress={() => setActiveSearchBar(true)}>
                            <Octicons name='search' size={24} style={{ color: '#000000' }} />
                        </Button>
                    </Right>
                </Header>
                <HeaderTitlePage>
                    <HeaderTitleText>{route.name}</HeaderTitleText>
                </HeaderTitlePage>
                <DividerContent leftText={['Major events']} rightText={'See All'} highlighted={false}/>
                <EventsComponent events={majorEvents} />
                <DividerContent leftText={['Featured events']} rightText={'See All'} highlighted={false}/>
                <EventsComponent events={featuredEvents} />
                <DividerContent leftText={['Near Me','5 miles']} rightText={'See All'} highlighted={true}/>
                <HorizontalScrollEvent events={eventsNearMe}/>
                <DividerContent leftText={['Happening Now']} rightText={'See All'} highlighted={true}/>
                <HorizontalScrollEvent events={eventHappeningNow}/>
                <ThumbnailContent>
                    <HeaderContent>
                        <HeaderTitlePage>
                            <HeaderTitleText>Sports</HeaderTitleText>
                        </HeaderTitlePage>
                    </HeaderContent>
                    <SportsThumbnail featuredSports={sports.followed} title={'Sports'}/>
                </ThumbnailContent>
            </ScrollView>}
        </Container>
    );
}

export default DiscoverScreen
