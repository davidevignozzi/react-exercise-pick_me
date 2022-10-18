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
      fetchData(`${path}per_page${item_per_page}&page=${page}`)
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
      <h1>Paginated page: {page}</h1>
      <Paginator />
    </Layout>
  );
};

export default PaginatedScreen;
