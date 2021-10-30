import {Global, Store} from 'types';

//------------------------------------------------------------------------------

export const actions: Store.Actions = {
  setScreenType: 'SET_SCREEN_TYPE',
};

//------------------------------------------------------------------------------

interface ScreenTypePayload {
  readonly screenType: Global.ScreenType;
}

interface ScreenTypeAction extends Store.Action<ScreenTypePayload> {};

export function setScreenType(screenType: Global.ScreenType): ScreenTypeAction {
  return {
    type: actions.setScreenType,
    payload: {
      screenType,
    },
  };
}
