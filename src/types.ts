export namespace Global {
  export type ScreenType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

//------------------------------------------------------------------------------

export namespace Store {
  export interface State {
    readonly screenType: Global.ScreenType;
  }

  export interface Actions {
    readonly setScreenType: 'SET_SCREEN_TYPE';
  }

  export type ActionType = Actions[keyof Actions];

  export interface Action<P = any> {
    readonly type: ActionType;
    readonly payload: P;
  }
}

//------------------------------------------------------------------------------

export namespace Utility {
  export type Clsx = (...c: (string | boolean | undefined | null)[]) => string;
  export type DetermineScreenType = (width: number) => Global.ScreenType;
}
