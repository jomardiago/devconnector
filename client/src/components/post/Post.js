import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
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
            <CommentForm postId={post._id} />
            <div className="comments">
                {
                    post.comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} postId={post._id} />
                    ))
                }
            </div>
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
