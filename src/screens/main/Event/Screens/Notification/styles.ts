import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const HeaderNotifNameText = styled.Text`
    font-style: normal;
    margin-top: 15px;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: bold;
    color: #000000;
`;

export const TimeText = styled.Text`
    color: #9B9B9B;
    font-size: 12px;
`;