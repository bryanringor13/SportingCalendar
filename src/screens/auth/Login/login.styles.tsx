import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 5.89%;
    top: 5.44%;

    width: 40px;
    height: 40px;

    align-items: center;
    justify-content: center;
`;

export const BackImg = styled.Image``;

export const Container = styled.View`
    flex: 1;
    background: #FFFFFF;
`;

export const HeaderLogin = styled.View`
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
`;

export const FirstHeader = styled.View`
    align-items: flex-end;
    margin-top: 50px;
    width: 100%;
`;

export const SecondHeader = styled.View`
    margin-top: 20px;
    width: 100%;
`;

export const SpanTitle = styled.Text`
    font-family: Roboto_300Light_Italic;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 23px;

    margin-bottom: 5px;

    color: #22215B;
`;

export const HeaderFirstText = styled.Text`
    font-style: normal;
    font-family: OpenSans_regular;
    font-size: 12px;
    color: #fff;
`;

export const HeaderSecondText = styled.Text`
    font-style: normal;
    font-size: 48px;
    font-style: italic;
    font-family: TradeGothic_italic_bold;
    text-transform: uppercase;
    font-weight: bold;
    color: #fff;
`;

export const HeaderThirdText = styled.Text`
    font-style: normal;
    font-size: 48px;
    font-style: italic;
    font-family: TradeGothic_italic_bold;
    text-transform: uppercase;
    font-weight: bold;
    color: #fff;
`;

export const HeaderForthText = styled.Text`
    font-style: normal;
    font-size: 14px;
    font-weight: bold;
    font-family: TradeGothic_bold;
    color: #fff;
`;

export const Title = styled.Text`
    font-family: Roboto_700Bold;
    font-style: normal;
    font-size: 48px;
    text-transform: uppercase;
    letter-spacing: 5px;
    line-height: 45px;
    color: #fff;
`;

export const ButtonSkip = styled.TouchableOpacity`
    margin: 5px 0;
    padding: 15px;

    background: #000000;
    border-radius: 10px; 
`;

export const ButtonRegister = styled.TouchableOpacity`
    margin: 5px 0;
    padding: 3px 10px 3px 10px;
    border-color: #000000;
    background-color: #000000;
    border-width: 1px;
    border-style: solid;
    border-radius: 20px; 
`;

export const TextButtonRegister = styled.Text`
    font-family: TradeGothic_bold;
    font-size: 12px;
    color: #fff;
    flex: none;
    align-self: center;
    text-transform: uppercase;
`;

export const TextButtonSkip = styled.Text`
    font-family: TradeGothic_bold;
    font-size: 16px;
    color: #FFF;
    flex: none;
    align-self: center;
    text-transform: uppercase;
`;

export const FieldText = styled.Text`
    font-family: TradeGothic_bold;
    font-size: 16px;
    color: #000000;
    flex: none;
    align-self: center;
    text-transform: uppercase;
`;

export const FieldLabel = styled.Text`
    font-family: TradeGothic_bold;
    font-size: 17px;
    text-transform: uppercase;
    color: #000000;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const ForgotPassLabel = styled.Text`
    font-family: Roboto_400Regular;
    font-size: 16px;
    color: #000000;
    text-align: right;
    margin-top: 10px;
`;

export const EmailPassword = styled.ScrollView`
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
`;

export const EmailField = styled.TextInput`
    width: 100%;
    height: 60px;
    border-width: 1px;
    border-color: #dcdbdc;
    padding: 20px;
`;

export const PasswordField = styled.TextInput`
    width: 100%;
    height: 60px;
    border-width: 1px;
    border-color: #dcdbdc;
    padding: 20px;
`;

export const Footer = styled.View`
    width: 100%;
    bottom: 15px;
    position: absolute;
    padding-left: 20px;
    padding-right: 20px;
`;

export const ButtonLogin = styled.TouchableOpacity`
    margin: 5px 0;
    padding: 15px;
    height: 50px;
    background: #000000;
    border-radius: 25px; 
    justify-content: center;
    align-items: center;
`;

export const TextButtonLogin = styled.Text`
    font-family: Roboto_700Bold;
    font-size: 16px;
    color: #FFF;
    flex: none;
    align-self: center;
    letter-spacing: 5px;
    text-transform: uppercase;
`;

export const SocialButton = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
`;

export const ButtonFb = styled.TouchableOpacity`
    margin: 5px 0;
    padding: 15px;
    border-color: #000000;
    border-width: 1px;
    border-style: solid;
    border-radius: 10px; 
    height: 70px;
    justify-content: center;
    margin-right: 8px;
`;

export const ButtonGoogle = styled.TouchableOpacity`
    margin: 5px 0;
    padding: 15px;
    border-color: #000000;
    border-width: 1px;
    border-style: solid;
    border-radius: 10px; 
    height: 70px;
    justify-content: center;
    margin-right: 8px;
`;

export const ButtonApple = styled.TouchableOpacity`
    margin: 5px 0;
    padding: 15px;
    border-color: #000000;
    border-width: 1px;
    border-style: solid;
    border-radius: 10px; 
    height: 70px;
    justify-content: center;
    margin-right: 8px;
`;

export const TextButtonFb = styled.Text`
    font-family: Roboto_700Bold;
    font-size: 16px;
    color: #000000;
    flex: none;
    align-self: center;
    letter-spacing: 5px;
    text-transform: uppercase;
`;

export const TextButtonGoogle = styled.Text`
    font-family: Roboto_700Bold;
    font-size: 16px;
    color: #000000;
    flex: none;
    align-self: center;
    letter-spacing: 5px;
    text-transform: uppercase;
`;

export const TextButtonApple = styled.Text`
    font-family: Roboto_700Bold;
    font-size: 16px;
    color: #000000;
    flex: none;
    align-self: center;
    letter-spacing: 5px;
    text-transform: uppercase;
`;


