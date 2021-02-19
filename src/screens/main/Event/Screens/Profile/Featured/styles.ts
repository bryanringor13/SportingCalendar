import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const screenHeight = viewportHeight;

export const FeaturedContent = styled.ScrollView`
    flex: 1;
    background-color: #FFFFFF;
`;

export const HeaderFeaturedTop = styled.View`
    width: 100%;
    margin-top: 10%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
`;

export const HeaderFeaturedContent = styled.View`
    flex-direction: row;
    width: 100%;
    height: 100px;
    justify-content: center;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
`;

export const HeaderFeaturedTitle = styled.Text`
    font-style: normal;
    font-size: 30px;
    font-style: italic;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    color: #FFFFFF;
`;

export const BodyContent = styled.View`
    flex-direction: column;
    width: 100%;
`;

export const BodyContentHead = styled.View`
    width: 100%;
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 20px;
`;

export const BodyContentHeadTitle = styled.Text`
    text-transform: uppercase;
    font-weight: bold;
    font-size: 20px;
    font-family: TradeGothic_bold;
`;

export const FooterContent = styled.View`
    height: 100px;
`;