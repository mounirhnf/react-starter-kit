import React from 'react';
import {Link} from 'react-router-dom';
import clsx from 'utility/clsx';

import cls from './feedback.module.scss';

//------------------------------------------------------------------------------

const Feedback: React.FC<FeedbackProps> = (props) => {
  const {
    type,
  } = props;

  const onRefresh = () => window.location.reload();

  const rootClasses = clsx(
    cls['root'],
    type === 500 && cls['error'],
  );

  return (
    <div className={rootClasses}>
      <h1 className={cls['code']}>{type}</h1>
      <h2 className={cls['title']}>{titles[type]}</h2>
      <p className={cls['message']}>{messages[type]}</p>
      {type === 404 ?
        <Link className={cls['action']} to='/'>Go To Homepage</Link> :
        <button className={cls['action']} onClick={onRefresh}>
          Refresh Page
        </button>
      }
    </div>
  );
}

//------------------------------------------------------------------------------

interface FeedbackProps {
  type: 404 | 500;
}

interface ContentObj {
  404: string;
  500: string;
}

//------------------------------------------------------------------------------


const titles: ContentObj = {
  404: 'Page not found !',
  500: 'An unexpected error has occurred !',
};

const messages: ContentObj = {
  404: 'The page you are looking for doesn\'t exist. ' +
    'You can click the button below to return to the Home page.',
  500: 'You can click the button below to refresh the page.',
};

//------------------------------------------------------------------------------

export default Feedback;
