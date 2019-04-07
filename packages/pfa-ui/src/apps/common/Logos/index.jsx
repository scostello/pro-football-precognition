// @flow
import * as React from 'react';
import { Icon } from 'antd';
import Loadable from 'react-loadable';

const Loading = () => <Icon spin type={'loading'} />;

const logoMap = {
  bengals: Loadable({
    loader: () => import('./Bengals'),
    loading: Loading,
  }),
  lions: Loadable({
    loader: () => import('./Lions'),
    loading: Loading,
  }),
};

const LogoNotFound = () => <span>Logo not found</span>;

export default ({ name }) => {
  const Logo = logoMap[name] || LogoNotFound;

  return <Logo />;
};
