import styled from 'styled-components/native';

// Category
export const Category = styled.ScrollView`
    margin-bottom: 10px;
    padding-start: 10px;
`;

// Cicle
export const Circle = styled.View`
    width: 85px;
    height: 85px;
    border-radius: 50px;
    background-color: #122C5B;
`;

// FooterFilter
export const FooterFilter = styled.View`
    top: 15px;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-bottom: 50px;
`;

// ButtonFilter
export const ButtonFilter = styled.TouchableOpacity`
    padding: 20px 30px 20px 30px;
    background-color: #000000;
    border-width: 1px;
    border-style: solid;
    border-radius: 50px; 
    width: 90%;
`;

// ButtonText
export const ButtonText = styled.Text`
    color: #FFFFFF;
    text-transform: uppercase;
    letter-spacing: 5px;
    text-align: center;
`;

// ResetButtonText
export const ResetButtonText = styled.Text`
    font-weight: bold;
`;

// Content
export const ContentHeader = styled.View`
    background-color: #F0F0F0;
    height: 27px;
    justify-content: center;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;
`;

export const ContentTitle = styled.Text`
    font-size: 12px;
    text-transform: uppercase;
    font-weight: bold;
`;

export const ContentDetails = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-end: 20px;
    padding-top: 20px;
    margin-bottom: 10px;
    padding-start: 20px;
`;

//  Date
export const ContentDateSection = styled.View`
    justify-content: center;
    flex-direction: column;
`;

export const ContentDateLabel = styled.Text`
    font-size: 14px;
    color: #000000;
`;

export const ContentDateText = styled.Text`
    font-size: 17px;
    text-transform: uppercase;
    color: #000000;
    font-weight: bold;
`;

// Distance from me
export const ContentDistanceHeader = styled.View`
    flex-direction: row;
`;

export const ContentDistanceLabel = styled.Text`
    font-size: 14px;
    color: #000000;
    margin-left: 10px;
`;

export const ContentDistanceBody = styled.View`
    width: 100%;
`;

// Location
export const ContentLocationBody = styled.View`
    width: 100%;
`;

export const ContentLocationHeader = styled.View`
    flex-direction: row;
`;

export const ContentLocationLabel = styled.Text`
    font-size: 14px;
    color: #9B9B9B;
`;

export const ContentLocationAddress = styled.View`
    width: 100%;
    flex-direction: row; 
    justify-content: space-between; 
    margin-top: 5px;
`;

export const ContentLocationAddressText = styled.Text`
    width: 75%;
    font-size: 14px;
`;

// Upcoming Ticket
export const ContentUpcomingTicket = styled.View`
    flex-direction: column;
    width: 100%;
    padding-right: 10px;
`;

export const ContentUpcomingTicketDetail = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const ContentUpcomingTicketLabel = styled.Text`
    font-size: 14px;
    color: #000000;
`;

// Leagues & Teams
export const ContentLeague = styled.View`
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
`;

export const ContentLeagTeams = styled.View`
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
    padding-start: 20px;
    padding-end: 20px;
`;

export const ContentLeagTeamsDetails = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

export const ContentLeagTeamLabel = styled.Text`
    font-size: 14px;    
    color: #000000;
    margin-bottom: 10px;
    padding-start: 20px;
`;

export const ContentLeagTeamTitle = styled.View`
    background-color: #122C5B;
    padding: 10px;
    border-width: 1px;
    border-radius: 20px;
    border-color: #E1DEDB;
    margin-bottom: 10px;
`;

export const ContentLeagTeamText = styled.Text`
    color: #fff;
    font-size: 14px;
`;

export const RenderContentLeagTeam = styled.View`
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`;