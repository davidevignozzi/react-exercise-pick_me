import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  InputWrapper,
  Stack,
} from './styled';
import { ReactComponent as SearchIcon } from '../images/search-media.svg';
import PhotoSection from './Photo-Section';
import Paginator from './Paginator';
import instance from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementBy } from '../redux/store';

const HomeBody = () => {
  const { example } = useSelector((state) => state);
  const { value } = example;
  const dispatch = useDispatch();

  const incrementByAmount = (amount) => {
    if (amount > 0) {
      dispatch(incrementBy(amount));
    }
    return;
  };

  // useEffect(() => {
  //   async function test() {
  //     try {
  //       const response = await instance.get('photos');
  //       console.log('RESPONSE', response);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   test();
  // }, []);

  return (
    <Container size="fullwidth">
      <Container mt="96px">
        <Stack justify="space-between" align="end">
          <h4>Search your photos</h4>
          <p style={{ color: 'var(--grey-700' }}>{value}</p>
        </Stack>
        <Box mt="24px">
          <Stack
            width="fit-content"
            bg="grey.900"
            borderRadius="100px"
            border="1px solid"
            borderColor={'grey.700'}
            px="18px"
            style={{ overflowX: 'hidden' }}
          >
            <InputWrapper
              placeholder="Cerca una Foto"
              border="none"
              pl="0px"
              value="React"
              onChange={() => {
                return;
              }}
            />

            <Button
              onClick={() => incrementByAmount(10)}
              rightIcon={<SearchIcon />}
              isLoading={false}
              disabled={false}
              variant="text"
              iconColor="grey.700"
              bg="grey.900"
            />
          </Stack>
        </Box>
      </Container>
    </Container>
  );
};

export default HomeBody;
