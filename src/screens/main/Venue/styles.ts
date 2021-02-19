import styled from 'styled-components/native';

export const Category = styled.View`
    flex-direction: row;
    padding: 25px;
    justify-content: space-between;
`;

export const Cicle = styled.View`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-color: #E1DEDB;
`;

export const RenderHeader = styled.View`
    flex-direction: row;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    background-color: #E1DEDB;
`;

export const RenderHeaderTitle = styled.Text`
    font-weight: 600 
`;

export const RenderContent = styled.View`
    flex-direction: row;
    padding: 25px;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export const RenderContentTitle = styled.View`
    background-color: #E1DEDB;
    padding: 10px;
    border-width: 1px;
    border-radius: 20px;
    border-color: #E1DEDB;
    margin-top: 10px;
`;

export const RenderContentTitleCategory = styled.Text`
    font-style: italic;
    border-width: 0px;
`;