import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getCurrentProfileAction } from '../../redux/profile/profileActions';

const Dashboard = ({ auth, profile, getCurrentProfile }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return (
        <div>
            Dashboard
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

const mapDispatchToProps = dispatch => ({
    getCurrentProfile: () => dispatch(getCurrentProfileAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
