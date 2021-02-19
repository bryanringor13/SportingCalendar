import React, { useEffect, useRef, useState } from 'react'
import { View, Text, FlatList, Image, ImageBackground, ScrollView, TouchableOpacity, Share } from 'react-native';
import { Body, Container, Left, Right, List, ListItem, Card, CardItem, Content, ActionSheet } from 'native-base';
import { AntDesign, Ionicons, MaterialCommunityIcons,Octicons, Entypo, SimpleLineIcons, EvilIcons, FontAwesome } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import moment from 'moment';

import headerBackground from '../../../../../../assets/images/profile_details/arsenal_vs_tottenham_2x.png';
import arsenal_vs_tottenham from '../../../../../../assets/images/discover/arsenal_vs_tottenham_2x.png';
import france_vs_italy from '../../../../../../assets/images/discover/france_vs_italy_2x.png';

import { BackgroundHeader, HeaderContent, RenderContent, SelectionBackground, SelectionBackgroundCircle, SelectionBackgroundText, SelectionCircle, CircleLabel, RenderContentScrollHorizontal, Circle, ImageContent, HightLightHead, HightLightHeadText, ViewDetailsHeader, ViewDetailsHeaderTitle, Liner, BarCardContent, screenWidth, EventName, StatusMessage, CircleHighlightButton } from '../../../../../../components/Styles';
import { BodyContent, HeaderFeaturedContent, HeaderFeaturedTop, HeaderFeaturedTitle, FeaturedContent, FooterContent, EventDetailsContent, screenHeight } from './styles';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../../../../config/consts/routes';
import { getEvent } from '../../../../../../redux/actions/event';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reducers';
import SubCollapseContent from '../../../../../../components/SubCollapseContent';

