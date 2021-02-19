import { useNavigation } from '@react-navigation/native'
import { Body, Button, CheckBox, Container, Content, Header, Icon, Left, Right, Title } from 'native-base'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { Octicons, AntDesign, Entypo } from '@expo/vector-icons';
import { ButtonFilter, ButtonText, Category, Circle, ContentHeader, ContentDetails, ContentDateLabel, ContentDateSection, ContentDateText, ContentTitle, FooterFilter, ResetButtonText, ContentDistanceLabel, ContentDistanceHeader, ContentDistanceBody, ContentLocationBody, ContentLocationHeader, ContentLocationLabel, ContentLocationAddress, ContentLocationAddressText, ContentUpcomingTicket, ContentUpcomingTicketLabel, ContentUpcomingTicketDetail, ContentLeagTeams, ContentLeagTeamsDetails, ContentLeague, ContentLeagTeamLabel, ContentLeagTeamTitle, ContentLeagTeamText, RenderContentLeagTeam } from './styles'
import Slider from '@react-native-community/slider';
import { CircleContent, CircleLabel, ImageContent, SelectionBackgroundCircle, SelectionBackgroundText, SelectionFollowCircle } from '../../../../../components/Styles';
import { ROUTES } from '../../../../../config/consts/routes';
import moment, { weekdays } from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RootState } from '../../../../../redux/reducers';
import { useSelector } from 'react-redux';

const dateNow = moment();

