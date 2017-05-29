import React from 'react';
import { IndexLink, Link } from 'react-router';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { grey, blue, red } from 'material-ui/styles/colors';
import SideMenu from './SideMenu/SideMenu';
import Page from './Page';
import PagerHeader from './PageHeader';

const theme = createMuiTheme({
    palette: createPalette({
        primary: grey,
        accent: {
            ...blue,
            A400: '#00e677',
        },
        error: red,
    }),
});

export const PageLayout = ({ children, navItems }) => (
    <MuiThemeProvider theme={theme}>
        <div style={{height: '100%'}}>
            <SideMenu navItems={navItems}/>
            <Page>
                <PagerHeader/>
                {children}
            </Page>
        </div>
    </MuiThemeProvider>
);

PageLayout.propTypes = {
    children: PropTypes.node,
};

export default PageLayout;
