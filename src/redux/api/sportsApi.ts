import axios from 'axios';
import qs from 'qs';
import { API } from '../../config/consts/api';

export const sportsApi = ( token: string ) => {
    return axios({
        method: 'get',
        url: `${API.URL}${API.SPORTS}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    // return {
    //     data: {
    //       sports: [
    //         {
    //             id: '1',
    //             name: 'football',
    //             icon: 'https://simpleicon.com/wp-content/uploads/football.png'
    //         },
    //         {
    //             id: '2',
    //             name: 'darts',
    //             icon: 'https://cdn.onlinewebfonts.com/svg/img_548746.png'
    //         },
    //         {
    //             id: '3',
    //             name: 'golf',
    //             icon: 'https://img.icons8.com/ios/452/golf-ball.png'
    //         },
    //         {
    //             id: '4',
    //             name: 'cricket',
    //             icon: 'https://cdn.onlinewebfonts.com/svg/img_531986.png'
    //         },
    //         {
    //             id: '5',
    //             name: 'rugby union',
    //             icon: 'https://www.pngkit.com/png/full/447-4477351_banner-free-ball-union-free-on-rugby-ball.png'
    //         },
    //         {
    //             id: '6',
    //             name: 'f1',
    //             icon: 'https://www.pngrepo.com/png/147337/180/f1-helmet.png'
    //         },
    //         {
    //             id: '7',
    //             name: 'horse racing',
    //             icon: 'https://www.freeiconspng.com/uploads/horse-black-head-icon-16.png'
    //         },
    //         {
    //             id: '8',
    //             name: 'tennis',
    //             icon: 'https://www.freeiconspng.com/uploads/tennis-icon-22.png'
    //         },
    //       ]
    //     }
    // }
};

export const sportsLeagueApi = ( token: string ) => {
    return axios({
        method: 'get',
        url: `${API.URL}${API.SPORTS_LEAGUE}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const sportsTeamApi = ( token: string ) => {
    return axios({
        method: 'get',
        url: `${API.URL}${API.SPORTS_TEAM}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const sportsFollowedSave = ( token: string, userId: string, data: { 
    event_id: any[],
    sport_id: any[],
    tournament_id: any[],
    team_id: any[]
}) => {
    return axios({
        method: 'post',
        url: `${API.USER_FOLLOWED}/${userId}`,
        data: qs.stringify(data),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'Authorization': `Bearer ${token}`
        }
    })
}
