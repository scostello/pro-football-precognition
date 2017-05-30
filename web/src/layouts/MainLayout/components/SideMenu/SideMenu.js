import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import {Link} from 'react-router';
import { MenuList, MenuItem } from 'material-ui/Menu';

const styleSheet = createStyleSheet('SideMenu', (theme) => ({
    root: {
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1,
        width: '250px',
        height: '100%',
        backgroundColor: '#3f4652',
        [theme.breakpoints.down('sm')]: {
            width: '50px',
        },
    },
    link: {
        '&:hover': {
            textDecoration: 'none',
        },
    },
    menuItem: {
        color: '#fff',
    }
}));

const SideMenu = ({classes, navItems}) => {
    return (
        <div className={classes.root}>
            <MenuList>
                {navItems.map((navItem, idx) => <Link key={idx} to={navItem.path} className={classes.link}><MenuItem className={classes.menuItem}>{navItem.display}</MenuItem></Link>)}
            </MenuList>
        </div>
    );
};

export default withStyles(styleSheet)(SideMenu);
