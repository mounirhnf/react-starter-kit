import {Store} from 'types';
import {createLogger} from 'redux-logger';

//------------------------------------------------------------------------------

const ignoredActions: Store.ActionType[] = [];

export default createLogger({
  predicate: (_, action) => {
    if (!ignoredActions.includes(action.type)) {
      console.log(
        `%c${action.type}`,
        'color: #6DBDBF; font-weight: bold',
        action.payload || '',
      );
    }

    return false;
  },
});
