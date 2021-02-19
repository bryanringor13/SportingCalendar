import styled from 'styled-components/native';

export const colors = {
    black: '#1a1917',
    white: '#FFFFFF',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD',
    lightBlue: '#5b7bb5',
};

export const Container = styled.View`
    flex: 1;
    background: #FFF;
`;

export const Title = styled.Text`
    font-family: Roboto_700Bold;
    font-style: normal;
    font-size: 14px;
    line-height: 45px;
    text-transform: uppercase;
    letter-spacing: 4px;
    text-align: center;

    color: #FFFFFF;

    margin-bottom: 10px;
`;

export const IconContent = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    top: 10%;
`;

export const CarouselContent = styled.View`
    width: 100%;
    top: 20%;
`;

export const Buttons = styled.View`
    padding: 0px 0px;
    position: absolute;
    left: 7.47%;
    right: 7.47%;
    bottom: 1.5%;
`;

export const CircleImage = styled.Image`
    position: absolute;
    top: 0;
    width: 100%;
`;

export const ImageBlank = styled.View`
    position: absolute;
    width: 254px;
    height: 194px;
    top: 0;
`;

export const ButtonEnter = styled.TouchableOpacity`
    margin: 5px 0;
    padding: 15px;

    background: #000000;
    border-radius: 10px; 
`;

export const ButtonRegister = styled.TouchableOpacity`
    margin: 5px 0;
    padding: 15px;
    border-color: #000000;
    border-width: 1px;
    border-style: solid;

    background: #FFFFFF;
    border-radius: 10px; 
`;

export const TextButtonRegister = styled.Text`
    font-family: Roboto_400Regular;
    font-size: 16px;
    color: #000000;
    flex: none;
    align-self: center;
    text-transform: uppercase;
`;
