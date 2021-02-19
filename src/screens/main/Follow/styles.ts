import styled from 'styled-components/native';

export const Category = styled.View`
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    justify-content: center;
`;

export const RenderHeader = styled.View`
    flex-direction: row;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;
    background-color: #E1DEDB;
`;

export const RenderHeaderTitle = styled.Text`
    font-weight: 600;
`;

export const FooterFollow = styled.View`
    position: absolute;
    bottom: 50px;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

export const ButtonFollow = styled.TouchableOpacity`
    padding: 12px 70px 12px 70px;
    background-color: #000000;
    border-width: 1px;
    border-style: solid;
    border-radius: 20px; 
`;

export const ButtonText = styled.Text`
    color: #FFFFFF;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 14px;
    font-weight: bold;
`;