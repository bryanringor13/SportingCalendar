import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { appColor } from '../../../../../config/consts/theme';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const windowWidth = viewportWidth;

export const CurrentDay = styled.View`
    background-color: ${appColor.blueHighlight};
    justify-content: center;
    border-radius: 20px;
    width: 40px;
    height: 40px;
`;

export const ActiveDay = styled.View`
    background-color: ${appColor.lightGray};
    justify-content: center;
    border-radius: 20px;
    width: 40px;
    height: 40px;
`;