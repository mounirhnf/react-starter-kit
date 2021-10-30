import {Store} from 'types';

import determineScreenType from 'utility/determine-screen-type';

//------------------------------------------------------------------------------

const defaults: Store.State = {
  screenType: determineScreenType(window.innerWidth),
};

//------------------------------------------------------------------------------

export default defaults;