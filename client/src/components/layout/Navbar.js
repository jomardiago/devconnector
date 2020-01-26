import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../redux/auth/authActions';
import { clearProfile } from '../../redux/profile/profileActions';

const Navbar = ({ isAuthenticated, logout, loading, clearProfile }) => {
    const handleLogout = () => {
        logout();
        clearProfile();
    }

    const authLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/posts'>Posts</Link>
            </li>
            <li>
                <Link to='/dashboard'>
                    <i className='fas fa-user' />{' '}
                    <span className='hide-sm'>Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={handleLogout} href='#!'>
                    <i className='fas fa-sign-out-alt' />{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'>
                    <i className='fas fa-code' /> DevConnector
                </Link>
            </h1>
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
        </nav>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: (state.auth && state.auth.isAuthenticated) ? state.auth.isAuthenticated : false,
    loading: (state.auth && state.auth.loading) ? state.auth.loading : false
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    clearProfile: () => dispatch(clearProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
