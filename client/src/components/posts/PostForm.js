import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addPostAction } from '../../redux/post/postActions';

const PostForm = ({ addPost }) => {
    const [ text, setText ] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        addPost({ text });
        setText('');
    };

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={handleSubmit}>
                <textarea 
                    name="text" 
                    cols="30" 
                    rows="5" 
                    placeholder="Create a post" 
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
    addPost: formData => dispatch(addPostAction(formData, dispatch))
});

export default connect(null, mapDispatchToProps)(PostForm);
