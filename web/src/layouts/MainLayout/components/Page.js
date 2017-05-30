import React from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('Page', (theme) => ({
    root: {
        marginLeft: '250px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '50px',
        },
    }
}));

const Page = ({children, classes}) => (
    <section className={classes.root}>
        {children}
    </section>
);

export default withStyles(styleSheet)(Page);
