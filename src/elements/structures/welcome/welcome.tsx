import React from 'react';
import {Store} from 'types';

import {useSelector} from 'react-redux';

import Icon from 'elements/blocks/icon';

import {
  FaGlobeEurope as GlobeIcon,
  FaGithub as GithubIcon,
} from 'react-icons/fa';

import webpackLogo from './assets/webpack.svg';
import reactLogo from './assets/react.svg';
import typescriptLogo from './assets/typescript.svg';
import reduxLogo from './assets/redux.svg';
import background from './assets/background.jpg';

import clsx from 'utility/clsx';

import cls from './welcome.module.scss';

//------------------------------------------------------------------------------

const Welcome: React.FC = () => {
  const screenType = useSelector((store: Store.State) => store.screenType);

  const rootClasses = clsx(
    cls['root'],
    screenType === 'xs' && cls['root-xs'],
  );

  return (
    <div className={rootClasses}>
      <h1 className={cls['main-title']}>Welcome To React Starter Kit !</h1>
      <p className={cls['description']}>
        A simple template made to help you get started with react without using 
        create-react-app
      </p>
      <h2 className={cls['secondary-title']}>MADE WITH</h2>
      <div className={cls['tech']}>
        <img
          className={cls['brand']}
          title='Webpack'
          src={webpackLogo}
          alt='webpack'
        />
        <img
          className={cls['brand']}
          title='React'
          src={reactLogo}
          alt='react'
        />
        <img
          className={cls['brand']}
          title='Typescript'
          src={typescriptLogo}
          alt='typescript'
        />
        <img
          className={cls['brand']}
          title='Redux'
          src={reduxLogo}
          alt='redux'
        />
      </div>
      <h2 className={cls['secondary-title']}>BY</h2>
      <h3 className={cls['author']}>MOUNIR HANAFI</h3>
      <div className={cls['author-info']}>
        <a  title={'Mounir Hanafi\'s Website'}
            className={cls['author-icon-link']}
            href="https://mounirhanafi.com"
            target='_blank'
            rel='noreferrer noopener'>
          <Icon className={cls['author-icon']} prefix={GlobeIcon} />
        </a>
        <a  title={'Mounir Hanafi\'s Github page'}
            className={cls['author-icon-link']}
            href="https://github.com/mounirhnf"
            target='_blank'
            rel='noreferrer noopener'>
          <Icon className={cls['author-icon']} prefix={GithubIcon} />
        </a>
      </div>
      <p className={cls['call-to-action']}>
        Click
        <a className={cls['action-link']}
            href={usageLink}
            target='_blank'
            rel='noreferrer noopener'>
          HERE
        </a>
        To learn how to use this template
      </p>
      <div className={cls['overlay']} />
      <img className={cls['background']} src={background} alt="background" />
    </div>
  );
}

//------------------------------------------------------------------------------

const usageLink = `https://github.com/mounirhnf/react-starter-kit#usage-`;

//------------------------------------------------------------------------------

export default Welcome;
