import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  background: rgba(0, 0, 0, 0.08);
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.35) !important;
`;

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 20%;
`;

const ColumnRight = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  flex-basis: 80%;
  padding: 1rem;
`;

const BookImage = styled.img`
  padding: 1rem 1.5rem;
  width: 100%;
`;

const BookTitle = styled.div`
  font-size: 2rem;
`;

const Auther = styled.div`
  font-size: 1rem;
`;

const Year = styled.div`
  font-size: 1rem;
  float: right;
`;

const Paragraph = styled.div`
  font-size: 1rem;
`;

const getContent = ({ image_url, original_title, authors, original_publication_year, paragraph }: any) => (
  <Row>
    <ColumnLeft>
      <BookImage src={image_url} alt="book-logo" />
    </ColumnLeft>
    <ColumnRight>
      <BookTitle>{original_title}</BookTitle>
      <Auther>{authors}</Auther>
      <Year>{original_publication_year}</Year>
      <Paragraph>{paragraph}</Paragraph>
    </ColumnRight>
  </Row>
);

const SearchResult: React.FC<{ book: any | undefined }> = ({ book }) => {
  return <>{book ? getContent(book) : null}</>;
};

export default SearchResult;
