import React, { useState, useEffect, useCallback } from 'react';
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
import {
  catchError,
  fetchData,
  saveQuery,
  updatePage,
} from '../redux/reducers/api-reducer';
import { rowalizer } from '../utils/helpers';

const HomeBody = () => {
  const {
    photos,
    error,
    loading,
    rate_limit,
    query: lastSearch,
  } = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  const [itemPerPage, setItemPerPage] = useState(
    lastSearch.itemPerPage || 12
  );
  const [query, setQuery] = useState(lastSearch.query || '');

  /**
   * Call Api
   *
   */

  // ----------------------------------------------------------------
  const searchPhoto = (page = 1) => {
    fetchPhotos('search', page);
  };

  const fetchPhotos = (type = 'latest', page = 1) => {
    let apiUrl = null;
    if (type === 'search') {
      if (query && query.length > 1 && query !== ' ') {
        apiUrl = `search/photos?query=${query}&`;
      } else {
        dispatch(catchError(['Inserisci almeno un carattere']));
        return;
      }
    } else {
      apiUrl = 'photos?';
    }

    // Pagination
    dispatch(updatePage(page));

    // Get Data
    dispatch(
      fetchData(`${apiUrl}per_page=${itemPerPage}&page=${page}`)
    );

    dispatch(
      saveQuery({
        path: `${apiUrl}`.trim(),
        itemPerPage,
        type,
        query,
      })
    );
  };

  useEffect(() => {
    if (!lastSearch.query) {
      fetchPhotos();
    } else {
      fetchPhotos(lastSearch.type);
    }
  }, [itemPerPage]);
  // ----------------------------------------------------------------

  // Call api
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
          <p
            style={{ color: 'var(--grey-700' }}
          >{`Richieste: ${rate_limit.remaining} / ${rate_limit.total}`}</p>
        </Stack>
        <Box mt="24px">
          <Stack
            width="fit-content"
            bg="grey.900"
            borderRadius="100px"
            border="1px solid"
            borderColor={error.status ? 'error' : 'grey.700'}
            px="18px"
            style={{ overflowX: 'hidden' }}
          >
            <InputWrapper
              placeholder="Cerca una Foto"
              border="none"
              pl="0px"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />

            <Button
              rightIcon={<SearchIcon />}
              isLoading={false}
              disabled={false}
              variant="text"
              iconColor="grey.700"
              bg="grey.900"
              onClick={() => searchPhoto()}
            />
          </Stack>
        </Box>

        <Container mt="72px">
          <Stack direction="column" spacing="118px">
            {!loading &&
            !error.status &&
            (photos?.length > 0 || photos?.results?.length > 0) ? (
              rowalizer(
                photos?.results ? photos.results : photos
              ).map((row, index) => (
                <PhotoSection row={row} key={index} />
              ))
            ) : !loading && error.status ? (
              <h3>
                {error?.message && error.message.length > 0
                  ? error.message.join(' ')
                  : 'Sorry, there was an Error. Try Again'}
              </h3>
            ) : (
              <h3>Loading...</h3>
            )}

            <Stack justify="flex-end">
              <p style={{ color: 'var(--grey-700)' }}>
                Item per Page
                <select
                  value={itemPerPage}
                  onChange={(e) => setItemPerPage(e.target.value)}
                >
                  {Array.from({ length: 7 }, (_, index) => {
                    return (index + 1) * 3;
                  }).map((el) => {
                    return (
                      <option value={el} key={`option-${el}`}>
                        {el}
                      </option>
                    );
                  })}
                </select>
              </p>
            </Stack>
          </Stack>
        </Container>
      </Container>
      <Paginator />
    </Container>
  );
};

export default HomeBody;
