import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Animated, ScrollView, Image, Easing } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from "native-base";
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { appColor } from '../../config/consts/theme';
import { RootState } from '../../redux/reducers';
import { Liner } from '../Styles';
import * as WebBrowser from 'expo-web-browser';

import skySports from '../../assets/images/eventdetail/sky_sports_2x_2.png';
import Collapsible from 'react-native-collapsible';

const CollapseContent = (props: any) => {

    const [collapsed, setCollapsed] = useState(true)

    const collapsedSubsHandler = () => {
        setCollapsed(!collapsed)
    }

    const _handlePressButtonAsync = async (urlLink: any) => {
        let result = await WebBrowser.openBrowserAsync(urlLink);
    };

    const TicketCard = ({ themeColor, borderColor, textColor, header, body, footer, urlLink}: any) => {
        return (
            <TouchableOpacity style={{marginRight: 10}} onPress={() => _handlePressButtonAsync(urlLink)}>
                <View style={{height: 82, width: 112,backgroundColor: themeColor, borderRadius: 10, justifyContent: 'center', paddingLeft: 10, borderColor: borderColor, borderWidth: 1}}>
                    <Text style={{color: textColor, fontSize: 12}}>{!!header ? header : 'No data'}</Text>
                    <Text style={{color: textColor, fontSize: 18, fontWeight: 'bold'}}>{!!body ? body : 'No Price'}</Text>
                    <Text style={{color: textColor, textTransform: 'uppercase', fontSize: 12, marginTop: 5, fontWeight: 'bold'}}>{!!footer ? footer : 'No data'}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const SubscriptionContent = ({content}: any) => {
        return (
            !!content && content.length > 0 ?
            <ScrollView horizontal style={{paddingRight: 20}}>
                {content.map((sub:any, index:any) => (
                    <TicketCard key={index} themeColor={sub.themeColor} header={sub.type} body={!!sub.amount ? `${sub.amount}` : 'No Data'} footer={sub.name} urlLink={!!sub.link ? sub.link : 'nolink'} borderColor={'#000000'} textColor={'#000000'}/>
                ))}
            </ScrollView>
            : <View style={{paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>
                <Text>No Subscription</Text>
            </View>
        )
    }

    return (
        <View style={{ padding: 20 }}>
        {!!props.channel ? <View>
            {!!props.channel.match_center && <View style={{ marginBottom: 10 }}>
                <Text style={{ fontFamily: 'TradeGothic_bold', textTransform: 'uppercase', fontSize: 14 }}>Match Centre Live Streaming</Text>
            </View>}
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 50}}>
                <View style={{ width: 50, height: 50 }}>
                    <Image source={skySports} resizeMode="cover" style={{ width: '100%', height: '100%',borderRadius: 60 }}/>
                </View>
                <View style={{ width: '85%', flexDirection: 'column', paddingLeft: 5, justifyContent: 'center'}}>
                    <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', paddingTop: 5, fontSize: 14 }}>{props.channel.name}</Text>
                    {!!props.channel.subscription ? props.channel.subscription.length > 0 && <View style={{ paddingTop: 5}}>
                        <TouchableOpacity onPress={() => collapsedSubsHandler()} style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text>See how you can purchased broadcast</Text>
                            <SimpleLineIcons name="arrow-down" size={10} style={{ marginLeft: 10 }}/>
                        </TouchableOpacity>
                    </View> : null}
                </View>
            </View>
            {!!props.channel.subscription ? props.channel.subscription.length > 0 && <View>
                {/* <Animated.View style={{ transform: [{ translateY: expandHeight }, ], overflow: 'hidden' }}> */}
                {/* <Animated.View style={{ transform: [{ translateY: expandHeight }, ], overflow: 'hidden' }}> */}
                <Collapsible collapsed={collapsed} duration={1000}>
                    {/* <View onLayout={( event: any ) => setLayoutHeightHandler( event )}> */}
                        <Liner style={{ marginBottom: 15}} />
                        <SubscriptionContent content={props.channel.subscription} />
                    {/* </View> */}
                </Collapsible>
                {/* </Animated.View> */}
            </View> : null}
            {/* {index < (props.channel.length - 1) && <Liner style={{ marginBottom: 15}} />} */}
        </View> : <Text>{'No event channel'}</Text>}
        </View>
    );
};

export default CollapseContent;
