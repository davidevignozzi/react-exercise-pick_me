import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useSelector, useDispatch } from 'react-redux';
import PhotoSection from '../components/Photo-Section';
import Paginator from '../components/Paginator';
import { Container, Stack } from '../components/styled';
import { rowalizer } from '../utils/helpers';
import { useParams } from 'react-router-dom';
import {
  fetchData,
  saveQuery,
  updatePage,
} from '../redux/reducers/api-reducer';

const PaginatedScreen = () => {
  const { page } = useParams();
  const {
    query: { query, path, type, itemPerPage },
    error,
    loading,
    photos,
  } = useSelector((store) => store.photos);
  const [item_per_page, set_item_per_page] = useState(itemPerPage);
  const dispatch = useDispatch();

  const fetchPaginatedData = useCallback(() => {
    dispatch(updatePage(page));
    dispatch(
      fetchData(`${path}per_page=${item_per_page}&page=${page}`)
    );
    dispatch(
      saveQuery({ query, path, type, itemPerPage: item_per_page })
    );
  }, [dispatch, item_per_page, page]);

  useEffect(() => {
    fetchPaginatedData();
  }, [fetchPaginatedData]);

  return (
    <Layout>
      <Container mt="72px">
        <Stack direction="column" spacing="118px">
          {(!loading && !error.status && photos?.length > 0) ||
          photos?.results?.length > 0 ? (
            rowalizer(photos?.results ? photos.results : photos).map(
              (row, index) => <PhotoSection row={row} key={index} />
            )
          ) : !loading && error.status ? (
            <h3>
              {error?.message && error?.message?.length > 0
                ? error.message.join(' ')
                : 'Sorry, There was an Error. Try Later'}
            </h3>
          ) : (
            <h3>Loading ...</h3>
          )}

          <Stack justify="flex-end">
            <p style={{ color: 'var(--grey-700)' }}>
              Item per Page
              <select
                value={item_per_page}
                onChange={(e) => set_item_per_page(e.target.value)}
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
      <Paginator />
    </Layout>
  );
};

export default PaginatedScreen;
