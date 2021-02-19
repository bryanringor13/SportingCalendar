import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { CircleImage, Buttons, colors, Title, TextButtonRegister, ButtonRegister, ButtonEnter, ImageBlank, IconContent } from './styles';

import About from '../../../components/About';
import BackgroundImage from '../../../components/BackgroundImage';
import logoImg from '../../assets/images/circle.png';
import { FontAwesome } from '@expo/vector-icons';

import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView
} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ROUTES } from '../../../config/consts/routes';
import { Container } from 'native-base';
import { TextButton } from '../../../components/Styles';

function Initial() {
  const SLIDER_1_FIRST_ITEM = 0;
  const { navigate } = useNavigation();
  const [carousel, setCarousel] = useState();
  const [activeIndex, setActiveIndex] = useState(SLIDER_1_FIRST_ITEM);
  const [data, setData] = useState([
    {
      title: "Welcome",
      icon: "calendar-o",
      description: "Welcome to The Sporting Calendar. We’re your personal assistant for sport. \n\n Tell us what sports and teams you want to follow and we’ll put it in an easy to manage calendar. \n\n If you choose to skip the onboarding process, there’s a default calendar we’ve created for you. But don’t worry… we’ve made it easy for you to personalise your calendar at any time."
    },
    {
      title: "Event Page",
      icon: "ticket",
      description: "Our Event page gives you information on how to buy tickets. Watch at home. Or at your local Pub. Make sure you share the event pages with friends and family to get them in on the action."
    },
    {
      title: "Favouriting Events",
      icon: "heart",
      description: "Sign up to TSC to receive ticket reminders. For every event you favourite we will send you a notification when the tickets go on sale. You’ll never miss a match again."
    },
    {
      title: "Discover Events",
      icon: "search",
      description: "The Discovery feature shows a selection of local events that we think you will like. It will also show you major events and events which are happening right now. Take a look and start exploring."
    },
  ]);
  const SLIDER_WIDTH = Dimensions.get('window').width;
  const SLIDER_HEIGHT = Dimensions.get('window').height;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);
  const ITEM_HEIGHT = SLIDER_HEIGHT-(SLIDER_HEIGHT*.2);
  // const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 1.7);

  const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
  function wp(percentage: any) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  }

  const slideHeight = viewportHeight * 0.36;
  const slideWidth = wp(75);
  const itemHorizontalMargin = wp(2);

  const sliderWidth = viewportWidth;
  const itemWidth = slideWidth + itemHorizontalMargin * 5;

  function handleNavigationToRegisterPage() {
    navigate(ROUTES.REGISTER);
  }

  function handleNavigationToLoginPage() {
    navigate(ROUTES.AUTH_LOGIN);
  }

  const renderItems = ({ item, index }: any) => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{
          backgroundColor: '#122C5B',
          borderRadius: 20,
          padding: 40,
          marginLeft: 6,
          marginRight: 6,
        }}>
          <Title>{item.title}</Title>
          <IconContent>
            <FontAwesome name={item.icon} color="#FFFFFF" size={100}/>
          </IconContent>
          <View style={{ backgroundColor: '#ffffff00', marginTop: '20%', marginBottom: '30%' }}>
            {item.description == undefined ? null : <Text style={{ lineHeight: 30, color: '#FFFFFF', textAlign: 'center' }}>{item.description}</Text>}
          </View>
        </ScrollView>
          {(data.length - 1) == index ? <Buttons>
            <ButtonEnter onPress={handleNavigationToLoginPage} >
              <TextButton>Enter</TextButton>
            </ButtonEnter>
            <ButtonRegister onPress={handleNavigationToRegisterPage} >
              <TextButtonRegister>Register</TextButtonRegister>
            </ButtonRegister>
          </Buttons> : null}
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: 50 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <Text style={{ fontWeight: '800', color: '#122C5B',textTransform: 'uppercase', letterSpacing: 5, fontSize: 16 }}>the sporting calendar</Text>
      </View>
      <Carousel
        layout={"default"}
        ref={(ref: any) => setCarousel(ref)}
        data={data}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        renderItem={renderItems}
        inactiveSlideScale={1.94}
        inactiveSlideOpacity={0.7}
        containerCustomStyle={{
          marginTop: 15,
          overflow: 'visible', // for custom animations
        }}
        contentContainerCustomStyle={{
          paddingVertical: 10, // for custom animation
        }}
        hasParallaxImages={true}
        // loop={true}
        // loopClonesPerSide={2}
        // inactiveSlideShift={20}
        onSnapToItem={index => setActiveIndex(index)}
        />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={{
          paddingVertical: 8
        }}
        dotColor={'#122C5B'}
        dotStyle={{
          width: 15,
          height: 15,
          borderRadius: 10,
          marginHorizontal: -5
        }}
        inactiveDotColor={colors.lightBlue}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        carouselRef={carousel}
        tappableDots={!!carousel}
        animatedDuration={0}
      />
    </SafeAreaView>
  );
};

export default Initial;
