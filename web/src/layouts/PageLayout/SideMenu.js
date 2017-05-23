import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('SideMenu', (theme) => ({
    root: {
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1,
        width: '250px',
        height: '100%',
        backgroundColor: theme.palette.primary[200],
        padding: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '0px',
        },
    }
}));

const SideMenu = ({classes}) => {
    return (
        <div className={classes.root}>

        </div>
    );
};

export default withStyles(styleSheet)(SideMenu);
