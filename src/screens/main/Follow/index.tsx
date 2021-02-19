import React, { useEffect, useState } from 'react';
import { Container, Header, Content, Body, Left, Right, Title, Button, Icon, Text } from "native-base";
import { Entypo } from '@expo/vector-icons';

import male from '../../../assets/images/follow_sports/male.png';
import female from '../../../assets/images/follow_sports/female.png';
import afc from '../../../assets/images/follow_sports/afc_2x.png';

import { useNavigation } from '@react-navigation/native';
import { ButtonFollow, ButtonText, Category, FooterFollow, RenderHeader, RenderHeaderTitle } from './styles';
import { ROUTES } from '../../../config/consts/routes';
import { CircleLabel, ImageContent, RenderContent, SelectionBackground, SelectionBackgroundCircle, SelectionBackgroundText, SelectionCircle, SelectionCircleWrap, SelectionFollowCircle } from '../../../components/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { clickedGender, clickedLeague, clickedTeam, clickedSports, fetchSports, fetchLeague, fetchTeam } from '../../../redux/actions/sports';
import { RootState } from '../../../redux/reducers';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import CollapseContent from '../../../components/CollapseContent';

// const sportsLeague = [
//     { title: "COLLAPSE LEAGUE NAME", content: [] },
// ]
// const sportsTeam = [
//     { title: "COLLAPSE TEAM NAME", content: [] }
// ]

