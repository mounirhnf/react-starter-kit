import {screenBreakpoints} from 'configs';
import {Utility} from 'types';

//------------------------------------------------------------------------------

const determineScreenMode: Utility.DetermineScreenType = (width) => {
  switch (true) {
    case width > screenBreakpoints['lg']: return 'xl';
    case width > screenBreakpoints['md']: return 'lg';
    case width > screenBreakpoints['sm']: return 'md';
    case width > screenBreakpoints['xs']: return 'sm';
    default: return 'xs';
  }
};

//------------------------------------------------------------------------------

export default determineScreenMode;
