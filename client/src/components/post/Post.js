import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { getPostAction } from '../../redux/post/postActions';

const Post = ({ getPost, match: { params }, post, loading }) => {
    useEffect(() => {
        getPost(params.id);
    }, [getPost, params.id]);

    return loading || post === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link to="/posts" className="btn">Go Back To Posts</Link>
            <PostItem post={post} showActions={false} />
        </Fragment>
    );
};

const mapStateToProps = state => ({
    post: state.post.post,
    loading: state.post.loading
});

const mapDispatchToProps = dispatch => ({
    getPost: postId => dispatch(getPostAction(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
