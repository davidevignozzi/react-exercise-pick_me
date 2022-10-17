import React from 'react';
import { Button, Container, Stack } from './styled';
import { ReactComponent as LeftIcon } from '../images/left-arrow.svg';
import { ReactComponent as RightIcon } from '../images/small-right-arrow.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Paginator = () => {
  const { currentPage, hasPrevPage, hasNextPage } = useSelector(
    (store) => store.photos.pagination
  );

  const definePaginationFlex = () => {
    if (!hasNextPage && hasPrevPage) {
      return 'flex-start';
    } else if (hasNextPage && !hasPrevPage) {
      return 'flex-end';
    } else {
      return 'space-between';
    }
  };
  return (
    <Container size="fullwidth" mt="118px">
      <Container>
        <Stack
          justify={definePaginationFlex}
          align="center"
          width="100%"
        >
          {hasPrevPage && (
            <Link
              style={{ textDecoration: 'none' }}
              to={
                parseInt(currentPage, 10) === 2
                  ? '/'
                  : `/photo/${parseInt(currentPage, 10) - 1}`
              }
            >
              <Button
                size="md"
                variant="outlined"
                leftIcon={<LeftIcon />}
                iconColor="purple.300"
              >
                Prev
              </Button>
            </Link>
          )}

          {hasNextPage && (
            <Link
              style={{ textDecoration: 'none' }}
              to={`/photo/${parseInt(currentPage, 10) + 1}`}
            >
              <Button
                size="md"
                variant="outlined"
                rightIcon={<RightIcon />}
                iconColor="purple.300"
              >
                Next
              </Button>
            </Link>
          )}
        </Stack>
      </Container>
    </Container>
  );
};

export default Paginator;
