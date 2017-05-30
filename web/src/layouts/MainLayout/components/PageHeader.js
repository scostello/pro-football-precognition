import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styleSheet = createStyleSheet('AppBar', (theme) => ({
    root: {
        position: 'relative',
        width: '100%',
    },
    appBar: {
        position: 'relative',
        background: 'linear-gradient(120deg, #00c4cc 25%, #6e4593 85%)',
        color: '#fff'
    },
    button: {
        color: '#fff',
        '&:focus': {
            outline: 'none'
        }
    }

}));

const PageHeader = ({classes}) => {
    return (
        <div className={classNames(classes.root)}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton className={classes.button}>
                        <MenuIcon />
                    </IconButton>
                    <Typography type="title" colorInherit className={classes.flex}>Title</Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withStyles(styleSheet)(PageHeader);
