import React from 'react';
import Layout from '../components/layout';
import { Box } from '../components/styled';

const HomePage = () => {
  return (
    <Layout>
      <h1>Home</h1>
      <Box
        width="400px"
        height="239px"
        border="1px solid"
        borderColor="red"
        borderRadious="16px"
        m="10px"
        bg="green"
      ></Box>
    </Layout>
  );
};

export default HomePage;
