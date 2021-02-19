import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, KeyboardAvoidingView, StyleSheet, Platform, TouchableOpacity, Animated, TextInput, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo, AntDesign, Octicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Body, Button, Card, Content, Form, Header, Icon, Input, Item, Label, Left, List, ListItem, Picker, Right, Switch } from 'native-base';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { BackgroundHeader, CircleHighlightButton, ContainerFixed, Divider, EventName, LinerInBetween, screenHeight, screenWidth, TextOr } from '../../../../../../components/Styles';

import { RootState } from '../../../../../../redux/reducers';
import { ROUTES } from '../../../../../../config/consts/routes';
import { icon } from '../../../../../../config/consts/theme';


const CARD_HEIGHT = 220;
const CARD_WIDTH = screenWidth * 0.8;
const SPACING_FOR_CARD_INSET = screenWidth * 0.1 - 5;

const EventMaps = () => {
    const route = useRoute(); // route.name
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const maps = useSelector((state: RootState) => state.maps);
    const { goBack, navigate } = useNavigation();

    const [seletectSport, setSelectedSport] = useState('key0');
    const [genderSwitch, setGenderSwitch] = useState('');

    function handleGoBack() {
        goBack();
    }

    const onMarkerPress = (event: any) => {

    }

    const sportsSelectionHandler = (sportsId: any) => {
      console.log('Selection: ', sportsId.toString())
      setSelectedSport(sportsId.toString())
    }

    const eventDetailsHandler = (titlePage: any, headBackground: any) => {
        navigate(ROUTES.SCREEN_EVENTS_DETAILS, {
            titlePage: titlePage,
            headBackground: headBackground,
        });
    }

    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);

    const switchGenderHandler = (gender: string) => {
      setGenderSwitch(gender)
    }

    return (
      <View style={styles.container}>
        <MapView 
          provider={PROVIDER_GOOGLE} 
          style={{ width: screenWidth, height: screenHeight }} 
          initialRegion={!!user.location ? user.location : null}
        >
          {!!maps.data && maps.data.map((marker, index) => {

            return (<Marker key={index} coordinate={marker.coordinate} onPress={(e)=>onMarkerPress(e)}>
                <Animated.View style={[styles.markerWrap]}>
                  <Animated.Image
                    source={icon.mapMarker}
                    style={[styles.marker]}
                    resizeMode="cover"
                  />
                </Animated.View>
              </Marker>)
          })}
        </MapView>
        <View style={styles.header}>
          <Left style={{ flex: 0.2}}>
            <CircleHighlightButton style={{ backgroundColor: '#FFFFFF', borderRadius: 20, width: 40, borderWidth: 0, justifyContent: 'center', alignItems: 'center' }} onPress={() => handleGoBack()}>
              <Entypo name='chevron-thin-left' style={{ color: '#000000' }} size={24} />
            </CircleHighlightButton>
          </Left>
          <Body style={{ flex: 0.6 }}>
            <Form style={{ backgroundColor: '#9B9B9B', paddingStart: 30, paddingEnd: 30, borderRadius: 20 }}>
              <Picker
                mode="dropdown"
                iosHeader="Select Sports"
                iosIcon={<AntDesign name="down" style={{ color: "#000000", fontSize: 20 }} />}
                style={{ width: undefined }}
                selectedValue={seletectSport}
                onValueChange={(event: any) => sportsSelectionHandler(event)}
              >
                <Picker.Item label="Football" value="key0" />
                <Picker.Item label="Cricket" value="key1" />
                <Picker.Item label="Rugby" value="key2" />
                <Picker.Item label="Horse Racing" value="key3" />
                <Picker.Item label="Golf" value="key4" />
              </Picker>
            </Form>
          </Body>
          <Right style={{ flex: 0.4 , alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity>
              <Image source={icon.search} style={{ height: 30, width: 30,resizeMode: 'contain' }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginStart: 20 }}>
              <Image source={icon.setting2} style={{ height: 25, width: 25,resizeMode: 'contain' }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginStart: 20 }}>
              <Image source={icon.listView} style={{ height: 25, width: 25,resizeMode: 'contain' }} />
            </TouchableOpacity>
          </Right>
        </View>

        {/* GENDER */}
          <View style={styles.selectGenderView}>
            <View style={{ flexDirection: 'row',width: '100%', height: 40 }}>
              <TouchableOpacity onPress={() => switchGenderHandler('womens')} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center',backgroundColor: genderSwitch.toLowerCase() === 'womens' ? '#9B9B9B' : '#FFFFFF', borderColor: '#F0F0F0', borderWidth: 1 }}>
                <View>
                    <Text style={genderSwitch.toLowerCase() === 'womens' ? styles.genderSelected : styles.genderUnselected}>Womens</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => switchGenderHandler('mens')} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', backgroundColor: genderSwitch.toLowerCase() === 'mens' ? '#9B9B9B' : '#FFFFFF', borderColor: '#F0F0F0', borderWidth: 1 }}>
                <View>
                    <Text style={genderSwitch.toLowerCase() === 'mens' ? styles.genderSelected : styles.genderUnselected}>Mens</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        {/* GENDER */}

        {/* EVENT DATE */}
        <Divider style={{ position: "absolute", bottom: 170, left: 20 }}>
          <TextOr style={{ color: '#000000', fontFamily: 'TradeGothic_bold', textTransform: 'uppercase', letterSpacing: 3 }}>16th January</TextOr>
          <LinerInBetween style={{ marginStart: 15,height: 1, backgroundColor: '#000000' }}/>
        </Divider>
        {/* EVENT DATE */}

        <Animated.ScrollView
          ref={_scrollView}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          style={styles.scrollView}
          contentInset={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 20
          }}
          // contentContainerStyle={{
          //   paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
          // }}
        >
          {maps.data.map((event: any, index: any) => {
              return (
                  <TouchableOpacity onPress={()=> eventDetailsHandler(event.eventName, event.eventHeaderImage)} key={index} style={{flexDirection: 'row', width: (screenWidth * 0.8), marginRight: 20, overflow: "hidden"}}>
                      <Card style={{height:120, width: '40%', backgroundColor: '#122C5B', borderColor: '#F0F0F0', borderWidth: 1}}>
                          <BackgroundHeader source={event.eventHeaderImage} style={{justifyContent: 'center'}} />
                          <View style={{ position: 'absolute', bottom: 5, left: 5, width: 30, height: 30, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                              <MaterialCommunityIcons name={'soccer'} size={20} />
                          </View>
                      </Card>
                      <View style={{marginTop: 5,marginBottom: 5, width: '58%', padding: 10, backgroundColor: '#FFFFFF', borderColor: '#F0F0F0', borderWidth: 1}}>
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
        </Animated.ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headTextStyle: {
    fontSize: 48,
    fontStyle: 'italic',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#122C5B',
    fontFamily: 'TradeGothic_italic_bold',
    textShadowOffset: { width: 0, height: 0 }, 
    textShadowRadius: 1, 
    textShadowColor: '#FFFFFF'
  },
  genderSelected: {
    fontFamily: 'TradeGothic_bold',
    letterSpacing: 5, 
    textTransform: 'uppercase',
  },
  genderUnselected: {
    fontFamily: 'OpenSans_regular', 
    letterSpacing: 1, 
    textTransform: 'uppercase'
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0,
    padding: 15,
    width: 150
  },
  name: {
    fontSize: 16,
    marginBottom: 5
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#FFFFFF',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  header: {
    position:'absolute', 
    marginTop: Platform.OS === 'ios' ? 50 : 30, 
    flexDirection:"row",
    width: '100%',
    alignSelf:'center',
    borderRadius: 5,
    paddingHorizontal: 20
  },
  selectGenderView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 110 : 100, 
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingBottom: 20,
    paddingLeft: 20
  },
  endPadding: {
    paddingRight: screenWidth - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 50,
    height: 50,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: '100%',
      padding:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  },
  textSign: {
      fontSize: 14,
      fontWeight: 'bold'
  }

});


export default EventMaps