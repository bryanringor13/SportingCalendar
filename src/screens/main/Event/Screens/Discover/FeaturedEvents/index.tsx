import { Body, Button, Container, Header, Icon, Left, List, ListItem, Right, Title } from 'native-base';
import React, { useState } from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { Octicons, MaterialCommunityIcons, FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../../../../config/consts/routes';

import chelseavstottenham from '../../../../../../assets/images/featured_events/chelseavstottenham_2x.png';
import englandvsfrance from '../../../../../../assets/images/featured_events/englandvsfrance_2x.png';
import halepvswilliams from '../../../../../../assets/images/featured_events/halepvswilliams_2x.png';
import { appColor, icon } from '../../../../../../config/consts/theme';
import SearchBar from '../../../../../../components/SearchBar';

const FeaturedEvents = ({ route, navigation }: any) => {
    const { titlePage } = route.params;
    const [eventData, setEventData] = useState([
        { id: 0, ticketId: '111aaa', icon: chelseavstottenham, title: 'chelsea vs tottenham', tickets: 10, timeSlot: '8:00 am', league: 'Premier League', address: 'Rangers Lodge, Hyde Park, London, W2 2UH' },
        { id: 1, ticketId: '222bbb', icon: halepvswilliams, title: 'halep vs williams', tickets: 4, timeSlot: '1:00 pm', league: 'The Championships', address: '200 Whitton Rd, Twickenham, TW2 7BA' },
        { id: 2, ticketId: '333ccc', icon: englandvsfrance, title: 'england vs france', tickets: 0, timeSlot: '6:00 pm', league: 'Women`s Six Nations', address: 'Rangers Lodge, Hyde Park, London, W2 2UH' }
    ]);
    const [activeSearchBar, setActiveSearchBar] = useState(false)
    const { goBack, navigate } = useNavigation();

    const handleGoBack = () => {
        goBack();
    }
    
    const EmptyComponent = () => {
        return (
            <Text>{'No Data Available'}</Text>
        )
    }

    const handleNavigationToFollowPage = () => {
        navigate(ROUTES.MAIN_FOLLOW);
    }

    const handleNavigationToFilterPage = () => {
        navigate(ROUTES.SCREEN_FILTER);
    }

    const handleNavigationToMapsPage = () => {
        navigate(ROUTES.EVENTS_MAPS);
    }

    const eventDetailsHandler = (titlePage: any, headBackground: any) => {
        navigate(ROUTES.SCREEN_EVENTS_DETAILS, {
            titlePage: titlePage,
            headBackground: headBackground,
        });
    }

    const EventsRender = ({ data }: any) => {
        return (
            <List>
                <ListItem noBorder onPress={()=> eventDetailsHandler(data.title, data.icon)}>
                    <View style={{ flexDirection: 'row', width: '100%', height: 120 }}>
                        <View style={{ flex: 0.35, backgroundColor: '#000000', justifyContent: 'flex-start', overflow: 'hidden' }}>
                            <Image source={data.icon} style={{width: '100%', height: 120}} resizeMode='cover' />
                            <View style={{ position: 'absolute', bottom: 5, left: 5, width: 30, height: 30, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                                <MaterialCommunityIcons name={'soccer'} size={20} />
                            </View>
                        </View>
                        <View style={{ flex: 0.65, paddingLeft: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <FontAwesome name='ticket' size={14} style={{ color: ((data.tickets / 10) * 100) > 50 ? '#a9ea1a' : data.tickets == 0 ? '#fa8079' : '#fcb551', fontWeight: 'bold' }} />
                                    <Text adjustsFontSizeToFit style={{ fontFamily: 'TradeGothic_bold', marginLeft: 5, fontSize: 12, fontWeight: 'bold', color: ((data.tickets / 10) * 100) > 50 ? '#a9ea1a' : data.tickets == 0 ? '#fa8079' : '#fcb551', }}>
                                        {((data.tickets / 10) * 100) > 50 ? 'Tickets Available' : data.tickets == 0 ? 'Tickets Sold Out' : 'Tickets Low'}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <AntDesign name='clockcircleo' size={14} style={{ color: 'gray' }} />
                                    <Text adjustsFontSizeToFit style={{ marginLeft: 5, fontSize: 14, color: 'gray', fontWeight: 'bold' }}>{data.timeSlot}</Text>
                                </View>
                            </View>
                            <View>
                                <Text adjustsFontSizeToFit style={{ fontSize: 18, lineHeight: 20, fontWeight: 'bold', textTransform: 'uppercase', fontFamily: 'TradeGothic_bold' }}>{data.title}</Text>
                            </View>
                            <View>
                                <Text adjustsFontSizeToFit style={{ fontSize: 14, lineHeight: 20, fontWeight: 'normal', fontFamily: 'OpenSans_regular' }}>{data.address}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: '34%' }}>
                                <View style={{ flexDirection: 'row', flex: 0.8 }}>
                                    <View style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2, backgroundColor: '#d6d6d6', borderRadius: 10, borderWidth: 1, borderColor: '#d6d6d6', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text adjustsFontSizeToFit style={{ fontSize: 11, lineHeight: 20, fontWeight: 'normal', fontFamily: 'OpenSans_semibold' }}>{data.league}</Text>
                                    </View>
                                    <View style={{ marginLeft: 5, paddingRight: 5, paddingLeft: 5, paddingTop: 2, paddingBottom: 2, backgroundColor: '#d6d6d6', borderRadius: 10, borderWidth: 1, borderColor: '#d6d6d6' }}>
                                        <MaterialCommunityIcons name="television" size={18} />
                                    </View>
                                </View>
                                <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
                                    <AntDesign name="hearto" size={22} />
                                </View>
                            </View>
                        </View>
                    </View>
                </ListItem>
            </List>
        )
    }

    return (
        <Container>
            {activeSearchBar ? <View style={{ flex: 1, backgroundColor: appColor.mediumLightGray }}>
                <SearchBar cancelHandler={setActiveSearchBar} />
            </View> : 
            <>
                <Header style={{ backgroundColor: '#cff973' }}>
                    <Left style={{ flex: 0.2, paddingLeft: 10, flexDirection: 'row' }}>
                        <Button transparent onPress={handleGoBack}>
                            <Entypo name='chevron-thin-left' style={{ color: '#000000' }} size={24} />
                        </Button>
                        <Button transparent style={{ marginLeft: 5 }} onPress={() => handleNavigationToMapsPage()}>
                            <MaterialCommunityIcons name='map-marker-outline' size={24} style={{ color: '#000000' }} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 0.6, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18,fontWeight: 'bold', fontStyle: 'italic', textTransform: 'uppercase', color: '#000000', fontFamily: 'TradeGothic_italic_bold' }}>{titlePage}</Text>
                    </Body>
                    <Right style={{ flex: 0.2, paddingRight: 10 }}>
                        <Button transparent onPress={() => setActiveSearchBar(true)}>
                            <Octicons name='search' size={24} style={{ color: '#000000' }} />
                        </Button>
                        <Button transparent onPress={handleNavigationToFilterPage}>
                            {/* <Octicons name='settings' size={24} style={{ color: '#000000' }} /> */}
                                <Image source={icon.settings} style={{ height: 25, width: 20,resizeMode: 'contain' }} />
                        </Button>
                    </Right>
                </Header>
                <View style={{ flexDirection: 'row', marginTop: 5, padding: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', fontFamily: 'TradeGothic_bold' }}>O9 October</Text>
                    <Text style={[{ fontSize: 18, textTransform: 'uppercase', marginLeft: 10, fontFamily: 'TradeGothic_bold' }, styles.outLineText]}>Thursday</Text>
                </View>
                <FlatList
                    data={eventData}
                    ListEmptyComponent={<EmptyComponent />}
                    contentContainerStyle={eventData.length > 0 ? null : {
                        flexGrow: 1, justifyContent: 'center', alignItems: 'center'
                    }}
                    renderItem={({ item }) => <EventsRender data={item} />}
                    keyExtractor={(data) => data.ticketId}
                />
            </>}
        </Container>
    );
}

const styles = StyleSheet.create({
    outLineText: {
        textShadowOffset: {width: 0, height: 0}, 
        textShadowRadius: 1, 
        textShadowColor: '#000000',
        color: '#FFFFFF'
    }
});

export default FeaturedEvents
