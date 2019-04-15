// @flow
import * as React from 'react';
import { PageHeader } from 'antd';

const Header = ({ activeMenuItem }) => <PageHeader title={activeMenuItem.label} />;

export default Header;
