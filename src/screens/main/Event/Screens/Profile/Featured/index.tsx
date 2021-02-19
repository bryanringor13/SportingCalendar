import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Body, Container, Left, Right, List, ListItem, Card, CardItem } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import headerBackground from '../../../../../../assets/images/profile_details/football.png';
import arsenal from '../../../../../../assets/images/profile_details/arsenal_2x.png';
import everton from '../../../../../../assets/images/profile_details/everton_2x.png';
import chelsea from '../../../../../../assets/images/profile_details/chelsea_2x.png';
import netherlands from '../../../../../../assets/images/profile_details/netherlands_2x.png';
import sheffield_united from '../../../../../../assets/images/profile_details/sheffield_united_2x.png';
import south_ampton from '../../../../../../assets/images/profile_details/south_ampton_2x.png';
import { BackgroundHeader, HeaderContent, RenderContent, SelectionBackground, SelectionBackgroundCircle, SelectionBackgroundText, SelectionCircle, CircleLabel, RenderContentScrollHorizontal, Circle, ImageContent, HightLightHead, HightLightHeadText, SelectionCircleHorizontalScroll } from '../../../../../../components/Styles';
import { HeaderProfileTitle, HeaderNameText, CircleHighlightButton } from '../styles';
import { BodyContent, BodyContentHead, BodyContentHeadTitle, HeaderFeaturedContent, HeaderFeaturedTop, HeaderFeaturedTitle, FeaturedContent, FooterContent, screenHeight } from './styles';
import { useNavigation } from '@react-navigation/native';

const Featured = ({ route, navigation }: any) => {
    const { titlePage, titleColor, headBackground } = route.params;
    const { goBack, navigate } = useNavigation();
    const handleGoBack = () => {
        goBack();
    }
    const [featuredData, setFeaturedData] = useState({
        womens: {
            title: 'Womens',
            leagues: ['FA Cup', 'World Cup'],
            teams: [
                {teamName: 'Chelsea', logoUrl: chelsea},
                {teamName: 'Arsenal', logoUrl: arsenal},
                {teamName: 'Everton', logoUrl: everton},
                {teamName: 'Netherlands', logoUrl: netherlands}
            ]
        },
        mens: {
            title: 'Mens',
            leagues: ['Premier League'],
            teams: [
                {teamName: 'Chelsea', logoUrl: chelsea},
                {teamName: 'Arsenal', logoUrl: arsenal},
                {teamName: 'Sheffield United', logoUrl: sheffield_united},
                {teamName: 'Southampton', logoUrl: south_ampton}
            ]
        }
    })
    const EmptyComponent = () => {
        return (
            <Text>{'No Data Available'}</Text>
        )
    }
    const ProfileRender = ({ data }: any) => {
        return (
            <TouchableOpacity onPress={() => console.log('hi')} 
                style={{ paddingLeft: 10, paddingRight: 10 }} // adjust the styles to suit your needs
                >
                <Card style={{height:120, width: '100%', backgroundColor: '#000'}} />
            </TouchableOpacity>
        )
    }
    const DividerContent = ({ title, count }: any) => {
        return (
            <HightLightHead>
                <HightLightHeadText>
                    {title}{' '}({count})
                </HightLightHeadText>
            </HightLightHead>
        )
    }
    const CategoryContentHighlightText = ({ data }:any) => {
        return (
            <View style={{ paddingStart: 20, paddingVertical: 20}}>
                <RenderContentScrollHorizontal horizontal={true}>
                    {data.map((text: any, index: any) => (
                        <SelectionBackground key={index} style={{backgroundColor: '#122C5B'}}>
                            <SelectionBackgroundText style={{ color: '#FFFFFF', fontStyle: 'normal', fontSize: 14}}>
                                {text}
                            </SelectionBackgroundText>
                        </SelectionBackground>
                    ))}
                </RenderContentScrollHorizontal>
            </View>
        )
    }
    const CategoryContentHighlightCircle = ({ data }: any) => {
        return (
            <View style={{ paddingStart: 20, paddingVertical: 20}}>
                <RenderContentScrollHorizontal horizontal={true} showsHorizontalScrollIndicator={false}>
                    {data.map((team: any, index: any) => (
                        <SelectionCircleHorizontalScroll key={index} style={{ paddingRight: 10 }}>
                            <SelectionBackgroundCircle style={{ backgroundColor: '#122C5B',marginBottom: 5, flexDirection: 'row',justifyContent: 'center' }}>
                                <ImageContent source={team.logoUrl} resizeMode="contain" style={{ width: 50, height: 100}} />
                            </SelectionBackgroundCircle>
                            <CircleLabel style={{color: '#000000'}}>{team.teamName}</CircleLabel>
                        </SelectionCircleHorizontalScroll>
                    ))}
                </RenderContentScrollHorizontal>
            </View>
        )
    }

    return (
        <FeaturedContent showsVerticalScrollIndicator={false}>
            <HeaderContent style={{ height: (screenHeight * 0.30), backgroundColor: '#122C5B' }} >
                <BackgroundHeader source={{uri: headBackground}}>
                    <HeaderFeaturedTop>
                        <CircleHighlightButton onPress={() => handleGoBack()} style={{ backgroundColor: '#FFFFFF', alignItems: 'center',borderColor: '#FFFFFF', borderRadius: 50, paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 5}}>
                            <AntDesign name='left' size={25} color={'#000000'} style={{height: 25}} />
                        </CircleHighlightButton>
                        <CircleHighlightButton style={{ height: 30, backgroundColor: '#FFFFFF', borderColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{ color: '#000000', textTransform: 'uppercase', fontSize: 15, fontWeight: 'bold', fontFamily: 'TradeGothic_bold' }}>Edit</Text>
                        </CircleHighlightButton>
                    </HeaderFeaturedTop>
                    <HeaderFeaturedContent>
                        <HeaderFeaturedTitle style={{color: titleColor.length > 0 ? titleColor : '#FFFFFF', fontFamily: 'TradeGothic_italic_bold'}}>{titlePage}</HeaderFeaturedTitle>
                    </HeaderFeaturedContent>
                </BackgroundHeader>
            </HeaderContent>
            <BodyContent>
                {/* Womens */}
                <BodyContentHead>
                    <BodyContentHeadTitle style={styles.outLineText}>{featuredData.womens.title}</BodyContentHeadTitle>
                </BodyContentHead>
                <DividerContent title={'leagues'} count={featuredData.womens.leagues.length}/>
                <CategoryContentHighlightText data={featuredData.womens.leagues} />
                <DividerContent title={'teams'} count={featuredData.womens.teams.length}/>
                <CategoryContentHighlightCircle data={featuredData.womens.teams}/>
                {/* Mens */}
                <BodyContentHead>
                    <BodyContentHeadTitle style={styles.outLineText}>{featuredData.mens.title}</BodyContentHeadTitle>
                </BodyContentHead>
                <DividerContent title={'leagues'} count={featuredData.mens.leagues.length}/>
                <CategoryContentHighlightText data={featuredData.mens.leagues} />
                <DividerContent title={'teams'} count={featuredData.mens.teams.length}/>
                <CategoryContentHighlightCircle data={featuredData.mens.teams}/>
            </BodyContent>
            <FooterContent />
        </FeaturedContent>
    );
}

const styles = StyleSheet.create({
    outLineText: {
        textShadowOffset: {width: 0, height: 0}, 
        textShadowRadius: 1, 
        textShadowColor: '#000000',
        color: '#FFFFFF',
    }
});

export default Featured
