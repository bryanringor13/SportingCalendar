import React from 'react';

import { Container, SpanTitle, Title, Description, Logo, BackButton, BackImg, BlankPhoto } from './styles';

// import logoImg from '../../assets/images/logo.png';
import logoImg from '../../assets/images/circle.png';
import backIcon from '../../assets/images/back.png';
import { FontAwesome } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';

interface PropsAbout {
  span?: string;
  title: string;
  description?: string;
  back?: boolean;
  icon?: string;
}

const About: React.FC<PropsAbout> = ({ span, title, description, back, icon }) => {

  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  return (
    <>
      <Title>{title}</Title>
      <BlankPhoto>
        <FontAwesome name={icon} color="#FFFFFF" size={100}/>
      </BlankPhoto>
      <Container>
        {description == undefined ? null : <Description style={{ lineHeight: 30 }}>{description}</Description>}
      </Container>
    </>
  );
};

export default About;
