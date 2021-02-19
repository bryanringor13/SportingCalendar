
import { action } from 'typesafe-actions';
import { SportsTypes } from '../metaTypes/sports';

export const fetchSports = (payload: string) => action(SportsTypes.GET_ALL_SPORTS, payload);
export const fetchSportsSuccess = (payload: null) => action(SportsTypes.GET_SUCCESS_SPORTS, payload);
export const fetchSportsFailure = (payload: null) => action(SportsTypes.GET_FAILURE_SPORTS, payload);

export const fetchLeague = (payload: string) => action(SportsTypes.GET_LEAGUE_SPORTS, payload);
export const fetchLeaguesSuccess = (payload: null) => action(SportsTypes.GET_SUCCESS_LEAGUE, payload);
export const fetchLeaguesFailure = (payload: null) => action(SportsTypes.GET_FAILURE_LEAGUE, payload);

export const fetchTeam = (payload: string) => action(SportsTypes.GET_TEAM_SPORTS, payload);
export const fetchTeamSuccess = (payload: null) => action(SportsTypes.GET_SUCCESS_TEAM, payload);
export const fetchTeamFailure = (payload: null) => action(SportsTypes.GET_FAILURE_TEAM, payload);

export const clickedSports = (payload: any) => action(SportsTypes.SPORTS_CLICKED, payload);
export const clickedGender = (payload: { indexId: any, id: string , gender: string }) => action(SportsTypes.GENDER_CLICKED, payload);
export const clickedLeague = (payload: { parentIndex: any, indexId: any, sports: string, id: string} ) => action(SportsTypes.LEAGUE_CLICKED, payload);
export const clickedTeam = (payload: { parentIndex: any, indexId: any, sports: string, id: string} ) => action(SportsTypes.TEAM_CLICKED, payload);
export const setGenderSport = (payload: { indexId: any, gender: string, id: string }) => action(SportsTypes.SET_GENDER, payload);
export const setLeagueSport = (payload: string) => action(SportsTypes.SET_LEAGUE, payload);
export const setTeamSport = (payload: string) => action(SportsTypes.SET_TEAM, payload);
// export const fetchLeagueSport = (payload: { data: any, id: string, gender: string }) => action(SportsTypes.GET_SPORTS_LEAGUE, payload);
// export const fetchTeamSport = (payload: { data: any, id: string, gender: string }) => action(SportsTypes.GET_SPORTS_TEAM, payload);