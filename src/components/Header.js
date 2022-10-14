import React from 'react';
// import { Container, Stack, Box, Button } from "./styled";
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as CartIcon } from '../images/cart.svg';
import { Link } from 'react-router-dom';
import { Container } from './styled';

const Header = () => {
  return (
    <Container>
      <h2>Header</h2>
    </Container>
  );
};

export default Header;
