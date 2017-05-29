import { connect } from 'react-redux';

import PageLayout from '../components/PageLayout';

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
    return {
        navItems: state.main.navItems
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);

