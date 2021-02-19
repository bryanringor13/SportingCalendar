import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Body, Container, Left, Right, List, ListItem, Card, CardItem, Header, Button } from 'native-base';
import { Fontisto, Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { BackgroundHeader, HeaderContent, HeaderTitlePage, ScreenBackground, VerticalDivider } from '../../../../../components/Styles';
import { useNavigation } from '@react-navigation/native';

import headerBackground from '../../../../../assets/images/profile_head_bg_2.png';
import football from '../../../../../assets/images/profile/football_2x.png';
import golf from '../../../../../assets/images/profile/golf_2x.png';
import rugby from '../../../../../assets/images/profile/rugby_2x.png';
import discovery from '../../../../../assets/images/profile/discovery_2x.png';
import { HeaderGreetText, HeaderNameText, HeaderProfile, HeaderProfileTitle, HeaderProfileTop, CircleHighlightButton, CategoryContent, ProfileCategoryItem,  screenWidth } from './styles';
import { ROUTES, SCREEN } from '../../../../../config/consts/routes';
import {useRoute} from '@react-navigation/native';
import { RootState } from '../../../../../redux/reducers';
import { icon } from '../../../../../config/consts/theme';

const ProfileScreen = () => {
    const route = useRoute(); // route.name
    const routeName = route.name.toLowerCase();
    const { goBack, navigate } = useNavigation();
    const sports = useSelector((state: RootState) => state.sports);
    const user = useSelector((state: RootState) => state.user);
    const [leagues, setLeagues] = useState<any[]>([])
    const [teams, setTeams] = useState<any[]>([])
    const EmptyComponent = () => {
        return (
            <Text>{'No Data Available'}</Text>
        )
    }

    const featuredDetails = (titlePage: any, titleColor: any, headBackground: any) => {
        navigate(ROUTES.SCREEN_FEATURED, {
            titlePage: titlePage,
            titleColor: titleColor,
            headBackground: headBackground
        });
    }

    const profileSettings = () => {
        navigate(ROUTES.SETTINGS_PROFILE)
    }

    const SportsRenderComponent = ({ item }: any) => {
        return (
            item.map((event: any, index: any) => (
                <TouchableOpacity key={index} onPress={() => featuredDetails(event.details.name, '#FFFFFF', event.details.image)} 
                    style={{ paddingLeft: 10, paddingRight: 10 }} // adjust the styles to suit your needs
                    >
                    <Card style={{height:120, width: '100%', backgroundColor: '#122C5B'}}>
                        <BackgroundHeader source={{uri: event.details.image}} style={{justifyContent: 'center'}}>
                            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20}}>
                                <View>
                                    <Text style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: 25, fontStyle: 'italic', color: '#FFFFFF' }}>
                                        {event.details.name}
                                    </Text>
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Entypo name='chevron-thin-left' style={{ color: '#000000' }} size={24} />
                                </View>
                            </View>
                        </BackgroundHeader>
                    </Card>
                </TouchableOpacity>
            ))
        )
    }

    useEffect(() => {
        if(sports.followed.length > 0){
            let leaguesFollowed: any[] = [], teamsFollowed: any[] = []
            sports.followed.map((sport) => {
                sport.league.filter((leagues:any) => {
                    if(leagues.clicked === true && leagues.id.toLowerCase() !== '1') {
                        leaguesFollowed = [
                            ...leaguesFollowed,
                            leagues
                        ]
                    }
                })
                sport.team.filter((teams: any) => {
                    if(teams.clicked === true && teams.id.toLowerCase() !== '1') {
                        teamsFollowed = [
                            ...teamsFollowed,
                            teams
                        ]
                    }
                })
            })

            setLeagues(leaguesFollowed)
            setTeams(teamsFollowed)
        }
    }, [sports.followed])

    return (
        <Container>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <ScreenBackground theme={{ backgroundcolor: SCREEN[routeName].backgroundColor }} />
                <Header transparent>
                    <Left style={{ flex: 0.2 }} />
                    <Body style={{ flex: 0.4 }} />
                    <Right style={{ flex: 0.6, paddingRight: 10 }}>
                        <Button transparent onPress={() => profileSettings()}>
                            <Image source={icon.setting3} style={{ height: 25, width: 20,resizeMode: 'contain' }} />
                        </Button>
                    </Right>
                </Header>
                <HeaderTitlePage>
                    <HeaderProfileTitle>
                        <Text style={[styles.outLineText, styles.headerGreetings]}>Hello,</Text>
                        <HeaderNameText>{!!user.data ? user.data.name : 'Guest'}</HeaderNameText>
                    </HeaderProfileTitle>
                    <View style={{ width: '20%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <CircleHighlightButton>
                            <Text style={{ color: '#fff', textTransform: 'uppercase', fontSize: 12, fontFamily: 'TradeGothic_bold' }}>Edit</Text>
                        </CircleHighlightButton>
                    </View>
                </HeaderTitlePage>
                <CategoryContent>
                    <ProfileCategoryItem>
                        <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}>{sports.followed.length}</Text>
                        <Text style={{ textAlign: 'center' }}>Sports</Text>
                    </ProfileCategoryItem>
                    <VerticalDivider style={{ marginTop: 15 }} />
                    <ProfileCategoryItem>
                        <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}>{leagues.length}</Text>
                        <Text style={{ textAlign: 'center' }}>Leagues</Text>
                    </ProfileCategoryItem>
                    <VerticalDivider style={{ marginTop: 15 }} />
                    <ProfileCategoryItem>
                        <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}>{teams.length}</Text>
                        <Text style={{ textAlign: 'center' }}>Teams</Text>
                    </ProfileCategoryItem>
                </CategoryContent>
                {/* <FlatList
                    data={eventData}
                    ListEmptyComponent={<EmptyComponent />}
                    contentContainerStyle={eventData.length > 0 ? null : {
                        flexGrow: 1, justifyContent: 'center', alignItems: 'center'
                    }}
                    renderItem={({ item }) => <SportsRender event={item} />}
                    keyExtractor={(data) => data.id}
                /> */}
                <SportsRenderComponent item={sports.followed} />
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    headerGreetings: {
        fontFamily: 'TradeGothic_italic_bold',
        fontSize: 30,
        textTransform: 'uppercase',
        color: '#48B8D7'
    },
    outLineText: {
        textShadowOffset: {width: 0, height: 0}, 
        textShadowRadius: 2, 
        textShadowColor: '#000000'
    }
});

export default ProfileScreen
