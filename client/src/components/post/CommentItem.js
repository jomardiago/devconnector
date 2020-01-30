import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { removeCommentAction } from '../../redux/post/postActions';

const CommentItem = ({ comment, postId, removeComment, auth }) => {
    const { _id, text, name, avatar, user, date } = comment;

    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user._id}`}>
                    <img className="round-img" src={avatar} alt="" />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{text}</p>
                <p className="post-date">
                    <Moment format="YYYY/MM/DD">{date}</Moment>
                </p>
                {
                    !auth.loading && user === auth.user._id && (
                        <Fragment>
                            <button onClick={e => removeComment(postId, _id)} type="button" className="btn btn-danger">
                                <i className="fas fa-times"></i>
                            </button>
                        </Fragment>
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
    removeComment: (postId, commentId) => dispatch(removeCommentAction(postId, commentId, dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
