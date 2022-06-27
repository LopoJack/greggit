import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';

function Post() {
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {	//need to fix the URL at a later time to redirect to the proper page
            setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, []);

    const addComment = () => {
        axios.post("http://localhost:3001/comments", {
            body: newComment, post_id: id
        },
        {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }
        ).then((response) => {
            if(response.data.error) {
                alert(response.data.error);
            }
            else{
                //console.log("Comment added");
                const commentToAdd = {body: newComment, username: response.data.username};
                setComments([...comments, commentToAdd]);
                setNewComment("");
            }
        });
     };

    return(
        <div className='postPage'>
            <div className='leftSide'>
                <div className='post' id="individual">
                    <div className='title'>{postObject.title}</div>
                    <div className='body'>{postObject.body}</div>
                    <div className='footer'>{postObject.username}</div>
                </div>
            </div>
            <div className='rightSide'>
                <div className='addCommentContainer'>
                    <input type="text" placeholder="comment..." value={newComment} onChange={(event) => {setNewComment(event.target.value)}} />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className='listOfComments'>
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className='comment'>
                                {comment.body}
                                <label>Username: {comment.username}</label>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default Post;