import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { likePostAction, unlikePostAction, deletePostAction } from '../../redux/post/postActions';

const PostItem = ({ auth, post, likePost, unlikePost, deletePost }) => {
    const { _id, text, name, avatar, user, likes, comments, date } = post;

    const handleLikePost = () => {
        likePost(_id);
    }

    const handleUnlikePost = () => {
        unlikePost(_id);
    }

    const handleDeletePost = () => {
        deletePost(_id);
    }

    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to="/">
                    <img className="round-img" src={avatar} alt="" />
                    <h4>{ name }</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{text}</p>
                <p className="post-date">Posted on <Moment format={'YYYY/MM/DD'}>{date}</Moment></p>
                <button type="button" className="btn btn-light" onClick={handleLikePost}>
                    <i className="fas fa-thumbs-up" />{' '}
                    { likes.length > 0 && (<span>{likes.length}</span>) }
                </button>
                <button type="button" className="btn btn-light" onClick={handleUnlikePost}>
                    <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${_id}`} className="btn btn-primary">
                    Discussion { comments.length > 0 && <span className='comment-count'>{comments.length}</span> }
                </Link>
                {
                    !auth.loading && user === auth.user._id && (
                        <button type="button" className="btn btn-danger" onClick={handleDeletePost}>
                            <i className="fas fa-times"></i>
                        </button>
                    )
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    likePost: id => dispatch(likePostAction(id)),
    unlikePost: id => dispatch(unlikePostAction(id)),
    deletePost: id => dispatch(deletePostAction(id, dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);