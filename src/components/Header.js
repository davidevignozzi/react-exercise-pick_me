import React from 'react';
import { Container, Stack, Button, Box } from './styled';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as CartIcon } from '../images/cart.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <Container
        size="fullwidth"
        position="fixed"
        background="grey.800"
        zIndex={999}
      >
        <Stack direction="column" align="center">
          <Container>
            <Stack
              justify="space-between"
              align="center"
              width="100%"
              height={['64px', '72px']}
            >
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Logo />
              </Link>

              <Link to="/checkout" style={{ textDecoration: 'none' }}>
                <Button variant="text">
                  <CartIcon />
                </Button>
              </Link>
            </Stack>
          </Container>
        </Stack>
      </Container>

      {/* For Margin */}
      <Box height={['64px', '72px']} width="100%" />
    </>
  );
};

export default Header;
