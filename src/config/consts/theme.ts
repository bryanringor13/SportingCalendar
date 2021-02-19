
import searchIcon from '../../assets/images/maps/search.png';
import mapMarkerIcon from '../../assets/images/maps/map_marker.png';
import listViewIcon from '../../assets/images/maps/listview.png';
import settingIcon from '../../assets/images/maps/settings.png';
import settingIcon2 from '../../assets/images/settings_3.png';
import settingIcon3 from '../../assets/images/notification/setting_2x.png';

import { screenWidth } from '../../components/Styles';

export const appColor = {
    gray: 'gray',
    hardLightGray: '#F0F0F0',
    blueHighlight: '#122C5B',
    mediumLightGray: '#f4f4f4',
    lightGray: '#B4B4B4',
    dotColor: '#47B9D4'
}

export const icon = {
    settings: settingIcon2,
    search: searchIcon,
    mapMarker: mapMarkerIcon,
    listView: listViewIcon,
    setting2: settingIcon,
    setting3: settingIcon3,
};

export const header = {
    backgroundTopWidth: screenWidth - (screenWidth*0.19),
    backgroundRightWidth:  screenWidth + (screenWidth*2),
}