import { Reducer } from 'redux';
import { ErrorTypes } from '../metaTypes/error';
import { SportsState, SportsTypes } from '../metaTypes/sports';
import { UserAction } from '../metaTypes/user';

const initialState: SportsState = {
    data: [],
    leagues: [{ id: '1', sport_id: '0', name: "all", clicked: false, gender: 'none' }],
    teams: [{ id: '1', sport_id: '0', title: "all", clicked: false, icon: null }],
    followed: [],
    loading: false,
    error: null,
};

const sportsReducer: Reducer<SportsState, UserAction> = (state = initialState, action: UserAction) => {
  switch (action.type) {
        case SportsTypes.GET_SUCCESS_SPORTS:
            let sports: any[] = [], dataCust = {};
            action.payload.sports.map((data: any) => {
                dataCust = {
                    ...data,
                    clicked: false,
                    currentSelected: false,
                }

                sports = [...sports, dataCust];
            })
            return {
                ...state, 
                data: sports,
                loading: false,
                error: null,
            };
        case SportsTypes.GET_SUCCESS_LEAGUE:
            let tournament: any[] = state.leagues, dataLeague = {};
            action.payload.tournaments.map((data: any) => {
                dataLeague = {
                    ...data,
                    clicked: false
                }

                tournament = [...tournament, dataLeague];
            })
            return {
                ...state, 
                leagues: tournament,
                loading: false,
                error: null,
            };
        case SportsTypes.GET_SUCCESS_TEAM:
            let team: any[] = state.teams, dataTeam = {};
            action.payload.teams.map((data: any) => {
                dataTeam = {
                    ...data,
                    clicked: false
                }

                team = [...team, dataTeam];
            })
            return {
                ...state, 
                teams: team,
                loading: false,
                error: null,
            };
        case SportsTypes.SPORTS_CLICKED:
            let sportsClicked: any[] = [], dataClicked = {}, sportsFollowed: any[] = [], dataFollowed: any[] = []
            state.followed.map((data: any) => {
                dataFollowed = [...dataFollowed, {
                    ...data,
                    onTop: false
                }]
            })
            state.data.map((data: any) => {
                    if(data.id.toLowerCase() === action.payload.toLowerCase()) {
                        const currentClickStatus = !data.clicked
                        if(currentClickStatus) {
                            sportsFollowed = [...dataFollowed, {
                                sports: data.id,
                                details: {
                                    ...data,
                                    clicked: true
                                },
                                gender: [],
                                league: [],
                                team: [],
                                onTop: true
                            }]
                        } else {
                            sportsFollowed = state.followed.filter(obj => obj.sports.toLowerCase() != data.id.toLowerCase())
                        }

                        dataClicked = {
                            ...data,
                            clicked: currentClickStatus,
                        }
                    }else{
                        dataClicked = data
                    }

                    sportsClicked = [...sportsClicked, dataClicked];
                })
            return {
                ...state, 
                data: sportsClicked,
                followed: sportsFollowed,
                loading: false,
                error: null,
            };
        case SportsTypes.SET_GENDER:
            let newFollowed = [...state.followed], sportsLeague: any[] = [], sportsTeam: any[] = [], genderSport: any[] = [], leagueFollowed: any[] = [], teamFollowed: any[] = [], leagueFollowedUpdateSportId: any[] = [];
            
            const index = newFollowed.findIndex(followed => followed.sports.toLowerCase() === action.payload.id.toLowerCase());
            const result = newFollowed[index].gender.includes(action.payload.gender)
            if(result) {
                genderSport = newFollowed[index].gender.filter((gender: string) => gender.toLowerCase() != action.payload.gender.toLowerCase())
            } else {
                genderSport = [...newFollowed[index].gender, action.payload.gender];
            }
            
            sportsLeague = state.leagues.filter((league: any) => genderSport.some(gender => gender.toLowerCase() === league.gender.toLowerCase()))
            sportsTeam = state.teams.filter((team: any) => team.sport_id.toLowerCase() === action.payload.id.toLowerCase())
            if(genderSport.length > 0 ) {
                leagueFollowed = [{ id: '1', sport_id: action.payload.id, name: "All", clicked: false, gender: 'none' }, ...sportsLeague]
                teamFollowed = [{ id: '1', sport_id: action.payload.id, title: "All", clicked: false, icon: null }, ...sportsTeam]
            }
            leagueFollowedUpdateSportId = leagueFollowed.map( (data: any, index: any) => { return {...data, sport_id: action.payload.id} } )
            newFollowed[index].gender = [...genderSport]
            newFollowed[index].league = [...leagueFollowedUpdateSportId]
            newFollowed[index].team = [...teamFollowed]

            return {
                ...state,
                followed: newFollowed,
                loading: false,
                error: null,
            }
        case SportsTypes.SET_LEAGUE:
            let newleague: any[] = [...state.followed],leagueClicked: any[] = [], followedSportsLeague = {}, setLeagueSportClicked: any[] = [];

            const indexSport = newleague.findIndex(followed => followed.sports.toLowerCase() === action.payload.sports.toLowerCase());
            if(action.payload.indexId === 0) {
                let clickedAll: boolean = newleague[indexSport].league[action.payload.indexId].clicked;
                newleague[indexSport].league.map((league: any) => {
                    league.clicked = !clickedAll
                    return league
                })
            } else {
                let currentClicked: boolean = newleague[indexSport].league[action.payload.indexId].clicked;
                newleague[indexSport].league[action.payload.indexId].clicked = !currentClicked;
            }

            return {
                ...state,
                followed: newleague,
                loading: false,
                error: null,
            }
        case SportsTypes.SET_TEAM:
            let newTeam: any[] = [...state.followed], followedSportsTeam = {};

            const indexSportTeam = newTeam.findIndex(followed => followed.sports.toLowerCase() === action.payload.sports.toLowerCase());
            if(action.payload.indexId === 0) {
                let clickedAll: boolean = newTeam[indexSportTeam].team[action.payload.indexId].clicked;
                newTeam[indexSportTeam].team.map((team: any) => {
                    team.clicked = !clickedAll
                    return team
                })
            } else {
                let currentClicked: boolean = newTeam[indexSportTeam].team[action.payload.indexId].clicked;
                newTeam[indexSportTeam].team[action.payload.indexId].clicked = !currentClicked;
            }
            
            return {
                ...state,
                followed: newTeam,
                loading: false,
                error: null,
            }
        case SportsTypes.GET_SPORTS_LEAGUE:
            let sportGenderClicked: any[] = [], followedGenderSports = {};
            
            state.followed.map((data: any) => {
                let leagueSport: any[] = []
                if(data.sports.toLowerCase() === action.payload.id.toLowerCase()) {
                    action.payload.data.filter((tournament: any) => tournament.sport_id.toLowerCase() == action.payload.id.toLowerCase()).map((tournamentData: any) => {
                        console.log('Data Gender: ', data.gender, 'tournamentData: ', tournamentData)
                        let tournamentDetails: any[] = []
                        data.gender.map((gender: string) => {
                            if(tournamentData.gender.toLowerCase() === gender.toLowerCase()) {
                                tournamentDetails = [...tournamentDetails,{
                                    ...tournamentData,
                                    clicked: false,
                                    title: "COLLAPSE LEAGUE NAME"
                                }]
                            }
                        })
                        leagueSport = tournamentDetails
                    })

                    followedGenderSports = { 
                        ...data,
                        league: leagueSport,
                    }
                } else {
                    followedGenderSports = data
                }

                sportGenderClicked = [
                    ...sportGenderClicked,
                    followedGenderSports
                ]
            })
            return {
                ...state,
                followed: sportGenderClicked,
                loading: false,
                error: null,
            }
        case SportsTypes.GET_FAILURE_SPORTS:
            return {
                ...state, 
                data: [],
                loading: false,
                error: action.payload,
            };
        case SportsTypes.GET_FAILURE_LEAGUE:
            return {
                ...state, 
                leagues: [{ id: '1', sport_id: '0', name: "all", clicked: false }],
                loading: false,
                error: action.payload,
            };
        case SportsTypes.GET_FAILURE_TEAM:
            return {
                ...state, 
                teams: [{ id: '1', sport_id: '0', name: "all", clicked: false, icon: null }],
                loading: false,
                error: action.payload,
            };
        case SportsTypes.SET_LOADING:
            return {
                ...state, 
                loading: true,
            };
        case ErrorTypes.REQUEST_CLEAR_SPORTS:
            return {
                ...state, 
                error: null,
                loading: false,
            };
        default:
            return state;
  }
};

export default sportsReducer;