const EventDetails = ({ route, navigation }: any) => {
    const { eventId } = route.params;
    const { goBack, navigate } = useNavigation();
    const scrollRef = useRef<ScrollView>();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user)
    const event = useSelector((state: RootState) => state.event)
    const [channels, setChannels] = useState<any[]>([])
    const [cancelIndex, setCancelIndex] = useState(0)
    const [activeChannel, setActiveChannel] = useState({})
    const [subscriptions, setSubscriptions] = useState([])


    const [collapsed, setCollapsed] = useState(false)
    
    const handleGoBack = () => {
        goBack();
    }

    const [eventsOnToday, setEventsOnToday] = useState([
        {id: '1', eventHeaderImage: arsenal_vs_tottenham, eventLeague: 'Premier League', eventIcon: '', eventTicketStatus: 1, eventTicketStatusText: 'Tickets Low', eventTime: '6:00 pm', eventName: 'Arsenal vs Tottenham', eventAddress: 'Rangers Lodge, Hyde Park, London, W2 2UH'},
        {id: '1', eventHeaderImage: france_vs_italy, eventLeague: 'Premier League', eventIcon: '', eventTicketStatus: 2, eventTicketStatusText: 'Tickets Available', eventTime: '6:00 pm', eventName: 'France vs Italy', eventAddress: 'Rangers Lodge, Hyde Park, London, W2 2UH'},
    ])

    const EmptyComponent = () => {
        return (
            <Text>{'No Data Available'}</Text>
        )
    }
    const seeMoreHandler = () => {
        console.log('See More')
    }
    
    const venueHandler = (venue_id: string) => {
        // console.log('Venue ID: ', venue_id)
        navigate(ROUTES.MAIN_VENUE, {
            venue_id
        });
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
              message: `${!!event.eventDetails ? event.eventDetails.title : 'No title'}`,
              url: 'sample.com',
              title: `${!!event.eventDetails ? event.eventDetails.title : 'No title'}`
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            alert(error.message);
          }
    }

    const eventDetailsHandler = (titlePage: any, headBackground: any) => {
        scrollRef.current?.scrollTo({
            y : 0,
            animated : true
        });
        navigate(ROUTES.SCREEN_EVENTS_DETAILS, {
            titlePage: titlePage,
            headBackground: headBackground,
        });
    }
    
    const HeaderDetailsRender = ({ imageUrl } : any) => {
        return (
            <HeaderContent style={{ height: (screenHeight * 0.30), backgroundColor: '#122C5B' }} >
                <BackgroundHeader source={headerBackground}>
                {/* <BackgroundHeader source={{ uri: !!imageUrl ? imageUrl.length > 0 ? imageUrl : 'no image' : 'no image'}}> */}
                    <HeaderFeaturedTop>
                        <CircleHighlightButton onPress={() => handleGoBack()} style={{ backgroundColor: '#FFFFFF', borderRadius: 20, width: 40, borderWidth: 0, justifyContent: 'center', alignItems: 'center'}}>
                            <AntDesign name='left' size={25} color={'#000000'} style={{height: 25}} />
                        </CircleHighlightButton>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 90}}>
                            <CircleHighlightButton style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', borderColor: '#FFFFFF', paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10}}>
                                <Ionicons name='ios-notifications-off' size={24}/>
                            </CircleHighlightButton>
                            <CircleHighlightButton onPress={() => onShare()} style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', borderColor: '#FFFFFF', paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10}}>
                                <AntDesign name='sharealt' size={18}/>
                            </CircleHighlightButton>
                        </View>
                    </HeaderFeaturedTop>
                </BackgroundHeader>
            </HeaderContent>
        )
    }

    const DividerContent = ({ leftText, rightText, highlighted}: any) => {
        return (
            <HightLightHead style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20, paddingRight: 20, backgroundColor: highlighted ? '#F0F0F0' : '#f0f8ff00'}}>
                <HightLightHeadText style={{marginLeft: 0}}>
                    {leftText.map((text: any, index: any) => (
                        index > 0 ? 
                        <Text key={index} style={{fontSize: 12, fontFamily: 'TradeGothic_bold', letterSpacing: 1}}>
                            {' '} &#8226; {text}
                        </Text> : 
                        <Text key={index} style={{fontSize: 12, fontFamily: 'TradeGothic_bold', letterSpacing: 1}}>
                            {text}
                        </Text>
                    ))}
                </HightLightHeadText>
                {rightText.length > 0 ? 
                <TouchableOpacity onPress={() => seeMoreHandler()}>
                    <HightLightHeadText style={{fontSize: 12, textTransform: 'none'}}>
                                {rightText}
                    </HightLightHeadText>
                </TouchableOpacity> : null}
            </HightLightHead>
        )
    }

    const ContentParagraph = ({ content }:any) => {
        return (
            <View style={{padding: 20}}>
                <Text style={{textAlign: 'justify', fontSize: 14, fontFamily: 'OpenSans_regular'}}>
                    {content}
                </Text>
            </View>
        )
    }

    const TicketCard = ({ themeColor, borderColor, textColor, header, body, footer}: any) => {
        return (
            <TouchableOpacity style={{marginRight: 10}}>
                <View style={{height: 82, width: 112,backgroundColor: themeColor, borderRadius: 10, justifyContent: 'center', paddingLeft: 10, borderColor: borderColor, borderWidth: 1}}>
                    <Text style={{color: textColor, fontSize: 12}}>{!!header ? header : 'No data'}</Text>
                    <Text style={{color: textColor, fontSize: 18, fontWeight: 'bold'}}>{!!body ? body : 'No Price'}</Text>
                    <Text style={{color: textColor, textTransform: 'uppercase', fontSize: 12, marginTop: 5, fontWeight: 'bold'}}>{!!footer ? footer : 'No data'}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const BarCard = ({ venue }: any) => {
        return (
            <TouchableOpacity style={{marginRight: 10}} onPress={() => venueHandler(venue.venue_id)}>
                <BarCardContent>
                    <Card style={{height:120, width: '100%', backgroundColor: '#122C5B'}}>
                        <BackgroundHeader source={{uri: venue.photos}} style={{justifyContent: 'center'}} />
                    </Card>
                    <EventName numberOfLines={1} adjustsFontSizeToFit={true}>{!!venue.name ? venue.name : 'No Data'}</EventName>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{width: '90%'}}>
                            <Text style={{ fontSize: 12, marginTop: 5}}>{!!venue.address ? `${venue.address.street} ${venue.address.postal_code}` : 'No Address'}</Text>
                        </View>
                        <View>
                            <AntDesign name="right" size={16}/>
                        </View>
                    </View>
                </BarCardContent>
            </TouchableOpacity>
        )
    }

    const TicketContent = ({content}: any) => {
        return (
            !!content && content.length > 0 ?
            <ScrollView horizontal style={{padding: 20}}>
                {content.map((ticket:any, index:any) => (
                    <TicketCard key={index} themeColor={ticket.themeColor} header={'From'} body={`${ticket.curSign}${ticket.price}`} footer={ticket.mode} borderColor={ticket.themeColor} textColor={'#FFFFFF'}/>
                ))}
            </ScrollView>
            : <View style={{padding: 20}}>
                <Text> No event ticket available</Text>
            </View>
        )
    }

    // const SubscriptionContent = ({content}: any) => {
    //     console.log(content)
    //     return (
    //         !!content && content.length > 0 ?
    //         <ScrollView horizontal style={{paddingRight: 20}}>
    //             {content.map((sub:any, index:any) => (
    //                 <TicketCard key={index} themeColor={sub.themeColor} header={sub.type} body={!!sub.amount ? `${sub.amount}` : 'No Data'} footer={sub.name} borderColor={'#000000'} textColor={'#000000'}/>
    //             ))}
    //         </ScrollView>
    //         : <View style={{paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>
    //             <Text>No Subscription</Text>
    //         </View>
    //     )
    // }

    const BarContent = ({content}: any) => {
        return(
            !!content && content.length > 0 ? <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {content.map((bar:any, index: any) => (
                    <BarCard key={index} venue={bar}/>
                ))}
            </ScrollView>
            : <Text>
                No venue
            </Text>
        )
    }

    const TvMobileContent = ({ channel }: any) => {
        return (!!channel && channel.length > 0 ? channel.map((data: any, index: any) => (
            <View key={index}>
                <SubCollapseContent channel={data}  />
                {index < (channel.length - 1) && <Liner style={{ marginTop: 0 }}/>}
            </View>
                )) : <View style={{ padding: 20 }}>
                    <Text>{'No event channel'}</Text>
                </View>)
    }

    const WhereToWatchInBar = ({content}: any) => {
        return (
            <View style={{padding: 20}}>
                <View style={{ paddingRight: 5, paddingBottom: 10, paddingTop: 5}}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <EvilIcons name="location" size={16}/>
                        <Text style={{ paddingLeft: 5, paddingRight: 5 ,textTransform: 'uppercase', fontWeight: 'bold', fontSize: 12 }}>Current Location</Text>
                        <AntDesign name="right" size={14}/>
                    </TouchableOpacity>
                </View>
                <BarContent content={content} />
            </View>
        )
    }

    const EventsOnToday = ({content}: any) => {
        return (
            
            <View style={{padding: 20}}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}>
                {
                    content.map((event: any, index: any) => {
                        return (
                            <TouchableOpacity onPress={()=> eventDetailsHandler(event.eventName, event.eventHeaderImage)} key={index} style={{flexDirection: 'row', width: (screenWidth * 0.8), marginRight: 25}}>
                                <Card style={{height:120, width: '40%', backgroundColor: '#122C5B'}}>
                                    <BackgroundHeader source={event.eventHeaderImage} style={{justifyContent: 'center'}} />
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
                </ScrollView>
            </View>
        )
    }

    useEffect(() => {
        dispatch(getEvent({
            token: user.token,
            id: eventId
        }))
    }, [eventId])

    // useEffect(() => {
    //     if(!!event.eventDetails) {
    //         if(!!event.eventDetails.events_channels && !!event.eventDetails.events_channels.length > 0){
    //             console.log(`Event Details ${event.eventDetails.events_channels.length}`, event.eventDetails)
    //             let channelNames: any[] = [], channelsAvailable: any[] = []
    //             setActiveChannel(event.eventDetails.events_channels[0])
    
    //             event.eventDetails.events_channels.map((data: any,index: any) => {
    //                 channelNames = [...channelNames,
    //                     data.name
    //                 ]
    //                 channelsAvailable  = [...channelsAvailable, 
    //                     data
    //                 ]
    //             })
    
    //             setChannels(channelsAvailable)
    //             setCancelIndex(channelsAvailable.length)
    //             setAvailableChannelsName([...channelNames, 'Cancel'])
    //         }
    //     }
    //     return () => {
    //         setActiveChannel({})
    //         setChannels([])
    //         setCancelIndex(0)
    //         setAvailableChannelsName([])
    //     }
    // }, [event.eventDetails])

    return (
        <FeaturedContent showsVerticalScrollIndicator={false} ref={scrollRef} >
            <HeaderDetailsRender imageUrl={!!event.eventDetails ? !!event.eventDetails.sport ? event.eventDetails.sport.image : null : null}/>
            <BodyContent>
                {/* Womens */}
                <ViewDetailsHeader style={{marginTop: 20,flexDirection: 'row',justifyContent: 'space-between' }}>
                    <View style={{ width: '80%'}}>
                        <ViewDetailsHeaderTitle>{!!event.eventDetails ? event.eventDetails.title : 'No event title'}</ViewDetailsHeaderTitle>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <TouchableOpacity style={{marginRight: 10}}>
                            <AntDesign name='hearto' color='#000000' size={20}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor: '#00000029', padding: 5, borderColor: '#00000029', borderRadius: 50}}>
                            <Image source={{ uri: !!event.eventDetails ? !!event.eventDetails.sport ? event.eventDetails.sport.icon : 'noicon' : 'noicon' }} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                </ViewDetailsHeader>
                <EventDetailsContent style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <View style={{paddingTop: 2}}>
                            <AntDesign name='clockcircleo' size={14} style={{ color: '#000000' }} />
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={{fontSize: 16}}>{!!event.eventDetails ? `${moment(event.eventDetails.time).format('[Starts at] hh:mm a')}` : 'No event time'}</Text>
                            <Text style={{fontSize: 16, color: '#9B9B9B'}}>{!!event.eventDetails ? `${moment(event.eventDetails.time).format('DD MMMM YYYY')}` : 'No event date'}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <TouchableOpacity style={{flexDirection: 'row'}}>
                            <View style={{paddingTop: 2}}>
                                <Octicons name='location' size={14} style={{ color: '#000000' }} />
                            </View>
                            <View style={{marginLeft: 10, width: '85%'}}>
                                <Text style={{fontSize: 16}}>{!!event.eventDetails ? `${event.eventDetails.venue}` : 'No event venue'}</Text>
                                <Text style={{fontSize: 16, color: '#9B9B9B'}}>{0} miles away</Text>
                            </View>
                            <View style={{flexDirection: 'row', width: '10%', justifyContent: 'center'}}>
                                <AntDesign name='right' size={20}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <View style={{backgroundColor: '#FFB550', paddingTop: 5,paddingBottom: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 50, flexDirection: 'row', alignItems: 'center'}}>
                            <Entypo name='ticket' color='#FFFFFF' size={12}/>
                            <StatusMessage>
                                {' '}Tickets Low
                            </StatusMessage>
                        </View>
                        <View style={{ marginLeft: 15, padding: 7, backgroundColor: '#d6d6d6', borderRadius: 50, borderWidth: 1, borderColor: '#d6d6d6' }}>
                            <MaterialCommunityIcons name="television" size={18} />
                        </View>
                    </View>
                </EventDetailsContent>
                
                <DividerContent leftText={['About the event']} rightText={'See more'} highlighted={true}/>
                <ContentParagraph content={!!event.eventDetails ? `${event.eventDetails.description}` : 'No event description'}/>
                <DividerContent leftText={['How to buy tickets']} rightText={''} highlighted={true}/>
                <ContentParagraph content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'/>
                <DividerContent leftText={['GET HOME TICKETS FROM']} rightText={''} highlighted={true}/>
                <TicketContent content={!!event.eventDetails ? !!event.eventDetails.events_ticket ? event.eventDetails.events_ticket : [] : []}/>
                <DividerContent leftText={['GET AWAY TICKETS FROM']} rightText={''} highlighted={true}/>
                <TicketContent content={!!event.eventDetails ? !!event.eventDetails.events_ticket ? event.eventDetails.events_ticket : [] : []}/>
                <DividerContent leftText={['WATCH IT ON TV/MOBILE']} rightText={''} highlighted={true}/>
                <TvMobileContent channel={!!event.eventDetails ? event.eventDetails.events_channels : []}/>
                <DividerContent leftText={['WHERE TO WATCH IN BAR']} rightText={''} highlighted={true}/>
                <WhereToWatchInBar content={!!event.eventDetails ? event.eventDetails.events_venues : []} />
                <DividerContent leftText={['EVENTS ON TODAY']} rightText={''} highlighted={true}/>
                <EventsOnToday content={eventsOnToday}/>
            </BodyContent>
        </FeaturedContent>
    );
}

export default EventDetails
