import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, KeyboardAvoidingView, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { Body, Button, Content, Header, Icon, Input, Item, Label, Left, List, ListItem, Right } from 'native-base';

import { ButtonDarkRound, ContainerFixed, Footer, ButtonTextWhite, ButtonWhiteRectangle, ButtonDarkRectangle, ButtonTextDark } from '../../../../../../components/Styles';
import { ROUTES } from '../../../../../../config/consts/routes';
import { userLogout } from '../../../../../../redux/actions/user';
import { RootState } from '../../../../../../redux/reducers';

const Settings: React.FC = () => {
    const route = useRoute(); // route.name
    const routeName = route.name.toLowerCase();
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const { goBack, navigate } = useNavigation();

    const contentHandler = (route: string, name: string, content: string) => {
        navigate(route, {
            name: name,
            content: content
        })
    }

    const settingItems = [
        { guestAccess: false, name: 'Account', route: ROUTES.SETTINGS_ACCOUNT, content: '', handler: contentHandler}, 
        { guestAccess: false, name: 'Notifications', route: ROUTES.SETTINGS_NOTIFICATIONS, content: '', handler: contentHandler}, 
        { guestAccess: true, name: 'Terms and Conditions', route: ROUTES.SETTINGS_CONTENT_DISPLAY, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', handler: contentHandler}, 
        { guestAccess: true, name: 'Privacy Policy', route: ROUTES.SETTINGS_CONTENT_DISPLAY, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', handler: contentHandler}, 
        { guestAccess: true, name: 'FAQs', route: ROUTES.SETTINGS_FAQS, content: '', handler: contentHandler}];

    function handleGoBack() {
        goBack();
    }

    const logoutHandler = () => {
        dispatch(userLogout())
    }

    function handleNavigationToRegisterPage() {
        navigate(ROUTES.REGISTER);
    }
  
    function handleNavigationToLoginPage() {
      navigate(ROUTES.AUTH_LOGIN);
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
                    <Text style={{ fontSize: 18,fontWeight: 'bold', fontStyle: 'italic', textTransform: 'uppercase' }}>Settings</Text>
                </Body>
                <Right style={{ flex: 0.2, paddingRight: 10 }} />
            </Header>
            <Content>
                <List>
                    {settingItems.map((item, index) => (
                        user.token.length === 0 && !item.guestAccess ? null : <ListItem noIndent key={index} onPress={() => item.handler(item.route, item.name, item.content)}>
                        <Left>
                            <Text style={{ fontWeight: '500', fontSize: 16 }}>{item.name}</Text>
                        </Left>
                        <Right>
                            <Entypo name='chevron-thin-right' style={{ color: '#000000' }} size={18} />
                        </Right>
                    </ListItem>
                    ))}
                </List>
            </Content>
            <Footer>
                {
                    user.token.length === 0 ? <><ButtonDarkRectangle onPress={() => handleNavigationToLoginPage()}>
                    <ButtonTextWhite>
                        Login
                    </ButtonTextWhite>
                </ButtonDarkRectangle>
                <ButtonWhiteRectangle onPress={() => handleNavigationToRegisterPage()}>
                    <ButtonTextDark>
                        Register
                    </ButtonTextDark>
                </ButtonWhiteRectangle></> : <ButtonDarkRound onPress={() => logoutHandler()}>
                    <ButtonTextWhite>
                        Logout
                    </ButtonTextWhite>
                </ButtonDarkRound>
                }
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


export default Settings