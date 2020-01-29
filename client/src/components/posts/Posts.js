import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import PostItem from './PostItem';

import * as postActions from '../../redux/post/postActions';

const Posts = ({ getPosts, posts, loading }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return loading ? <Spinner /> : (
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome to the community
            </p>
            <div className="posts">
                {
                    posts.map(post => (
                        <PostItem key={post._id} post={post} />
                    ))
                }
            </div>
        </Fragment>
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
