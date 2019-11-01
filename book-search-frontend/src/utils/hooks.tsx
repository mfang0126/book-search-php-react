import { useState, SetStateAction } from 'react';

const mergeState = (setState: React.Dispatch<SetStateAction<object>>) => (updates: object) => {
  setState(prevState => {
    return typeof updates === 'object' && typeof prevState === 'object' ? { ...prevState, ...updates } : updates;
  });
};

export const useMergeState: (arg0: object) => [object, React.Dispatch<SetStateAction<object>>] = initValue => {
  const [state, setState] = useState(initValue);
  return [state, mergeState(setState)];
};
