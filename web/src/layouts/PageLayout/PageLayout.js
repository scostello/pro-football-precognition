import React from 'react';
import { IndexLink, Link } from 'react-router';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { grey, blue, red } from 'material-ui/styles/colors';
import SideMenu from './SideMenu'

const theme = createMuiTheme({
    palette: createPalette({
        primary: grey, // Purple and green play nicely together.
        accent: {
            ...blue,
            A400: '#00e677',
        },
        error: red,
    }),
});

export const PageLayout = ({ children }) => (
    <MuiThemeProvider theme={theme}>
        <div style={{height: '100%'}}>
            <SideMenu/>
            {children}
        </div>
    </MuiThemeProvider>
);

PageLayout.propTypes = {
    children: PropTypes.node,
};

export default PageLayout;
