import { useEffect, useRef } from 'react';
import { store } from './state';

export const useStore = () => {
  const [globalState, globalActions] = store();
  const gameState = globalState;
  const gameActions = globalActions;

  return { gameActions, gameState };
};

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  // eslint-disable-next-line
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
