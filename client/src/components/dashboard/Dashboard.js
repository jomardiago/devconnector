import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

import { getCurrentProfileAction, deleteAccountAction } from '../../redux/profile/profileActions';


const Dashboard = ({ auth: { user }, profile: {profile, loading}, getCurrentProfile, deleteAccount }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return (loading && profile === null) ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className="large text-primary">
                Dashboard
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome { user && user.name }</p>
            {
                profile !== null ? (
                    <Fragment>
                        <DashboardActions />
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />
                        <div className="my-2">
                            <button className="btn btn-danger" onClick={() => deleteAccount()}>
                                <i className="fas fa-user-minus"></i> Delete My Account
                            </button>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <p>You have not yet set a profile, please have some information.</p>
                        <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
                    </Fragment>
                )
            }
        </Fragment>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

const mapDispatchToProps = dispatch => ({
    getCurrentProfile: () => dispatch(getCurrentProfileAction()),
    deleteAccount: () => dispatch(deleteAccountAction(dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
