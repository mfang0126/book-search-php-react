import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useMergeState } from '../utils/hooks';
import debounce from '../utils/debounce';
import { object } from 'prop-types';

const Container = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const SuggestionInput = styled.div`
  position: absolute;
  width: 100%;
  padding-left: 0;
  list-style: none;
  overflow-y: auto;
  background: #eee;

  li {
    height: 3rem;
    line-height: 3rem;
    padding: 0 2rem;
    font-size: 2rem;
  }

  .active,
  li:hover {
    cursor: pointer;
    font-weight: 700;
  }
  li:not(:last-of-type) {
    border-bottom: 1px solid #999;
  }
`;

const Input = styled.input`
  position: relative;
  width: 100%;
  padding: 0 2rem;
  border-bottom: 2px solid #999;
  line-height: 3rem;
  font-size: 2rem;
  color: #fff;
`;

interface Istates {
  activeSuggestion?: number;
  filteredSuggestions?: [];
  showSuggestions?: boolean;
  userInput?: string;
}
const BOOK_SEARCH = 'http://localhost:8000/api/search';
const fetchFromApi = (query: string, successCb: () => void, failCb: () => void) =>
  axios
    .get(BOOK_SEARCH, { params: { query } })
    .then(response => response.data)
    .then(successCb)
    .catch(failCb);

const AutoComplete: React.FC<{ onSelected: (arg0: {}) => void }> = ({ onSelected }) => {
  const [state, updateState] = useMergeState({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: ''
  });
  const { userInput, showSuggestions, filteredSuggestions, activeSuggestion }: Istates = state;

  const getSuggestions = debounce(fetchFromApi, 500);

  const onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void = e => {
    updateState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  const onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void = e => {
    const { value: userInput } = e.currentTarget;
    updateState({
      activeSuggestion: 0,
      showSuggestions: true,
      userInput
    });
    getSuggestions(
      userInput,
      ({ data }: { data: [] }) => {
        updateState({
          filteredSuggestions: data
        });
      },
      console.error
    );
  };

  const onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void = e => {
    const { activeSuggestion, filteredSuggestions }: Istates = state;
    const { keyCode } = e;

    if (keyCode === 13) {
      updateState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput:
          filteredSuggestions && activeSuggestion && filteredSuggestions[activeSuggestion]
            ? filteredSuggestions[activeSuggestion]['original_title']
            : ''
      });
      if (typeof filteredSuggestions !== 'undefined' && typeof activeSuggestion !== 'undefined') {
        onSelected(filteredSuggestions[activeSuggestion]);
      }
    }

    if (typeof activeSuggestion !== 'undefined') {
      keyCode === 38 && activeSuggestion !== 0 && updateState({ activeSuggestion: activeSuggestion - 1 });
      keyCode === 40 &&
        filteredSuggestions &&
        activeSuggestion !== filteredSuggestions.length &&
        updateState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  return (
    <Container>
      <Input type="text" onChange={onChangeInput} onKeyDown={onKeyDown} value={userInput} />
      {showSuggestions && userInput && Array.isArray(filteredSuggestions) ? (
        <SuggestionInput>
          {filteredSuggestions
            .map(({ original_title }) => original_title)
            .map((suggestion, index) => (
              <li className={index === activeSuggestion ? 'active' : ''} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            ))}
        </SuggestionInput>
      ) : null}
    </Container>
  );
};

export default AutoComplete;
