import React from 'react';
import styled from 'styled-components';
import { useMergeState } from '../utils/hooks';
import { Typography } from 'antd';
import AutoComplete from './AutoComplete';
import SearchResult from './SearchResult';

const Container = styled.div`
  margin: auto;
  max-width: 1080px;
  padding: 4rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.55) !important;
`;
const Title = styled(Typography.Title)`
  font-size: 5rem !important;
  text-align: center;
  text-transform: uppercase;
  color: #fff !important;
`;

interface Istates {
  selectedBook?: object;
}

const BookSearchPage: React.FC = () => {
  const [state, updateState] = useMergeState({
    selectedBook: null
  });

  const { selectedBook }: Istates = state;
  const getSelectedBook = (selectedBook: {}) => updateState({ selectedBook });

  return (
    <Container>
      <Title> Book Search</Title>
      <AutoComplete onSelected={getSelectedBook} />
      <SearchResult book={selectedBook} />
    </Container>
  );
};

export default BookSearchPage;
