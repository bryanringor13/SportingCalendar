import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, KeyboardAvoidingView, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { Body, Button, Content, Header, Icon, Input, Item, Label, Left, List, ListItem, Right } from 'native-base';
import { ContainerFixed, ScrollContent } from '../../../../../../../components/Styles';
import { RootState } from '../../../../../../../redux/reducers';
import { appColor } from '../../../../../../../config/consts/theme';
import { setTopicSelected } from '../../../../../../../redux/actions/qas';

const Qas = () => {
    const route = useRoute(); // route.name
    const routeName = route.name.toLowerCase();
    const qas = useSelector((state: RootState) => state.qas)
    const dispatch = useDispatch();
    const { goBack } = useNavigation();

    function handleGoBack() {
        goBack();
    }

    const changeTopicHandler = (id: number, selected: boolean) => {
        dispatch(setTopicSelected({id, selected}))
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
                    <Text style={{ fontSize: 18,fontWeight: 'bold', fontStyle: 'italic'}}>FAQs</Text>
                </Body>
                <Right style={{ flex: 0.2, paddingRight: 10 }} />
            </Header>
            <View>
                <ScrollContent horizontal showsHorizontalScrollIndicator={false}>
                {qas.topic.map((items, index) => (
                    <TouchableOpacity key={index} onPress={() => changeTopicHandler(index, items.selected)}>
                        <View style={{ backgroundColor: items.selected ? '#cdcfcf' : '#FFFFFF', marginEnd: 10, paddingTop: 10, paddingBottom: 10, paddingStart: 20, paddingEnd: 20,justifyContent: 'center', borderRadius: 20, borderWidth: 1,borderColor: '#b5b8b8' }}>
                            <Text style={{ textAlign: 'center', textTransform: 'capitalize', fontSize: 12 }}>{items.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
                </ScrollContent>
            </View>
            <ScrollContent showsHorizontalScrollIndicator={false} style={{flex: 1, paddingTop: 0}}>
                {qas.items.map((qas, index) => (
                    <View key={index} style={{ flexDirection: 'column', marginBottom: 20, backgroundColor: appColor.hardLightGray, padding: 20, borderRadius: 15 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <View>
                                <View style={{backgroundColor: appColor.lightGray, padding: 5, borderRadius: 5}}>
                                    <Text style={{ fontFamily: 'OpenSans_semibold' }}>
                                        Q.
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginLeft: 5, marginRight: 20 }}>
                                <Text style={{ fontWeight: 'bold'}}>
                                    {qas.question}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <View style={{backgroundColor: appColor.lightGray, padding: 5, borderRadius: 5}}>
                                    <Text style={{ fontFamily: 'OpenSans_semibold' }}>
                                        A.
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginLeft: 5, marginRight: 20 }}>
                                <Text style={{ fontWeight: '200' }}>
                                    {qas.answer}
                                </Text>
                            </View>
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


export default Qas