import React from 'react';
import {Global} from 'types';

import {setScreenType} from 'store/actions';

import {useDispatch} from 'react-redux';

import determineType from 'utility/determine-screen-type';

//------------------------------------------------------------------------------

export default function useAutoScreenType() {
  const [
    current,
    setCurrent,
  ] = React.useState<Global.ScreenType>(determineType(window.innerWidth));

  const dispatch = useDispatch();

  React.useEffect(() => {
    // Event that waches the resizing of the window and sets state accordingly
    const resizeListener = () => setCurrent(determineType(window.innerWidth));

    window.addEventListener('resize', resizeListener);

    // Clear event at unmounting to prevent memory leaks
    return () => window.removeEventListener('resize', resizeListener);
  }, [dispatch]);

  React.useEffect(() => {
    // Set store state only when the current screen type state changes
    current && dispatch(setScreenType(current));
  }, [dispatch, current]);
}
