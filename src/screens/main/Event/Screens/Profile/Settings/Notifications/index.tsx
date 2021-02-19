import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, KeyboardAvoidingView, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { Body, Button, Content, Header, Icon, Input, Item, Label, Left, List, ListItem, Right } from 'native-base';
import { Switch } from '@5stones/react-native-switch';
import { ContainerFixed, screenWidth, ScrollContent } from '../../../../../../../components/Styles';
import { RootState } from '../../../../../../../redux/reducers';
import { setNotif } from '../../../../../../../redux/actions/notif';

const Notifications = () => {
    const route = useRoute(); // route.name
    const { name, content }: any = route.params;
    const routeName = route.name.toLowerCase();
    const state = useSelector((state: RootState) => state.notif)
    const dispatch = useDispatch();
    const { goBack } = useNavigation();

    function handleGoBack() {
        goBack();
    }

    const switchToggleHandler = (id: number,status: boolean) => {
      dispatch(setNotif({id, status}))
    }

    return (
      <ContainerFixed>
          <Header>
                <Left style={{ flex: 0.2, paddingLeft: 10, flexDirection: 'row' }}>
                    <Button transparent onPress={handleGoBack}>
                        <Entypo name='chevron-thin-left' style={{ color: '#000000' }} size={24} />
                    </Button>
                </Left>
                <Body style={{ flex: 0.6, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18,fontWeight: 'bold', fontStyle: 'italic', textTransform: 'uppercase' }}>{name}</Text>
                </Body>
                <Right style={{ flex: 0.2, paddingRight: 10 }} />
          </Header>
          <ScrollContent>
            {state.list.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginBottom: 20 }}>
                <View style={{ width: (screenWidth * 0.7), paddingEnd: 20}}>
                  <Text>
                    {item.content}
                  </Text>
                </View>
                <View style={{ width: (screenWidth * 0.2), paddingStart: 10 }}>
                  <Switch 
                    value={item.status}
                    circleSize={30}
                    activeText={'Off'}
                    inActiveText={'On'}
                    backgroundActive={'gray'}
                    backgroundInactive={'#000000'}
                    innerCircleStyle={{ alignItems: "center",justifyContent: "center", borderColor: !item.status ? '#000000' : 'gray', }}
                    onValueChange={(val: boolean) => switchToggleHandler(index, val)}
                    circleBorderWidth={3}
                    outerCircleStyle={{ borderColor: 'black', width: 50, marginLeft: !item.status ? 11 : -1 }}
                    switchBorderRadius={15}
                  />
                </View>
              </View>
            ))}
          </ScrollContent>
      </ContainerFixed>
    );
};

const styles = StyleSheet.create({
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
});


export default Notifications