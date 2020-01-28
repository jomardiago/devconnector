import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

import { getAllProfilesAction } from '../../redux/profile/profileActions';

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getAllProfiles();
    }, [getAllProfiles]);

    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h1 className='large text-primary'>Developers</h1>
                    <p className='lead'>
                        <i className='fab fa-connectdevelop' /> Browse and connect with developers
                    </p>
                    <div className='profiles'>
                        {profiles.length > 0 ? (
                            profiles.map(profile => (
                                <ProfileItem key={profile._id} profile={profile} />
                            ))
                            ) : (
                            <h4>No profiles found...</h4>
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

const mapStateToProps = state => ({
    profile: state.profile
});

const mapDispatchToProps = dispatch => ({
    getAllProfiles: () => dispatch(getAllProfilesAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
