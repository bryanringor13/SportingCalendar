import styled from 'styled-components/native';



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

export const Logo = styled.Image`
    position: absolute;
    width: 70%;
`;

export const BlankPhoto = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    top: 20%;
`;

export const Container = styled.View`
    width: 100%;
    top: 20%;
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

export const Title = styled.Text`
    font-family: Roboto_700Bold;
    font-style: normal;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 5px;
    line-height: 45px;
    text-align: center;

    color: #FFFFFF;

    margin-bottom: 10px;
`;

export const Description = styled.Text`
    font-family: Roboto_500Medium;
    font-style: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: center;

    color: #FFFFFF;
`;
