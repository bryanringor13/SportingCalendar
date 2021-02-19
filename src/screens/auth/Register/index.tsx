import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Container, SpanTitle, Title, BackImg, HeaderLogin, ButtonSkip, TextButtonSkip, TextButtonLogin, ButtonLogin, EmailPassword, EmailField, FieldText, PasswordField, FieldLabel, ForgotPassLabel, Footer, ButtonRegister, TextButtonRegister, SocialButton, Divider, Liner, TextOr, ButtonFb, ButtonGoogle, ButtonApple, FirstHeader, SecondHeader, HeaderFirstText, HeaderSecondText, HeaderThirdText, HeaderForthText, InputTextField } from './register.styles';
import blankProfile from '../../assets/images/circle_200.png';
// import blankProfile from '../../assets/images/circle.png';
import headerBackground from '../../../assets/images/login_header_bg_2.png';
// const image = { uri: headerBackground };

import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { Input, Item, Label } from 'native-base';
import { ROUTES, SCREEN } from '../../../config/consts/routes';
import { useDispatch, useSelector } from 'react-redux';
import { BackgroundHeader, Circle, ErrorContent, ErrorMessage, HeaderContent, ScreenBackground, screenHeight, screenWidth } from '../../../components/Styles';
import { RootState } from '../../../redux/reducers';
import { clearErrorUser } from '../../../redux/actions/error';
import { registerUser, registerUserFailure } from '../../../redux/actions/user';
import { TextInputMask } from 'react-native-masked-text';
import { header } from '../../../config/consts/theme';

const Register: React.FC = () => {
  const route = useRoute(); // route.name
  const routeName = route.name.toLowerCase();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user)
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDOB] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { goBack, navigate } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  const handleRegisterAction = () => {
    dispatch(clearErrorUser());
    if(name.length > 0 && email.length > 0 && dob.length > 0 && password.length > 0 && confirmPassword.length > 0) {
      dispatch(registerUser({ 
        name,
        email,
        username,
        dob,
        password,
        password_confirmation: confirmPassword,
        is_admin: 0
      }));
    } else {
      dispatch(registerUserFailure(["Please put all your details below, thank you."]))
    }
  };

  const handleNavigationToLoginPage = () => {
    dispatch(clearErrorUser());
    navigate(ROUTES.AUTH_LOGIN);
  }

  return (
    <Container>
      <HeaderContent style={{ height: (screenHeight*0.35) }}>
      <ScreenBackground theme={{ backgroundcolor: SCREEN[routeName].backgroundColor }} style={{
          borderRightWidth: header.backgroundRightWidth,
          borderTopWidth: header.backgroundTopWidth,
        }}/>
        {/* <BackgroundHeader> */}
          <HeaderLogin>
            <FirstHeader>
              <HeaderFirstText>Have an account?</HeaderFirstText>
              <ButtonLogin onPress={() => handleNavigationToLoginPage()}>
                <TextButtonLogin>
                  Login
                </TextButtonLogin>
              </ButtonLogin>
            </FirstHeader>
            <SecondHeader>
              <HeaderSecondText>Welcome</HeaderSecondText>
            </SecondHeader>
          </HeaderLogin>
          <Circle style={{ top: -(header.backgroundRightWidth*0.025), left: 60, backgroundColor: '#6DFBFF' }} />
          <Circle style={{ top: (header.backgroundTopWidth*0.58), right: 40, backgroundColor: '#FE736C' }} />
        {/* </BackgroundHeader> */}
      </HeaderContent>
        <ErrorContent style={{ marginTop: (header.backgroundRightWidth*0.02) }}>
          {!!user.error && !user.token ?
              <ErrorMessage>
                {user.error.map((error: any, index: any) => (
                  index > 0 ? `, ${error}` : `${error}`
                ))}
              </ErrorMessage>
            : null}
        </ErrorContent>
        {/* <Component /> */}
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1, marginBottom: '30%' }}>
          <EmailPassword>
            <InputTextField>
              <FieldLabel>
                Name
              </FieldLabel>
              <Item fixedLabel>
                <Input value={name} onChangeText={(text) => setName(text)} placeholder="Joe Blogs" />
              </Item>
            </InputTextField>
            <InputTextField>
              <FieldLabel>
                Username
              </FieldLabel>
              <Item fixedLabel>
                <Input value={username} onChangeText={(text) => setUsername(text)} placeholder="joeblogs" />
              </Item>
            </InputTextField>
            <InputTextField>
              <FieldLabel>
                Email Address
              </FieldLabel>
              <Item fixedLabel>
                <Input value={email} onChangeText={(text) => setEmail(text)} placeholder="email@domain.com" />
              </Item>
            </InputTextField>
            <InputTextField>
              <FieldLabel>
                Date of Birth
              </FieldLabel>
              <Item fixedLabel>
                {/* <Input onChangeText={(text) => setDOB(text)} placeholder="DD/MM/YY" />
                */}
                <TextInputMask
                  type='datetime'
                  options={{
                    format: 'DD/MM/YY'
                  }}
                  value={dob}
                  placeholder="DD/MM/YY" 
                  onChangeText={(text: any) => setDOB(text)}
                  customTextInput={Input}
                />
              </Item>
            </InputTextField>
            <InputTextField>
              <FieldLabel>
                Password
              </FieldLabel>
              <Item fixedLabel>
                <Input value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholder="Enter Password" />
              </Item>
            </InputTextField>
            <InputTextField>
              <FieldLabel>
                Confirm Password
              </FieldLabel>
              <Item fixedLabel>
                <Input value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} secureTextEntry={true} placeholder="Confirm Password" />
              </Item>
            </InputTextField>
        </EmailPassword>
      </KeyboardAvoidingView>
      <Footer>
        <ButtonRegister onPress={() => handleRegisterAction()}>
          <TextButtonRegister>
            Register
          </TextButtonRegister>
        </ButtonRegister>
        {/* <Divider>
          <Liner></Liner>
          <TextOr>or login with</TextOr>
          <Liner></Liner>
        </Divider> */}
      </Footer>
    </Container>
  );
};

export default Register;
