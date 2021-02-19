import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
    SafeAreaView,
    ScrollView, TouchableWithoutFeedback
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Accordion,
    Body,
    Left,
    Right,
    Title,
    Button,
    Icon,
    Text
} from "native-base";
import { AntDesign } from '@expo/vector-icons';

import blankProfile from '../../assets/images/circle_200.png';

import { useNavigation } from '@react-navigation/native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import { fetchVenue } from '../../../redux/actions/venue';

const ENTRIES1 = [
    {
        name: 'Venue Name',
        subtitle: 'Alcohol & Food, Live music and sports events',
        description: 'Sample Description Sample Description Sample Description Sample Description Sample Description  Sample Description Sample Description Sample Description Sample Description Sample Description',
        image: 'https://i.imgur.com/UYiroysl.jpg',
        channel: ['Sky Sports', 'BT Sports', 'ESPN', 'Channel 5'],
        contact: {
            number: '+44 20 7420 9320',
            email: 'gmail@gmail.com'
        },
        opening: [
            { day: 'Mon', time: '9:00am - 10:00pm' },
            { day: 'Tue', time: '9:00am - 10:00pm' },
            { day: 'Wed', time: '9:00am - 10:00pm' },
            { day: 'Thur', time: '9:00am - 10:00pm' },
            { day: 'Fri', time: '9:00am - 10:00pm' },
            { day: 'Sat', time: '9:00am - 10:00pm' },
            { day: 'Sun', time: '9:00am - 10:00pm' },
        ],
        address: 'Emirates Stadium, Hornsey Road, London, N77AJ'
    },
    {
        name: 'Venue Name',
        subtitle: 'Alcohol & Food, Live music and sports events',
        description: 'Sample Description Sample Description Sample Description Sample Description Sample Description',
        image: 'https://i.imgur.com/UPrs1EWl.jpg',
        channel: ['Sky Sports', 'BT Sports', 'ESPN', 'Channel 5'],
        contact: {
            number: '+44 20 7420 9320',
            email: 'gmail@gmail.com'
        },
        opening: [
            { day: 'Mon', time: '9:00am - 10:00pm' },
            { day: 'Tue', time: '9:00am - 10:00pm' },
            { day: 'Wed', time: '9:00am - 10:00pm' },
            { day: 'Thur', time: '9:00am - 10:00pm' },
            { day: 'Fri', time: '9:00am - 10:00pm' },
            { day: 'Sat', time: '9:00am - 10:00pm' },
            { day: 'Sun', time: '9:00am - 10:00pm' },
        ],
        address: 'Emirates Stadium, Hornsey Road, London, N77AJ'
    },
    {
        name: 'Venue Name',
        subtitle: 'Alcohol & Food, Live music and sports events',
        description: 'Sample Description Sample Description Sample Description Sample Description Sample Description',
        image: 'https://i.imgur.com/MABUbpDl.jpg',
        channel: ['Sky Sports', 'BT Sports', 'ESPN', 'Channel 5'],
        contact: {
            number: '+44 20 7420 9320',
            email: 'gmail@gmail.com'
        },
        opening: [
            { day: 'Mon', time: '9:00am - 10:00pm' },
            { day: 'Tue', time: '9:00am - 10:00pm' },
            { day: 'Wed', time: '9:00am - 10:00pm' },
            { day: 'Thur', time: '9:00am - 10:00pm' },
            { day: 'Fri', time: '9:00am - 10:00pm' },
            { day: 'Sat', time: '9:00am - 10:00pm' },
            { day: 'Sun', time: '9:00am - 10:00pm' },
        ],
        address: 'Emirates Stadium, Hornsey Road, London, N77AJ'
    },
    {
        name: 'Venue Name',
        subtitle: 'Alcohol & Food, Live music and sports events',
        description: 'Sample Description Sample Description Sample Description Sample Description Sample Description',
        image: 'https://i.imgur.com/KZsmUi2l.jpg',
        channel: ['Sky Sports', 'BT Sports', 'ESPN', 'Channel 5'],
        contact: {
            number: '+44 20 7420 9320',
            email: 'gmail@gmail.com'
        },
        opening: [
            { day: 'Mon', time: '9:00am - 10:00pm' },
            { day: 'Tue', time: '9:00am - 10:00pm' },
            { day: 'Wed', time: '9:00am - 10:00pm' },
            { day: 'Thur', time: '9:00am - 10:00pm' },
            { day: 'Fri', time: '9:00am - 10:00pm' },
            { day: 'Sat', time: '9:00am - 10:00pm' },
            { day: 'Sun', time: '9:00am - 10:00pm' },
        ],
        address: 'Emirates Stadium, Hornsey Road, London, N77AJ'
    },
    {
        name: 'Venue Name',
        subtitle: 'Alcohol & Food, Live music and sports events',
        description: 'Sample Description Sample Description Sample Description Sample Description Sample Description',
        image: 'https://i.imgur.com/2nCt3Sbl.jpg',
        channel: ['Sky Sports', 'BT Sports', 'ESPN', 'Channel 5'],
        contact: {
            number: '+44 20 7420 9320',
            email: 'gmail@gmail.com'
        },
        opening: [
            { day: 'Mon', time: '9:00am - 10:00pm' },
            { day: 'Tue', time: '9:00am - 10:00pm' },
            { day: 'Wed', time: '9:00am - 10:00pm' },
            { day: 'Thur', time: '9:00am - 10:00pm' },
            { day: 'Fri', time: '9:00am - 10:00pm' },
            { day: 'Sat', time: '9:00am - 10:00pm' },
            { day: 'Sun', time: '9:00am - 10:00pm' },
        ],
        address: 'Emirates Stadium, Hornsey Road, London, N77AJ'
    },
];

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Venue = ({ route, navigation }: any) => {
    // const screenImageHeight = screenWidth - (screenWidth * 0.5);
    const { venue_id } = route.params;
    const [entries, setEntries] = useState([]);
    const user = useSelector((state: RootState) => state.user)
    const venues = useSelector((state: RootState) => state.venue)
    const dispatch = useDispatch()
    const carouselRef = useRef(null);
    const { goBack, navigate } = useNavigation();
    const [dates, setDates] = useState(['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'])

    const handleGoBack = () => {
        goBack();
    }

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    const renderItem = ({ item, index }: any, parallaxProps: any) => {
        // console.log('Data', item)
        return (
            <View key={index}>
                <View style={styles.item}>
                    <ParallaxImage
                        source={{ uri: !!item.photos ? item.photos : 'no data' }}
                        containerStyle={styles.imageContainer}
                        style={styles.image}
                        parallaxFactor={0.4}
                        {...parallaxProps}
                    />
                </View>
                <ScrollView style={{ height: (screenHeight - (screenHeight * 0.39)), paddingLeft: 10, paddingRight: 10 }} showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 20, paddingLeft: 10, paddingRight: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 24 }} numberOfLines={2}>
                            {!!item.name ? item.name : 'No data'}
                        </Text>
                        <Text>
                            {!!item.sub_name ? item.sub_name : 'No data'}
                        </Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ textTransform: 'uppercase', paddingLeft: 10, fontWeight: 'bold', letterSpacing: 3, fontSize: 14 }}>
                            description
                            </Text>
                        <View style={{ backgroundColor: '#E1DEDB', paddingTop: 10, paddingBottom: 10, paddingLeft: 10 }}>
                            <Text style={{ justifyContent: 'flex-start' }}>
                                {!!item.description ? item.description : 'No data'}
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ textTransform: 'uppercase', paddingLeft: 10, fontWeight: 'bold', letterSpacing: 3, fontSize: 14 }}>
                            channel we broadcast
                        </Text>
                        <ScrollView horizontal style={{ flexDirection: 'row', backgroundColor: '#E1DEDB', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10 }} showsHorizontalScrollIndicator={false}>
                            { item.venues_channels.length > 0 ? item.venues_channels.map((channel: any, index: any) => (
                                <View key={index} style={{ justifyContent: 'center', width: 80, padding: 5, backgroundColor: '#6D6D6D', borderRadius: 5, marginRight: 10 }}>
                                    <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>
                                        {channel.name}
                                    </Text>
                                </View>
                            )) : <View><Text>No available channel</Text></View>}
                        </ScrollView>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ textTransform: 'uppercase', paddingLeft: 10, fontWeight: 'bold', letterSpacing: 3, fontSize: 14 }}>
                            contact
                            </Text>
                        <View style={{ backgroundColor: '#E1DEDB', paddingTop: 10, paddingBottom: 10, paddingLeft: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: '600', width: 90 }}>
                                    Number:
                                </Text>
                                <Text>
                                    {!!item.phone_number ? item.phone_number : 'No data'}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Text style={{ fontWeight: '600', width: '20%' }}>
                                    Email:
                                </Text>
                                <Text style={{ width: '80%' }}>
                                    {!!item.email ? item.email : 'No data'}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ textTransform: 'uppercase', paddingLeft: 10, fontWeight: 'bold', letterSpacing: 3, fontSize: 14 }}>
                            General Opening times
                            </Text>
                        <View style={{ backgroundColor: '#E1DEDB', paddingTop: 10, paddingLeft: 10 }}>
                            {!!item.opening_times && item.opening_times.length > 0 ? item.opening_times.map((sched: any, index: any) => (
                                <View key={index} style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <Text style={{ fontWeight: '600', width: 70 }}>
                                        {dates[index]}
                                    </Text>
                                    <Text>
                                        {sched.start_time} - {sched.end_time}
                                    </Text>
                                </View>
                            )) : <View>
                                <Text>No data</Text>
                            </View>}
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ textTransform: 'uppercase', paddingLeft: 10, fontWeight: 'bold', letterSpacing: 3, fontSize: 14 }}>
                            address
                            </Text>
                        <View style={{ backgroundColor: '#E1DEDB', paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}>
                            <Text>
                                {!!item.address.street && item.address.street}{`, ${!!item.address.postal_code && item.address.postal_code}`}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            // <View></View>
        );
    };

    useEffect(() => {
        // setEntries(ENTRIES1);
        // console.log('Venue: ', venue_id)
        dispatch(fetchVenue({ token: user.token, venue_id}))
    }, [venue_id]);

    return (
        <View style={styles.container}>
            <View style={{ top: 0, flexDirection: 'row', justifyContent: 'flex-end', height: screenHeight - (screenHeight * 0.73), backgroundColor: '#838383' }}>
                <Button transparent style={{ marginTop: 40, marginRight: 30, height: 52 }} onPress={handleGoBack}>
                    <AntDesign name='closecircle' size={40} style={{ color: '#FFFFFF' }} />
                </Button>
            </View>
            <Carousel
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                containerCustomStyle={{
                    marginTop: screenWidth - (screenWidth * 0.73),
                    position: 'absolute'
                }}
                data={!!venues.venues ? venues.venues : []}
                renderItem={renderItem}
                hasParallaxImages={true}
            />
        </View >
    );
};

export default Venue;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: screenWidth - 60,
        height: (screenHeight - (screenHeight * 0.75)),
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});
