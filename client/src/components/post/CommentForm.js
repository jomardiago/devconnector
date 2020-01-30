import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addCommentAction } from '../../redux/post/postActions';

const CommentForm = ({ postId, addComment }) => {
    const [ text, setText ] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        addComment(postId, { text });
        setText('');
    };

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave a comment...</h3>
            </div>
            <form className="form my-1" onSubmit={handleSubmit}>
                <textarea 
                    name="text" 
                    cols="30" 
                    rows="5" 
                    placeholder="Leave a comment" 
                    value={text}
                    onChange={e => setText(e.target.value)} 
                    required 
                />
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addComment: (postId, formData) => dispatch(addCommentAction(postId, formData, dispatch))
});

export default connect(null, mapDispatchToProps)(CommentForm);
