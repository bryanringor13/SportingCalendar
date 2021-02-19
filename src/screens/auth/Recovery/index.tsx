import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, KeyboardAvoidingView, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { Body, Button, Header, Icon, Input, Item, Label, Left, Right } from 'native-base';

import { ROUTES, SCREEN } from '../../../config/consts/routes';
import { BackgroundHeader, ButtonDarkRound, Circle, ContainerFixed, Divider, FieldLabel, Footer, HeaderContent, InputField, InputTextField, Liner, LinerInBetween, ScreenBackground, screenHeight, screenWidth, ButtonTextWhite, TextOr, VerticalLineInBetween } from '../../../components/Styles';
import { RootState } from '../../../redux/reducers';
import { loginGuest, loginUser, registerUser } from '../../../redux/actions/user';
import { clearErrorUser } from '../../../redux/actions/error';
import { header } from '../../../config/consts/theme';

import mailImage from '../../../assets/images/recovery/mail.png';

const Recovery: React.FC = () => {
  const route = useRoute(); // route.name
  const routeName = route.name.toLowerCase();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const { goBack, navigate } = useNavigation();

    function handleGoBack() {
        goBack();
    }

    const recoveryPasswordHandler = () => {
        dispatch(clearErrorUser());
        const credentials = { email };
        // dispatch(recoveryPassword(credentials));
    };

    return (
        <ContainerFixed>
            <Header transparent>
                <Left style={{ flex: 0.2, paddingLeft: 10, flexDirection: 'row' }}>
                    <Button transparent onPress={handleGoBack}>
                        <Entypo name='chevron-thin-left' style={{ color: '#000000' }} size={24} />
                    </Button>
                </Left>
                <Body style={{ flex: 0.6, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18,fontWeight: 'bold', fontStyle: 'italic', textTransform: 'uppercase' }}>Forgot Password</Text>
                </Body>
                <Right style={{ flex: 0.2, paddingRight: 10 }} />
            </Header>
            <View style={{flex: 1, alignItems: 'center',flexDirection: 'column', marginBottom: 110, paddingStart: 25, paddingEnd: 25}}>
                <View style={{ marginTop: '20%' }}>
                    <Text style={{ fontSize: 16, fontWeight: '300' }}>
                        Pease enter your registered email
                    </Text>
                </View>
                <View style={{ width: '90%' }}>
                    <KeyboardAvoidingView>
                        <Item>
                            <Input onChangeText={(text) => setEmail(text)} placeholder="email@domain.com" style={{ textAlign: 'center', fontWeight: '500', fontSize: 20 }} />
                        </Item>
                    </KeyboardAvoidingView>
                </View>
                <View style={{ marginTop: '20%' }}>
                    <Text style={{ fontSize: 16, fontWeight: '300', textAlign: 'center' }}>
                        Go to your email and follow the instructions to recover your account
                    </Text>
                </View>
            </View>
            <View style={{flex: 2, marginBottom: 100,width: '100%', padding: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={mailImage} resizeMode='contain' style={{ width: '50%' }}/>
            </View>
            <Footer>
                <ButtonDarkRound onPress={() => recoveryPasswordHandler()}>
                    <ButtonTextWhite>
                        Recover my account
                    </ButtonTextWhite>
                </ButtonDarkRound>
            </Footer>
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
  // outLineText: {
  // }
});


export default Recovery