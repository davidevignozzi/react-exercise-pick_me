import React from 'react';
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
        <Box my="96px">
          <InputWrapper placeholder="text" />
        </Box>
        <Skeleton width="300px" height="300px" />
        <Stack spacing="24px" mt="96px">
          <Button size="xl" variant="contained">
            Contained
          </Button>
          <Button size="md" variant="outlined">
            Outlined
          </Button>
          <Button size="sm" variant="text">
            Text
          </Button>
          <Button size="xl" variant="disabled">
            Disabled
          </Button>
        </Stack>
      </Container>
    </Layout>
  );
};

export default HomePage;
