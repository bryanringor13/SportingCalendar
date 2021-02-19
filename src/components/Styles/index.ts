import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const screenWidth = viewportWidth;
export const screenHeight = viewportHeight;

export const Container = styled.ScrollView`
    flex: 1;
`;

export const ContainerFixed = styled.View`
    flex: 1;
    background: #FFFFFF;
`;

export const BackgroundHeader = styled.ImageBackground`
    flex: 1;
    resize-mode: cover;
`;

export const ScreenBackground = styled.View`
    border-right-width: ${(viewportWidth + 600)}px;
    border-top-width: ${(viewportWidth - 240)}px;
    border-right-color: #FFFFFF;
    border-top-color: ${props => props.theme.backgroundcolor};
    position: absolute;
`;

export const ImageContent = styled.Image``;

export const HeaderContent = styled.View`
    width: 100%;
    margin-bottom: 20px;
`;

export const HeaderIcon = styled.View`
    width: 100%;
    flex-direction: row;
    margin-top: 10%;
    justify-content: flex-end;
    padding-left: 20px;
    padding-right: 20px;
`;

export const HeaderTitle = styled.Text`
    font-style: normal;
    font-size: 35px;
    font-style: italic;
    text-transform: uppercase;
    font-weight: bold;
    color: #000000;
`;

export const HeaderTitlePage = styled.View`
    flex-direction: row;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: -20px;
`;

export const HeaderTitleText = styled.Text`
    font-style: normal;
    font-size: 35px;
    font-style: italic;
    text-transform: uppercase;
    font-weight: bold;
    color: #000000;
    font-family: TradeGothic_italic_bold;
    width: 100%;
`;

export const Circle = styled.View`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-color: #E1DEDB;
    position: absolute;
`;

export const Button = styled.TouchableOpacity`
    padding: 15px;
    background: #567DF4;
    border-radius: 10px; 
    margin-bottom: 10px;
`;

export const ButtonText = styled.TouchableOpacity`
    padding: 15px;
    color: #000000;
    border-radius: 10px; 
    margin-bottom: 10px;
`;

export const ButtonDarkRound = styled.TouchableOpacity`
    margin: 5px 0;
    padding: 15px;
    height: 50px;
    background: #000000;
    border-radius: 25px; 
    justify-content: center;
    align-items: center;
`;

export const ButtonDarkRectangle = styled.TouchableOpacity`
    margin: 5px 0;
    padding: 15px;
    height: 50px;
    background: #000000;
    border-radius: 5px; 
    justify-content: center;
    align-items: center;
`;

export const ButtonWhiteRectangle = styled.TouchableOpacity`
    margin: 5px 0;
    padding: 15px;
    border-color: #000000;
    border-width: 1px;
    border-style: solid;

    background: #FFFFFF;
    border-radius: 5px; 
`;

export const TextButton = styled.Text`
    font-family: Roboto_700Bold;
    font-size: 16px;
    color: #FFF;
    flex: none;
    align-self: center;
    letter-spacing: 5px;
    text-transform: uppercase;
`;


export const Input = styled.TextInput`
    background: #FFFFFF;
    border: 1px solid #EEF2FE;
    border-radius: 10px; 
    font-family: Roboto_400Regular;

    color: #000;

    padding: 10px;
    margin-bottom: 10px;
`;

export const InputTextField = styled.View`
    margin-bottom: 20px;
`;

export const FieldLabel = styled.Text`
    font-family: TradeGothic_bold;
    font-size: 17px;
    text-transform: uppercase;
    color: #000000;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const InputGroup = styled.View`
    padding: 12px 0px;
    left: 7.47%;
    right: 7.47%;
`;

export const VerticalDivider = styled.View`
    border-left-width: 2px;
    border-left-color: #000;
    height: 50%;
`;

export const RenderContent = styled.View`
    flex-direction: row;
    padding-left: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    flex-wrap: wrap;
`;

export const RenderContentScrollHorizontal = styled.ScrollView`
    width: 100%;
`;

export const SelectionBackground = styled.View`
    background-color: #E1DEDB;
    padding: 10px;
    border-width: 1px;
    border-radius: 20px;
    border-color: #E1DEDB;
    margin-right: 10px;
`;

export const SelectionBackgroundText = styled.Text`
    font-style: italic;
    border-width: 0px;