const Filter = () => {
    const { goBack, navigate } = useNavigation();
    const sports = useSelector((state: RootState) => state.sports)
    const [milesAway, setMilesAway] = useState(0);
    const [notSorted, setNotSorted] = useState(false);
    const [dateSorted, setDateSorted] = useState(false);
    const [dateFrom, setDateFrom] = useState(dateNow);
    const [dateTo, setDateTo] = useState(dateNow);
    const [dateIdentifier, setDateIdentifier] = useState('');

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date: any) => {
        dateIdentifier.toLowerCase() === 'from' && setDateFrom(date)
        dateIdentifier.toLowerCase() === 'to' && setDateTo(date)
      hideDatePicker();
    };


    const handleGoBack = () => {
        goBack();
    }

    const handlerNavigateToApply = () => {
        handleGoBack()
    }

    const handleNavigationToFollowPage = () => {
        navigate(ROUTES.FILTER_FOLLOW, {
            initial: false
        });
    }

    const handleNavigationToMapsPage = () => {
        navigate(ROUTES.EVENTS_MAPS);
    }

    const changeMilesAwayHandler = (data: any) => {
        setMilesAway(Math.trunc(data))
    }

    const upCommingTicketReleaseSortBy = (sort: string) => {
        if(sort.toLowerCase() === 'notsorted') {
            setNotSorted(!notSorted) 
            setDateSorted(false)
        }
        if(sort.toLowerCase() === 'bydate') {
            setDateSorted(!dateSorted)
            setNotSorted(false)
        }
    }

    const datePickerHander = (dateIndentifier:  string) => {
        setDateIdentifier(dateIndentifier)
        setDatePickerVisibility(true);
    }

    return (
        <Container>
            <Header transparent>
                <Left style={{ flex: 0.2, paddingLeft: 10, flexDirection: 'row'}}>
                    <Button transparent onPress={handleGoBack}>
                        <Entypo name='chevron-thin-left' style={{ color: '#000000' }} size={24} />
                    </Button>
                </Left>
                <Body style={{ flex: 0.6, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18,fontWeight: 'bold', fontStyle: 'italic', textTransform: 'uppercase' }}>filters</Text>
                </Body>
                <Right style={{ flex: 0.2, paddingRight: 10 }}>
                    <Button hasText transparent>
                        <ResetButtonText>Reset</ResetButtonText>
                    </Button>
                </Right>
            </Header>
            <Content showsVerticalScrollIndicator={false}>
                <ContentHeader>
                    <ContentTitle>Date</ContentTitle>
                </ContentHeader>
                <ContentDetails>
                    <TouchableOpacity onPress={() => datePickerHander('from')}>
                        <ContentDateSection>
                            <ContentDateLabel>From</ContentDateLabel>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <ContentDateText>{moment(dateFrom).format('DD MMMM YYYY')}</ContentDateText>
                                <AntDesign name="down" size={12} style={{ marginStart: 10 }}/>
                            </View>
                        </ContentDateSection>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => datePickerHander('to')}>
                        <ContentDateSection>
                            <ContentDateLabel>To</ContentDateLabel>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <ContentDateText>{moment(dateTo).format('DD MMMM YYYY')}</ContentDateText>
                                <AntDesign name="down" size={12} style={{ marginStart: 10 }}/>
                            </View>
                        </ContentDateSection>
                    </TouchableOpacity>
                </ContentDetails>
                <ContentHeader>
                    <ContentTitle>Distance From Me</ContentTitle>
                </ContentHeader>
                <ContentDetails>
                    <ContentDistanceBody>
                        <ContentDistanceHeader>
                            <Octicons name='location' size={17} />
                            <ContentDistanceLabel>
                                {milesAway} miles away
                            </ContentDistanceLabel>
                        </ContentDistanceHeader>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor="#000000"
                            maximumTrackTintColor="#F5F5F5"
                            onValueChange={(data) => changeMilesAwayHandler(data)}
                        />
                    </ContentDistanceBody>
                </ContentDetails>
                <ContentHeader>
                    <ContentTitle>Location</ContentTitle>
                </ContentHeader>
                <ContentDetails>
                    <ContentLocationBody>
                        <ContentLocationHeader>
                            <ContentLocationLabel>
                                Searching
                            </ContentLocationLabel>
                        </ContentLocationHeader>
                        <TouchableOpacity onPress={() => handleNavigationToMapsPage()}>
                            <ContentLocationAddress>
                                <ContentLocationAddressText>Emirates Stadium, Hornsey Road, London, N7 7Aj</ContentLocationAddressText>
                                <AntDesign name='right' size={18} />
                            </ContentLocationAddress>
                        </TouchableOpacity>
                    </ContentLocationBody>
                </ContentDetails>
                <ContentHeader>
                    <ContentTitle>Upcoming Ticket Release Sort By</ContentTitle>
                </ContentHeader>
                <ContentDetails>
                    <ContentUpcomingTicket>
                        <ContentUpcomingTicketDetail>
                            <ContentUpcomingTicketLabel>Not Sorted</ContentUpcomingTicketLabel>
                            <CheckBox color='#000' checked={notSorted} onPress={() => upCommingTicketReleaseSortBy('notsorted')}/>
                        </ContentUpcomingTicketDetail>
                        <ContentUpcomingTicketDetail>
                            <ContentUpcomingTicketLabel>Date (Closest to Furthest)</ContentUpcomingTicketLabel>
                            <CheckBox color='#000' checked={dateSorted} onPress={() => upCommingTicketReleaseSortBy('bydate')}/>
                        </ContentUpcomingTicketDetail>
                    </ContentUpcomingTicket>
                </ContentDetails>
                {/* SPORTS */}
                <ContentHeader>
                    <ContentTitle>SPORTS</ContentTitle>
                </ContentHeader>
                <ContentLeague>
                    <ContentLeagTeams>
                        <TouchableOpacity onPress={handleNavigationToFollowPage}>
                            <ContentLeagTeamsDetails>
                                <ContentLocationLabel>Current Selections</ContentLocationLabel>
                                <AntDesign name='right' size={18} />
                            </ContentLeagTeamsDetails>
                        </TouchableOpacity>
                    </ContentLeagTeams>
                    <Category horizontal>
                        {sports.followed.map((data, index) => (
                            // <TouchableOpacity key={index}>
                            //     <CircleContent>
                            //         <Circle style={{ width: 100, height: 100, borderRadius: 60, backgroundColor: '#CFF973' }} />
                            //         <CircleLabel>{data.details.name}</CircleLabel>
                            //     </CircleContent>
                            // </TouchableOpacity>
                            // <TouchableOpacity key={index}>
                            <SelectionFollowCircle style={{marginVertical: 5}} key={index}>
                                <SelectionBackgroundCircle style={{marginBottom: 5, backgroundColor: '#122C5B', width: 80, height: 80, borderRadius: 40 }}>
                                    {!!data.details.icon ? 
                                    <ImageContent source={{
                                        uri: data.details.icon,
                                    }} resizeMode="contain" style={{ width: '50%', height: '50%' }} /> :
                                    <SelectionBackgroundText style={{color: data.details.clicked ? '#FFFFFF' : '#000000', fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', fontStyle: 'normal'}}>
                                        {data.details.title}
                                    </SelectionBackgroundText>}
                                </SelectionBackgroundCircle>
                                <CircleLabel style={{color: '#000000', fontSize: 12, textTransform: 'none'}}>{data.details.name}</CircleLabel>
                            </SelectionFollowCircle>
                            // </TouchableOpacity>
                        ))}
                    </Category>
                </ContentLeague>
                {/* END SPORTS */}
                <ContentHeader>
                    <ContentTitle>Leagues & Teams</ContentTitle>
                </ContentHeader>
                <ContentLeague>
                    <ContentLeagTeams>
                        <TouchableOpacity onPress={handleNavigationToFollowPage}>
                            <ContentLeagTeamsDetails>
                                <ContentLocationLabel>Current Selections</ContentLocationLabel>
                                <AntDesign name='right' size={18} />
                            </ContentLeagTeamsDetails>
                        </TouchableOpacity>
                    </ContentLeagTeams>
                    {sports.followed.map((sport, index) => (
                        <View key={index}>
                            <ContentLeagTeamLabel>
                                {sport.details.name}
                            </ContentLeagTeamLabel>
                            <Category style={{ marginBottom: 0,paddingStart: 20 }} horizontal showsHorizontalScrollIndicator={false}>
                                {sport.league.filter((leagueSelected: any) => leagueSelected.clicked == true).map((league: any, index: any) => (
                                    league.id.toLowerCase() !== '1' && <RenderContentLeagTeam style={{ paddingHorizontal: 5 }} key={index}>
                                        <ContentLeagTeamTitle>
                                            <ContentLeagTeamText>
                                                {league.name}
                                            </ContentLeagTeamText>
                                        </ContentLeagTeamTitle>
                                    </RenderContentLeagTeam>
                                ))}
                            </Category>
                            <Category style={{ paddingStart: 20 }} horizontal showsHorizontalScrollIndicator={false}>
                                {sport.team.filter((teamSelected: any) => teamSelected.clicked == true).map((team: any, index: any) => (
                                    // <TouchableOpacity key={index}>
                                    //     <CircleContent>
                                    //         <Circle style={{ width: 85, height: 85, backgroundColor: '#122C5B', borderRadius: 50 }}/>
                                    //     </CircleContent>
                                    // </TouchableOpacity>
                                    team.id.toLowerCase() !== '1' &&
                                    <SelectionFollowCircle style={{marginVertical: 5}} key={index}>
                                        <SelectionBackgroundCircle style={{marginBottom: 5, backgroundColor: '#122C5B', width: 80, height: 80, borderRadius: 40 }}>
                                            {!!team.icon ? 
                                            <ImageContent source={{
                                                uri: team.icon,
                                            }} resizeMode="contain" style={{ width: '50%', height: '50%' }} /> :
                                            <SelectionBackgroundText style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', fontStyle: 'normal'}}>
                                                {team.title}
                                            </SelectionBackgroundText>}
                                        </SelectionBackgroundCircle>
                                        <CircleLabel style={{color: '#000000', fontSize: 12, textTransform: 'none'}}>{team.name}</CircleLabel>
                                    </SelectionFollowCircle>
                                ))}
                            </Category>
                        </View>
                    ))}
                </ContentLeague>
                <FooterFilter>
                    <ButtonFilter onPress={handlerNavigateToApply}>
                        <ButtonText>
                            Apply
                        </ButtonText>
                    </ButtonFilter>
                </FooterFilter>
            </Content>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </Container>
    )
}

export default Filter
