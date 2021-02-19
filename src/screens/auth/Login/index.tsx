import React, { useEffect, useState } from 'react';
import { Container, SpanTitle, Title, BackImg, HeaderLogin, ButtonSkip, TextButtonSkip, TextButtonRegister, ButtonRegister, EmailPassword, EmailField, FieldText, PasswordField, FieldLabel, ForgotPassLabel, Footer, ButtonLogin, SocialButton, ButtonFb, ButtonGoogle, ButtonApple, FirstHeader, SecondHeader, HeaderFirstText, HeaderSecondText, HeaderThirdText, HeaderForthText } from './login.styles';

import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

import * as Location from 'expo-location';

import { useDispatch, useSelector } from 'react-redux';
import { View, Text, KeyboardAvoidingView, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { Input, Item, Label } from 'native-base';

import blankProfile from '../../assets/images/circle_200.png';
// import blankProfile from '../../assets/images/circle.png';
import headerBackground from '../../../assets/images/login_header_bg_2.png';
// const image = { uri: headerBackground };

import { ROUTES, SCREEN } from '../../../config/consts/routes';
import { PropsLogin } from './login.props';
import { BackgroundHeader, Circle, Divider, HeaderContent, Liner, LinerInBetween, ScreenBackground, screenWidth, TextOr, VerticalLineInBetween, InputTextField, TextButton, ErrorContent, ErrorMessage, screenHeight } from '../../../components/Styles';
import { RootState } from '../../../redux/reducers';
import { loginGuest, loginUser, registerUser, setLoading, userLocation } from '../../../redux/actions/user';
import { clearErrorUser } from '../../../redux/actions/error';
import { header } from '../../../config/consts/theme';
import * as Svg from 'react-native-svg';

const Login: React.FC<PropsLogin> = ({ span, title, description, back }) => {
  const route = useRoute(); // route.name
  const routeName = route.name.toLowerCase();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const { goBack, navigate } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  const handleLoginAction = () => {
    dispatch(clearErrorUser());
    const credentials = { username, password };
    dispatch(setLoading());
    dispatch(loginUser(credentials));
  };

  const handleNavigationToRegisterPage = () => {
    dispatch(clearErrorUser());
    navigate(ROUTES.REGISTER);
  }

  const handleNavigationToEventPage = () => {
    dispatch(clearErrorUser());
    navigate(ROUTES.MAIN_EVENT);
  }
  const handleNavigationToRecoveryPage = () => {
    dispatch(clearErrorUser());
    navigate(ROUTES.RECCOVERY);
  }

  const makeid = (length: number) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  const appleAuthHandler = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      dispatch(registerUser({ 
        name: !!credential.fullName?.givenName ? credential.fullName?.givenName : 'Apple Account',
        email: !!credential.email ? credential.email : 'apple@email.com',
        username: `guest${makeid(5)}`,
        dob: '01-01-1990',
        password: credential.user,
        password_confirmation: credential.user,
        is_admin: 0
      }));
      // signed in
    } catch (e) {
      if (e.code === 'ERR_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };
  
  const facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '3871630192898505',
      });

      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        console.log(`Facebook Response: ${JSON.stringify((await response.json()))}`)
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  const googleLogin = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '462951922076-d7mjaqvfu9aqd1k56fbt09rm1365b4so.apps.googleusercontent.com',
        iosClientId: '462951922076-j2pks2e2kuce8bnrg2a9ghdk85h3dtkq.apps.googleusercontent.com',
        androidStandaloneAppClientId: '462951922076-7l3n2m2643jldnvpik2a0b28g257idd9.apps.googleusercontent.com',
        iosStandaloneAppClientId: '462951922076-6pmch7c07emnppdee6grtbki7bkcnmbl.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        console.log(`Successs Login using Google: ${result}`)
      } else {
        console.log(`Login Canceled`)
      }
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }

  const getRegionForCoordinates = (points: any) => {
    // points should be an array of { latitude: X, longitude: Y }
    console.log('Points: ', points)
    let minX: any, maxX: any, minY: any, maxY: any;
  
    // init first point
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);
  
    // calculate rect
    points.map((point: any) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });
  
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX);
    const deltaY = (maxY - minY);
  
    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY
    };
  }
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied')
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if(!!location) {
        const currentLocation = getRegionForCoordinates([{ latitude: location.coords.latitude, longitude: location.coords.longitude }]);
        console.log('Permission to access location was granted: ',location, " Converted: ", currentLocation)
        dispatch(userLocation({ location: currentLocation }));
      }
    })();
  }, []);

  return (
    <Container>
      <HeaderContent style={{ height: (screenHeight*0.35)}}>
        <ScreenBackground theme={{ backgroundcolor: SCREEN[routeName].backgroundColor }} style={{
          borderRightWidth: header.backgroundRightWidth,
          borderTopWidth: header.backgroundTopWidth,
        }}/>
        {/* <BackgroundHeader> */}
          <HeaderLogin>
            <FirstHeader>
              <HeaderFirstText>Don't have an account yet?</HeaderFirstText>
              <ButtonRegister onPress={() => handleNavigationToRegisterPage()}>
                <TextButtonRegister>
                  Register
                </TextButtonRegister>
              </ButtonRegister>
            </FirstHeader>
            <SecondHeader>
              <HeaderSecondText>Welcome</HeaderSecondText>
              <Text style={[styles.headTextStyle]}>Back</Text>
            </SecondHeader>
            <SecondHeader>
              <TouchableOpacity onPress={() => handleNavigationToEventPage()}>
                <HeaderForthText>Skip for now <Entypo name='chevron-thin-right' size={14} /></HeaderForthText>
              </TouchableOpacity>
            </SecondHeader>
          </HeaderLogin>
          <Circle style={{ top: -(header.backgroundRightWidth*0.025), left: 60, backgroundColor: '#6DFBFF' }} />
          <Circle style={{ top: (header.backgroundTopWidth*0.58), right: 40, backgroundColor: '#CFF973' }} />
        {/* </BackgroundHeader> */}
      </HeaderContent>
      
      {/* Error Message */}
        <ErrorContent style={{ marginTop: (header.backgroundRightWidth*0.04) }}>
          {!user.loading ? !!user.error && !user.token ?
                <ErrorMessage>
                  {user.error.map((error: any, index: any) => (
                    index > 0 ? `, ${error}` : `${error}`
                  ))}
                </ErrorMessage>
              : null : <Text>Loading</Text>}
        </ErrorContent>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <EmailPassword>
            <InputTextField>
              <FieldLabel>
                Username
              </FieldLabel>
              {/* <EmailField placeholder="Enter Email">
              </EmailField> */}
              <Item fixedLabel>
                <Input onChangeText={(text) => setUsername(text)} placeholder="Enter Username" />
              </Item>
            </InputTextField>
            <InputTextField>
              <FieldLabel>
                Password
              </FieldLabel>
              {/* <PasswordField placeholder="Enter Password">
              </PasswordField> */}
              <Item fixedLabel>
                <Input onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholder="Enter Password" />
              </Item>
              <TouchableOpacity onPress={() => handleNavigationToRecoveryPage()}>
                <ForgotPassLabel>
                  Forgot Password?
                </ForgotPassLabel>
              </TouchableOpacity>
            </InputTextField>
          </EmailPassword>
        </KeyboardAvoidingView>
      <Footer>
        <ButtonLogin onPress={() => handleLoginAction()}>
          <TextButton>
            Login
          </TextButton>
        </ButtonLogin>
        <Divider>
          <LinerInBetween></LinerInBetween>
          <TextOr>or login with</TextOr>
          <LinerInBetween></LinerInBetween>
        </Divider>
        <View style={{justifyContent: 'center', flexDirection: 'row', padding: 10, alignItems: 'center'}}>
          {Platform.OS === 'ios' && (<>
              <TouchableOpacity onPress={() => appleAuthHandler()}>
                <Text style={{textTransform: 'uppercase', fontWeight: 'bold', fontSize: 17}}>apple</Text>
                {/* <AppleAuthentication.AppleAuthenticationButton
                  buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                  buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                  cornerRadius={5}
                  style={{ width: 200, height: 44 }}
                  onPress={() => appleAuthHandler()}
                /> */}
              </TouchableOpacity>
              <VerticalLineInBetween />
            </>
          )}
          <TouchableOpacity onPress={() => facebookLogIn()}>
            <Text style={{textTransform: 'uppercase', fontWeight: 'bold', fontSize: 17}}>facebook</Text>
          </TouchableOpacity>
          <VerticalLineInBetween />
          <TouchableOpacity onPress={() => googleLogin()}>
            <Text style={{textTransform: 'uppercase', fontWeight: 'bold', fontSize: 17}}>google</Text>
          </TouchableOpacity>
        </View>
      </Footer>
    </Container>
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


export default Login