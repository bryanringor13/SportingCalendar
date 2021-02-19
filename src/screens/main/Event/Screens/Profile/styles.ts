import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const screenWidth = viewportWidth;

export const HeaderProfileTop = styled.View`
    width: 100%;
    margin-top: 10%;
    align-items: flex-end;
    padding-left: 20px;
    padding-right: 20px;
`;

export const HeaderProfile = styled.View`
    flex-direction: row;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
`;

export const HeaderProfileTitle = styled.View`
    width: 80%;
`;

export const HeaderGreetText = styled.Text`
    font-style: normal;
    font-size: 30px;
    font-style: italic;
    text-transform: uppercase;
    font-weight: bold;
    color: #000000;
`;

export const HeaderNameText = styled.Text`
    font-style: normal;
    font-size: 30px;
    font-style: italic;
    text-transform: uppercase;
    font-weight: bold;
    color: #000000;
`;

export const CircleHighlightButton = styled.TouchableOpacity`
    background-color: #000;
    padding: 5px 10px 5px 10px;
    border-width: 1px;
    border-radius: 20px;
    border-color: #000;
`;

export const CategoryContent = styled.View`
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-bottom: 30px;
    margin-top: 38px;
`;

export const ProfileCategoryItem = styled.View`
    width: 100px;
`;