import React from 'react';
import Hero from '../components/Hero';
import HomeBody from '../components/HomeBody';
import Layout from '../components/layout';
import {
  Box,
  Button,
  Container,
  InputWrapper,
  Skeleton,
  Stack,
} from '../components/styled';

const HomePage = () => {
  return (
    <Layout>
      <Container size="fullwidth">
        <Hero />
        <HomeBody />
      </Container>
    </Layout>
  );
};

export default HomePage;