const Follow = ({ route }: any) => {
    const { initial } = route.params;
    const { goBack, navigate } = useNavigation();
    const dispatch = useDispatch();
    const sports = useSelector((state: RootState) => state.sports);
    const user = useSelector((state: RootState) => state.user);

    const handleGoBack = () => {
        goBack();
    }

    const handleNavigationToVenuePage = () => {
        navigate(ROUTES.MAIN_VENUE);
    }

    const handleNavigationToEventPage = () => {
        if(!initial) goBack();
            else navigate(ROUTES.MAIN_EVENT)
    }

    const userClicked = (id: any) => {
        dispatch(clickedSports(id));
    }

    const userClickedGender = (indexId: any, id: any, gender: string) => {
        dispatch(clickedGender({ indexId, id, gender}));
    }

    const userClickedLeague = (parentIndex: any, indexId: any, sports: string, id: string) => {
        dispatch(clickedLeague({parentIndex, indexId, sports, id}));
    }

    const userClickedTeam = (parentIndex: any, indexId: any, sports: string, id: string) => {
        dispatch(clickedTeam({parentIndex, indexId, sports, id}));
    }

    const RenderContentTextCircle = ({ item, parentIndex }: any) => {
        return (
            item.length > 0 ?
            <RenderContent>
                {item.map((content: any, index: any) => (
                    <TouchableOpacity onPress={() => userClickedLeague(parentIndex, index, content.sport_id, content.id)} key={index} style={{ marginVertical: 5 }}>
                        <SelectionBackground style={{backgroundColor: content.clicked ? '#122C5B' : '#F4F4F4', borderColor: content.clicked ? '#122C5B' : "#F4F4F4"}}>
                            <SelectionBackgroundText style={{color: content.clicked ? '#FFFFFF' : '#000000', fontFamily: 'OpenSans_semibold', textTransform: 'capitalize'}}>
                                {content.name}
                            </SelectionBackgroundText>
                        </SelectionBackground>
                    </TouchableOpacity>
                ))}
            </RenderContent> : null
        );
    }

    const RenderContentIconCircle = ({ item, parentIndex }: any) => {
        return (
            item.length > 0 ? 
            <RenderContent>
                {item.map((content: any, index: any) => (
                    <TouchableOpacity onPress={() => userClickedTeam(parentIndex, index, content.sport_id, content.id)} key={index}>
                        <SelectionFollowCircle style={{marginVertical: 5}}>
                            <SelectionBackgroundCircle style={{marginBottom: 5, backgroundColor: content.clicked ? '#122C5B' : '#F4F4F4', width: 80, height: 80, borderRadius: 40 }}>
                                {!!content.icon ? 
                                <ImageContent source={{
                                    uri: content.icon,
                                  }} resizeMode="contain" style={{ width: '50%', height: '50%' }} /> :
                                // <FontAwesome name="file-image-o" size={24} color={content.clicked ? '#FFFFFF' : '#000000'}/>: 
                                <SelectionBackgroundText style={{color: content.clicked ? '#FFFFFF' : '#000000', fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', fontStyle: 'normal'}}>
                                    {content.title}
                                </SelectionBackgroundText>}
                            </SelectionBackgroundCircle>
                            <CircleLabel style={{color: '#000000', fontSize: 12, textTransform: 'none'}}>{content.title}</CircleLabel>
                        </SelectionFollowCircle>
                    </TouchableOpacity>
                ))}
            </RenderContent> : null
        );
    }

    useEffect(() => {
        if(sports.data.length === 0) dispatch(fetchSports(user.token));
        if(sports.leagues.length < 2) dispatch(fetchLeague(user.token));
        if(sports.teams.length < 2) dispatch(fetchTeam(user.token));
    }, [])

    useEffect(() => {
        console.log('Selected: ', sports.followed)
    }, [sports.followed])
    
    return (
        <Container>
            <Header transparent>
                <Left style={{ flex: 0.2, paddingLeft: 10 }}>
                    { !initial ? <Button transparent onPress={() => handleGoBack()}>
                        <Entypo name='chevron-thin-left' style={{ color: '#000000' }} size={24} />
                        </Button> : null}
                </Left>
                <Body style={{ flex: 0.6, justifyContent: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18,fontWeight: 'bold', fontStyle: 'italic', textTransform: 'uppercase' }}>FOLLOW SPORTS</Text>
                </Body>
                <Right style={{ flex: 0.21, paddingRight: 10 }}>
                    <Button hasText transparent onPress={handleNavigationToEventPage}>
                        <Text style={{ color: '#000000', fontWeight: 'bold' }}>Skip</Text>
                    </Button>
                </Right>
            </Header>
            <Content showsVerticalScrollIndicator={false}>
                {sports.followed.length > 0 && sports.data.length > 0 ? 
                    sports.followed.filter(obj => obj.onTop === true).map((data, index) => (
                        <View key={index} style={{ marginBottom: 20 }}>
                            <CollapseContent title={'Collapse Football'}>
                                <Category>
                                    <View style={{ marginBottom: 10,flexDirection: "row", flexWrap: "wrap"}}>
                                        <TouchableOpacity onPress={() => userClicked(data.sports)}>
                                            <SelectionCircleWrap>
                                                <SelectionBackgroundCircle style={{ backgroundColor: data.details.clicked ? '#CFF973' : '#F4F4F4', marginBottom: 5 }}>
                                                    <ImageContent source={{uri: data.details.icon}} resizeMode="contain" style={{ width: '50%', height: '50%' }} />
                                                </SelectionBackgroundCircle>
                                                <CircleLabel style={{color: '#000000'}}>{data.details.name}</CircleLabel>
                                            </SelectionCircleWrap>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => userClickedGender(index, data.sports, "men")}>
                                            <SelectionCircleWrap>
                                                <SelectionBackgroundCircle style={{ backgroundColor: data.gender.includes("men") ? '#CFF973' : '#F4F4F4', marginBottom: 5 }}>
                                                    <ImageContent source={male} resizeMode="contain" style={{ width: '50%', height: '50%' }} />
                                                </SelectionBackgroundCircle>
                                                <CircleLabel style={{color: '#000000'}}>Mens</CircleLabel>
                                            </SelectionCircleWrap>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => userClickedGender(index, data.sports, "women")}>
                                            <SelectionCircleWrap>
                                                <SelectionBackgroundCircle style={{ backgroundColor: data.gender.includes("women") ? '#CFF973' : '#F4F4F4', marginBottom: 5 }}>
                                                    <ImageContent source={female} resizeMode="contain" style={{ width: '50%', height: '50%' }} />
                                                </SelectionBackgroundCircle>
                                                <CircleLabel style={{color: '#000000'}}>Womens</CircleLabel>
                                            </SelectionCircleWrap>
                                        </TouchableOpacity>
                                    </View>
                                </Category>
                            </CollapseContent>
                            <CollapseContent title={'Collapse league name'}>
                                <RenderContentTextCircle item={data.league} parentIndex={index}/>
                            </CollapseContent>
                            <CollapseContent title={'collapse team name'}>
                                <RenderContentIconCircle item={data.team} parentIndex={index}/>
                            </CollapseContent>
                        </View>
                    )) : null}
                <Category style={{ marginBottom: 90, flexDirection: 'row' }}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", width: '100%'}}>
                        {sports.data.length > 0 ? 
                            sports.data.map((data, index) => (
                                sports.followed.length > 0 ? sports.followed.filter(obj => obj.onTop === true).length > 0 ? sports.followed.filter(obj => obj.onTop === true)[0].sports.toLowerCase() !== data.id.toLowerCase() &&
                                <TouchableOpacity key={index} onPress={() => userClicked(data.id)}>
                                    <SelectionCircleWrap>
                                        <SelectionBackgroundCircle style={{ backgroundColor: data.clicked ? '#CFF973' : '#F4F4F4', marginBottom: 5 }}>
                                            <ImageContent source={{uri: data.icon}} resizeMode="contain" style={{ width: '50%', height: '50%' }} />
                                        </SelectionBackgroundCircle>
                                        <CircleLabel style={{color: '#000000'}}>{data.name}</CircleLabel>
                                    </SelectionCircleWrap>
                                </TouchableOpacity> : <TouchableOpacity key={index} onPress={() => userClicked(data.id)}>
                                    <SelectionCircleWrap>
                                        <SelectionBackgroundCircle style={{ backgroundColor: data.clicked ? '#CFF973' : '#F4F4F4', marginBottom: 5 }}>
                                            <ImageContent source={{uri: data.icon}} resizeMode="contain" style={{ width: '50%', height: '50%' }} />
                                        </SelectionBackgroundCircle>
                                        <CircleLabel style={{color: '#000000'}}>{data.name}</CircleLabel>
                                    </SelectionCircleWrap>
                                </TouchableOpacity> : <TouchableOpacity key={index} onPress={() => userClicked(data.id)}>
                                    <SelectionCircleWrap>
                                        <SelectionBackgroundCircle style={{ backgroundColor: data.clicked ? '#CFF973' : '#F4F4F4', marginBottom: 5 }}>
                                            <ImageContent source={{uri: data.icon}} resizeMode="contain" style={{ width: '50%', height: '50%' }} />
                                        </SelectionBackgroundCircle>
                                        <CircleLabel style={{color: '#000000'}}>{data.name}</CircleLabel>
                                    </SelectionCircleWrap>
                                </TouchableOpacity>
                            ))
                        : null}
                    </View>
                </Category>
            </Content>
            <FooterFollow>
                <ButtonFollow onPress={handleNavigationToEventPage}>
                    <ButtonText>
                        Confirm Selections
                    </ButtonText>
                </ButtonFollow>
            </FooterFollow>
        </Container>
    );
};

export default Follow;
