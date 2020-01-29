import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';

import * as postActions from '../../redux/post/postActions';

const Posts = ({ getPosts, posts, loading }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <div>
            Posts
        </div>
    );
};

const mapStateToProps = state => ({
    posts: state.post.posts,
    loading: state.post.loading
});

const mapDispatchToProps = dispatch => ({
    getPosts: () => dispatch(postActions.getPostsAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
