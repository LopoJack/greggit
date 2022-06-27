import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CreatePost() {

    let navigate = useNavigate();

    const initialValues = {
        title: "",
        body: "",
        username: "",
    };

    const validationSchema = Yup.object().shape({				//create an object with the same fields as DB
        title: Yup.string().required("You must input a title!"),		//these fields will contain the validation and you can include an error message
        body: Yup.string().required("Post body cannot be empty..."),
        username: Yup.string().min(3).max(15).required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
            //console.log("Post created!!!");
            navigate("/");
        });
    };

    return(
        <div className='createPostPage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                <Form className='formContainer'>
                    <label>Title</label>
                    <ErrorMessage name="title" component="span" />
                    <Field id="inputCreatePost" name="title" placeholder="(Ex. Title..."/>

                    <label>Post</label>
                    <ErrorMessage name="body" component="span" />
                    <Field id="inputCreatePost" name="body" placeholder="start typing..."/>

                    <label>Username</label>
                    <ErrorMessage name="username" component="span" />
                    <Field id="inputCreatePost" name="username" placeholder="(Ex. John..."/>

                    <button type="submit">Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}
export default CreatePost;