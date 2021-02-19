import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, KeyboardAvoidingView, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { Body, Button, Content, Header, Icon, Input, Item, Label, Left, List, ListItem, Right } from 'native-base';
import { ContainerFixed } from '../../../../../../../components/Styles';

const ContentDisplay = () => {
    const route = useRoute(); // route.name
    const { name, content }: any = route.params;
    const routeName = route.name.toLowerCase();
    const dispatch = useDispatch();
    const { goBack } = useNavigation();

    function handleGoBack() {
        goBack();
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
          <Content style={{ padding: 20 }}>
            <Text style={{ textAlign: 'justify' }}>
              {content}
            </Text>
          </Content>
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


export default ContentDisplay