`;

export const SelectionCircle = styled.View`
    align-items: center;
    width: ${(viewportWidth/4)+5}px;
`;

export const SelectionCircleHorizontalScroll = styled.View`
    align-items: center;
`;

export const SelectionFollowCircle = styled.View`
    align-items: center;
    width: ${(viewportWidth/4)-10}px;
`;

export const SelectionCircleWrap = styled.View`
    align-items: center;
    width: ${(viewportWidth/3)-7}px;
    margin-bottom: 20px;
`;

export const SelectionBackgroundCircle = styled.View`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-color: #E1DEDB;
    margin-bottom: 10px;
    flex-direction: row; 
    justify-content: center;
    align-items: center;
`;

export const CircleLabel = styled.Text`
    text-align: center;
    text-transform: capitalize;
`;

export const HightLightHead = styled.View`
    width: 100%;
    height: 30px;
    background-color: #00000029;
    justify-content: center;
`;

export const HightLightHeadText = styled.Text`
    font-weight: bold;
    text-transform: uppercase;
    color: #000000;
    font-size: 14px;
    margin-left: 20px;
    font-family: TradeGothic_bold;
`;

export const ThumbnailContent = styled.View`
    padding-top: 40px;
    width: 100%;
    margin-bottom: 20px;
    background-color: #F0F0F0;
`;

export const ViewDetailsHeader = styled.View`
    width: 100%;
    margin-top: 30px;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 20px;
`;

export const ViewDetailsHeaderTitle = styled.Text`
    text-transform: uppercase;
    font-family: TradeGothic_bold;
    font-size: 22px;
`;

export const Divider = styled.View`
    flex-direction: row;
    margin-top: 5px;
`;

export const TextOr = styled.Text`
    font-family: Roboto_400Regular;
    color: #9B9B9B;
    align-self: center;
    font-size: 14px;
    margin-left: 5px;
    margin-right: 5px;
`;
export const Liner = styled.View`
    background-color: #F5F5F5;
    height: 1px;
    flex: 1;
    align-self: center;
    width: 100%;
    margin-top: 20px;
`;

export const LinerInBetween = styled.View`
    background-color: #F5F5F5;
    height: 1px;
    flex: 1;
    align-self: center;
    width: 100%;
`;

export const BarCardContent = styled.View`
    width: ${viewportWidth-(viewportWidth*0.5)}px;
`;

export const VerticalLineInBetween = styled.View`
    height: 70%;
    margin-left: 20px;
    margin-right: 20px;
    width: 2px;
    background-color: #000000;
`;

export const EventName = styled.Text`
    font-family: TradeGothic_bold;
    font-size: 18px;
    color: #000000; 
    text-transform: uppercase;
`;

export const Content = styled.View`
    padding-start: 20px;
    padding-bottom: 20px;
`;

export const ContentPage = styled.View`
    padding: 20px;
`;

export const AddressContent = styled.Text`
    font-size: 12px;
    font-family: OpenSans_regular;
`;

export const StatusMessage = styled.Text`
    font-family: TradeGothic_bold;
    color: #FFFFFF;
    font-size: 12px;
`;

export const InputField = styled.ScrollView`
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
`;

export const Footer = styled.View`
    width: 100%;
    bottom: 30px;
    position: absolute;
    padding-left: 20px;
    padding-right: 20px;
`;

export const ButtonTextWhite = styled.Text`
    font-family: Roboto_700Bold;
    font-size: 16px;
    color: #FFFFFF;
    flex: none;
    align-self: center;
    letter-spacing: 5px;
    text-transform: uppercase;
`;

export const ButtonTextDark = styled.Text`
    font-family: Roboto_700Bold;
    font-size: 16px;
    color: #000000;
    flex: none;
    align-self: center;
    letter-spacing: 5px;
    text-transform: uppercase;
`;

export const CircleContent = styled.View`
    margin-end: 10px;
`;

export const ScrollContent = styled.ScrollView`
    width: 100%;
    padding: 20px;
`;

export const ErrorContent = styled.View`
    width: 100%;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;

export const ErrorMessage = styled.Text`
    color: red;
    text-align: center;
    font-size: 14px;
    margin-bottom: 10px;
`;

export const CircleHighlightButton = styled.TouchableOpacity`
    background-color: #000;
    height: 40px;
    border-width: 1px;
    border-radius: 20px;
    border-color: #000;
`;