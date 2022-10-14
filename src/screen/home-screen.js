import React from 'react';
import Layout from '../components/layout';
import { Box, Container, Stack } from '../components/styled';

const HomePage = () => {
  return (
    <Layout>
      <Container>
        <h1>Home</h1>
        <Stack spacing="50px" direction="column">
          <Box
            width="100px"
            height="100px"
            border="1px solid"
            borderColor="red"
            borderRadius="16px"
          ></Box>
          <Box
            width="100px"
            height="100px"
            border="1px solid"
            borderColor="red"
            borderRadius="16px"
          ></Box>
          <Box
            width="100px"
            height="100px"
            border="1px solid"
            borderColor="red"
            borderRadius="16px"
          ></Box>
          <Box
            width="100px"
            height="100px"
            border="1px solid"
            borderColor="red"
            borderRadius="16px"
          ></Box>
          <Box
            width="100px"
            height="100px"
            border="1px solid"
            borderColor="red"
            borderRadius="16px"
          ></Box>
        </Stack>
      </Container>
    </Layout>
  );
};

export default HomePage;
