import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Animated  } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { appColor } from '../../config/consts/theme';
import { RootState } from '../../redux/reducers';

const CollapseContent = (props: any) => {

    const sports = useSelector((state: RootState) => state.sports);
    const [sportChanges, setSportChanges] = useState(false);
    const [expandContent, setExpandContent] = useState(true);
    const [expandHeight, setExpandHeight] = useState(new Animated.Value(0))
    const [layoutHeight, setLayoutHeight] = useState(0)

    const _startCollapse = () => {
        Animated.timing(expandHeight, {
            toValue: !expandContent ? layoutHeight : 0,
            duration: 1000,
            useNativeDriver: false,
        }).start();
        setExpandContent(!expandContent)
    }

    const setLayoutHeightHandler = (event: any) => {
        if(sportChanges) {
            setSportChanges(false)
            setLayoutHeight(event.nativeEvent.layout.height)
            setExpandHeight(new Animated.Value(event.nativeEvent.layout.height))
        }
    }

    useEffect(() => {
        setSportChanges(true)
    }, [sports])

    return (
        <View>
            <Animated.View style={{ height: layoutHeight > 0 ? expandHeight : 'auto', overflow: 'hidden' }}>
                <View onLayout={( event: any ) => setLayoutHeightHandler( event )} key={props.children}>
                    {props.children}
                </View>
            </Animated.View>
            <View style={{backgroundColor: appColor.lightGray, alignItems: 'center', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5}}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}  onPress={() => _startCollapse()}>
                    <Text style={{ textTransform: 'uppercase', fontSize: 12, fontFamily: 'TradeGothic_bold', letterSpacing: 1 }} >{props.title}</Text>
                    <AntDesign name={expandContent ? 'minus' : 'plus'} size={16}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CollapseContent;
