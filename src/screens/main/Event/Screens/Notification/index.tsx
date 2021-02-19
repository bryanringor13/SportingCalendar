import React, { useState } from 'react'
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Body, Container, Left, Right, List, ListItem, Card, CardItem, Thumbnail, Button, Text, Separator, Header } from 'native-base';
import { Fontisto, AntDesign } from '@expo/vector-icons';
import { BackgroundHeader, HeaderContent, HeaderIcon, HeaderTitlePage, HeaderTitleText, ScreenBackground, VerticalDivider } from '../../../../../components/Styles';

import headerBackground from '../../../../../assets/images/notif_head_bg_2.png';
import iconChelsea from '../../../../../assets/images/icons/chelsea.png';
import { HeaderNotifNameText, TimeText } from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import { ROUTES, SCREEN } from '../../../../../config/consts/routes';
import { icon } from '../../../../../config/consts/theme';

const NotificationScreen = () => {
    const route = useRoute(); // route.name
    const routeName = route.name.toLowerCase();
    const { goBack, navigate } = useNavigation();
    const [eventData, setEventData] = useState([
        { id: '000aaaa', time: '', divider: true, title: 'Today', data: '', bordered: false },
        { id: '111aaaa', time: '8:00 am', divider: false, title: '', data: '' },
        { id: '222bbbb', time: '7:00 am', divider: false, title: '', data: '' },
        { id: '333cccc', time: '4:00 am', divider: false, title: '', data: '' },
        { id: '444dddd', time: '', divider: true, title: 'Yesterday', data: '', bordered: true },
        { id: '555eeee', time: '10:00 pm', divider: false, title: '', data: '' },
    ])
    const EmptyComponent = () => {
        return (
            <Text>{'No Data Available'}</Text>
        )
    }

    const handleNavigationToSettingNotificationPage = () => {
        navigate(ROUTES.SETTINGS_NOTIFICATIONS, {
            name: 'Notifications',
            content: ''
        })
    }

    const ContentRender = ({ data }: any) => {
        return (
            data.map((notif: any, index: any) => (
                <List key={index}>
                    {notif.divider > 0 ? 
                    (<Separator bordered={!!notif.bordered && notif.bordered} style={{backgroundColor: notif.bordered ? '#F0F0F0' : '#f0f8ff00'}}>
                        <Text style={{textTransform: 'uppercase', color: '#000000', fontSize: 12, fontFamily: 'TradeGothic_bold', letterSpacing: 1}}>{notif.title}</Text>
                    </Separator>) : <ListItem noBorder thumbnail button onPress={() => { console.log('list') }}>
                        <Left>
                            <View style={{ backgroundColor: '#122C5B', borderWidth: 1, borderColor: '#122C5B', borderRadius: 50 }}>
                                <Thumbnail source={iconChelsea} />
                            </View>
                        </Left>
                        <Body>
                            <TimeText>{notif.time}</TimeText>
                            <Text><Text style={{fontWeight: 'bold'}}>Six Nations</Text> tickets now on sale for Round 1.</Text>
                        </Body>
                        <Right>
                            <Text>
                                <AntDesign name="right" size={14} color='#000'/>
                            </Text>
                        </Right>
                    </ListItem>}
                </List>
            ))
        )
    }

    return (
        <Container>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <ScreenBackground theme={{ backgroundcolor: SCREEN[routeName].backgroundColor }} />
                {/* <HeaderContent>
                    <HeaderIcon>
                        <Button transparent>
                            <Fontisto name='player-settings' size={24} />
                        </Button>
                    </HeaderIcon>
                    <HeaderTitlePage>
                        <HeaderTitleText>{route.name}</HeaderTitleText>
                    </HeaderTitlePage>
                </HeaderContent> */}
                <Header transparent>
                    <Left style={{ flex: 0.2 }} />
                    <Body style={{ flex: 0.4 }} />
                    <Right style={{ flex: 0.6, paddingRight: 10 }}>
                        <TouchableOpacity onPress={() => handleNavigationToSettingNotificationPage()}>
                            <Image source={icon.setting3} style={{ height: 25, width: 20,resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </Right>
                </Header>
                <HeaderTitlePage>
                    <HeaderTitleText>{route.name}</HeaderTitleText>
                </HeaderTitlePage>
                {/* <FlatList
                    data={eventData}
                    ListEmptyComponent={<EmptyComponent />}
                    contentContainerStyle={eventData.length > 0 ? null : {
                        flexGrow: 1, justifyContent: 'center', alignItems: 'center'
                    }}
                    renderItem={({ item }) => <ContentRender data={item} />}
                    keyExtractor={(data) => data.id}
                /> */}
                <View style={{marginTop: 10}}>
                    <ContentRender data={eventData} />
                </View>
            </ScrollView>
        </Container>
    );
}

export default NotificationScreen
