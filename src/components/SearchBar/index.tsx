import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, Header, Icon, Input, Item, Text } from "native-base";
import { appColor } from '../../config/consts/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BackgroundHeader, Divider, EventName, LinerInBetween, screenWidth, TextOr } from '../Styles';
import { FontAwesome, AntDesign, Octicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import {useNavigation, useRoute} from '@react-navigation/native';

import arsenal_vs_tottenham from '../../assets/images/discover/arsenal_vs_tottenham_2x.png';
import france_vs_italy from '../../assets/images/discover/france_vs_italy_2x.png';
import { ROUTES } from '../../config/consts/routes';

const SearchBar = (props: any) => {
    const { goBack, navigate } = useNavigation();
    const [eventsNearMe, setEventsNearMe] = useState([
        {id: '1', eventHeaderImage: france_vs_italy, eventLeague: 'Six Nations', eventIcon: '', eventTicketStatus: 1, eventTicketStatusText: 'Tickets Low', eventTime: '6:00 pm', eventName: 'France vs ITALY', eventAddress: 'Rangers Lodge, Hyde Park, London, W2 2UH'},
        {id: '2', eventHeaderImage: arsenal_vs_tottenham, eventLeague: 'Six Nations', eventIcon: '', eventTicketStatus: 1, eventTicketStatusText: 'Tickets Low', eventTime: '6:00 pm', eventName: 'France vs ITALY', eventAddress: 'Rangers Lodge, Hyde Park, London, W2 2UH'},
    ])    
    const eventDetailsHandler = (titlePage: any, headBackground: any) => {
        navigate(ROUTES.SCREEN_EVENTS_DETAILS, {
            titlePage: titlePage,
            headBackground: headBackground,
        });
    }

    const HorizontalScrollEvent = ({ events }: any) => {
        return (
            <View style={{paddingStart: 20, paddingBottom: 20}}>
                <ScrollView  
                    showsHorizontalScrollIndicator={false}>
                {
                    events.map((event: any, index: any) => {
                        return (
                            <TouchableOpacity onPress={()=> eventDetailsHandler(event.eventName, event.eventHeaderImage)} key={index} style={{flexDirection: 'row', width: (screenWidth * 0.8), marginRight: 25}}>
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
                </ScrollView>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header searchBar rounded style={{ alignSelf: 'center', paddingStart: 20, paddingEnd: 20, paddingBottom: 20 }}>
                <Item style={{ height: 50, padding: 15, backgroundColor: appColor.hardLightGray }}>
                    <Input placeholder="Search" />
                    <TouchableOpacity onPress={() => props.cancelHandler(false)}>
                        <Text style={{ fontFamily: 'OpenSans_regular', fontSize: 14 }}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </Item>
            </Header>
            <ScrollView>
                <Divider style={{ marginStart: 10, paddingVertical: 25 }}>
                    <TextOr style={{ color: '#000000', fontSize: 14,fontFamily: 'OpenSans_semibold', textTransform: 'uppercase', letterSpacing: 3 }}>({eventsNearMe.length}) results</TextOr>
                    <LinerInBetween style={{ marginStart: 15,height: 1, backgroundColor: appColor.lightGray }}/>
                </Divider>
                <HorizontalScrollEvent  events={eventsNearMe} />
            </ScrollView>
        </View>
    );
};

export default SearchBar;