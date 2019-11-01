const debounce: (fn: any, delay: any) => (...args: any[]) => void = (fn, delay) => {
  let time: number | null = null;
  const fnCall: (...args: any[]) => () => void = (...args) => () => {
    fn(...args);
    time = -1;
  };

  return (...args) => {
    if (time) {
      window.clearTimeout(time);
    }
    time = window.setTimeout(fnCall(...args), time === null ? 1 : delay);
  };
};

export default debounce;
