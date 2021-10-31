# React Starter Kit 👨‍💻
<a href="https://webpack.js.org/concepts/"><img src="https://img.shields.io/badge/bundler-Webpack-%230074c1.svg" height="20"></a> <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/config-TypeScript-%230074c1.svg" height="20"></a> <a href="https://www.sass-lang.com/"><img src="https://img.shields.io/badge/styling-Sass-%230074c1.svg" height="20"></a> <a href="http://www.github.com/mounirhnf/react-starter-kit/blob/main/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-%230074c1.svg" height="20"></a>\
A react starter template configured with Webpack, Typescript, Redux, and React Router.
# Features 💡
⚡️ Configured with typescript for safer development\
⚡️ Configured to use sass modules for a better styling experience\
⚡️ Configured with Redux for easy and organized state managment\
⚡️ Comprehensive and well written code\
⚡️ Well organized project structure
# Technologies 🛠️
- [Webpack](https://webpack.js.org/concepts/) - Module bundler
- [TypeScript](https://www.typescriptlang.org/) - Javascript on steroids
- [ReactJs](https://reactjs.org/) - Javascript UI Library
- [React Router](https://reactrouter.com/) - Router for react SPAs
- [Redux](https://redux.js.org/) - State manager for Javascript apps
- [React Icons](https://react-icons.github.io/react-icons/) - Component based icons for ReactJs
- [SCSS](https://sass-lang.com/) - CSS with superpowers
# Project Structure 🏗️
┌ `src`\
├─ `assets` - Static and Public assets\
├── `font` - Contains the static font files\
├── `public` - Contains all the publicly available assests\
├── `template.html` - The react HTML mounting point template\
├─ `elements` - The Ui Components\
├── `blocks` - Independent simple components\
├── `structures` - Complex components built with blocks\
├── `router.tsx` - Main app router\
├─ `hooks` - React custom hooks\
├─ `store` - Redux configuration\
├─ `styles` - Scss configuration files\
├─ `utility` - Custom utility functions\
├─ `configs.ts` - Envirement variables and constants\
├─ `index.tsx` - Main entry point\
├─ `types.ts` - App's shared types\
├ `webpack`\
├─ `plugins` User defined custom webpack plugins\
├─ `paths` Project structure paths for webpack\
└─ `webpack.config.js` Webpack configuration
# Usage 🚀
These instructions will get you a copy of the project up and running on your local machine
## Prerequisites 📋
You'll need [Node.js](https://nodejs.org/en/download/), [NPM](http://npmjs.com) and [Git](https://git-scm.com/downloads) installed on your computer
```
node@v12.13.0 or higher
npm@7.16.0 or higher
git@2.24.0 or higher
```
You can also use [Yarn](https://yarnpkg.com/) instead of NPM

```
yarn@v1.22.10 or higher
```
## How To Use 🔧
From your command line, first clone the repository into your local machine:
```bash
# Clone this repository
$ git clone https://github.com/mounirhnf/react-starter-kit

# Then go into the repository
$ cd react-starter-kit

# Then remove current remote repository
$ git remote remove origin
```

Install the dependencies:
```bash
# Install with NPM
$ npm install

# Install with YARN
$ yarn install
```
Specify your target port:
``` bash
# In the .env file
port=3000
```
Lastly launch the Project:
```bash
# Launch with NPM
$ npm start

# Launch with YARN
$ yarn start
```
Once you complete these steps, you should find you app running on this url `http://localhost:<your specified port or 8080>/`
## Redux usage and configuration 👨‍💻
All the redux configuration is defined in the `src/store` folder
### Subscriptions 🎬:
To subscribe a component to the store, you use the `useSelector` hook that is provided by the `react-redux` package as shown in the example below
``` typescript
import React from 'react';
import {Store} from 'types';
import {useSelector} from 'react-redux';

export const Subscriber: React.FC = () => {
  const user = useSelector((store: Store.State) => store.user);
  // This component in now subscribed to the user state in the store

  return <h1>{user.name}</h1>;
};
```
### Actions 🎬:
In this redux configuration the app comunicates with redux via middlewares that by turn call the redux actions wich are defined in the `src/store/actions.ts` as follows
``` typescript
import {Store} from 'types';

export const actions: Store.Actions {
  changeUserName: 'CHANGE_USER_NAME',
};

// This is the specific payload structure for this middleware method
interface UserNameActionPayload {
  readonly userName: string;
}

// This is the specific Action structure for this middleware method
interface UserNameAction extends Store.Action<UserNameActionPayload> {};

// This is the exampleAction middleware that is used by components to emit
// an action
export function changeUserName(userName: string): UserNameAction {
  return {
    type: actions.changeUserName,
    payload: {
      userName,
    },
  };
}
```
### Action emitions 🖱️:
To emit an action you use the `useDispatch` hook provided by `react-redux` and you use it as follows
``` typescript
import React from 'react';
import {useDispatch} from 'react-redux';
import {changeUserName} from 'store/actions';

export const Emmitter: React.FC = () => {
  const dispatch = useDispatch();
  // This component is not subscribed the store and it only emits an action

  return (
    <button onClick={() => dispatch(changeUserName('new username'))}>
      Change user's name
    </button>
  );
};
```
# Author ✍️

<a title='Mounir Hanafi' href="https://mounirhanafi.com">
<img src="https://avatars.githubusercontent.com/u/58731883?s=96&v=4" width="50" alt="profile" />
</a>

# Licence 📄
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

# Acknowledgments 🎁
I was motivated to create this project because I wanted to contribute with something useful for the dev community 💚
