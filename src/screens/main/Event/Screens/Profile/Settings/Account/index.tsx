import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, KeyboardAvoidingView, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { Body, Button, Container, Header, Icon, Input, Item, Label, Left, List, ListItem, Right } from 'native-base';
import { ButtonDarkRectangle, ButtonText, ContainerFixed, ScrollContent, InputTextField, TextButton, ButtonTextDark } from '../../../../../../../components/Styles';
import { RootState } from '../../../../../../../redux/reducers';
import { updateUser } from '../../../../../../../redux/actions/user';

const Account = () => {
    const route = useRoute(); // route.name
    const { name, content }: any = route.params;
    const routeName = route.name.toLowerCase();
    const user = useSelector((state: RootState) => state.user);
    const [userName, setUserName] = useState(user.data.name);
    const [userUsername, setUserUsername] = useState(user.data.username);
    const [userEmail, setUserEmail] = useState(user.data.email);
    const [userDob, setUserDob] = useState(user.data.dob);
    const dispatch = useDispatch();
    const { goBack } = useNavigation();

    function handleGoBack() {
        goBack();
    }
    
    const handleUpdateAction = () => {
      dispatch(updateUser({
        name: userName,
        username: userUsername,
        email: userEmail,
        dob: userDob,
        token: user.token
      }))
    }

    const userNameHandler = (value: string) => {
      setUserName(value)
    }

    const userUserNameHandler = (value: string) => {
      setUserUsername(value)
    }

    const userEmailHandler = (value: any) => {
      setUserEmail(value)
    }

    const userDobHandler = (value: any) => {
      // console.log(value)
      setUserDob(value)
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
            <InputTextField>
              <Label style={{ fontSize: 14, fontFamily: 'OpenSans_regular', marginBottom: 5 }}>Name</Label>
              <Item regular>
                <Input placeholder='Name Surname' value={!!userName ? userName : ''} onChangeText={(value) => userNameHandler(value)}/>
              </Item>
            </InputTextField>
            <InputTextField>
              <Label style={{ fontSize: 14, fontFamily: 'OpenSans_regular', marginBottom: 5 }}>Username</Label>
              <Item regular>
                <Input placeholder='Username' value={!!userUsername ? userUsername : ''} onChangeText={(value) => userUserNameHandler(value)}/>
              </Item>
            </InputTextField>
            <InputTextField>
              <Label style={{ fontSize: 14, fontFamily: 'OpenSans_regular', marginBottom: 5 }}>Email</Label>
              <Item regular>
                <Input placeholder='email@gmail.com' value={!!userEmail ? userEmail : ''} onChangeText={(value) => userEmailHandler(value)} />
              </Item>
            </InputTextField>
            <InputTextField>
              <Label style={{ fontSize: 14, fontFamily: 'OpenSans_regular', marginBottom: 5 }}>Date of birth</Label>
              <Item regular>
                <Input placeholder='YYYY-MM-DD' value={!!userDob ? userDob : ''} onChangeText={(value) => userDobHandler(value)}/>
              </Item>
            </InputTextField>
            <InputTextField>
              <Label style={{ fontSize: 14, fontFamily: 'OpenSans_regular', marginBottom: 5 }}>Password</Label>
              <Item regular>
                <Input secureTextEntry={true} placeholder='*********' />
              </Item>
            </InputTextField>
            <InputTextField>
              <Label style={{ fontSize: 14, fontFamily: 'OpenSans_regular', marginBottom: 5 }}>New Password</Label>
              <Item regular>
                <Input secureTextEntry={true} placeholder='*********' />
              </Item>
            </InputTextField>
            <InputTextField>
              <Label style={{ fontSize: 14, fontFamily: 'OpenSans_regular', marginBottom: 5 }}>Confirm Password</Label>
              <Item regular>
                <Input secureTextEntry={true} placeholder='*********' />
              </Item>
            </InputTextField>

            <InputTextField style={{ marginTop: 50 }}>
              <ButtonDarkRectangle onPress={() => handleUpdateAction()}>
                <TextButton>
                  Update
                </TextButton>
              </ButtonDarkRectangle>
            </InputTextField>

            <InputTextField>
              <ButtonText onPress={() => {}}>
                <ButtonTextDark>
                  Delete Account
                </ButtonTextDark>
              </ButtonText>
            </InputTextField>
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


export default Account