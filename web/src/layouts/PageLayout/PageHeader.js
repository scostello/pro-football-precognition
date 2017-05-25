import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styleSheet = createStyleSheet('PageHeader', (theme) => ({
    root: {
        flexGrow: 1,
        position: 'relative',
        height: '300px',
        background: 'linear-gradient(120deg,#00c4cc 25%,#6e4593 85%)',
        [theme.breakpoints.down('sm')]: {
            width: '0px',
            padding: '0px'
        }
    }
}));

const PageHeader = ({classes}) => {
    return (
        <div className={classNames(classes.root)}>
            {/*<Grid item xs={12}/>*/}
        </div>
    );
};

export default withStyles(styleSheet)(PageHeader);
