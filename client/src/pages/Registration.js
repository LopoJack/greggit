import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Registration() {

    let navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("Username is required..."),
        password: Yup.string().min(4).max(20).required("Password is required..."),
    });

    const onSubmit = (data) => {
        //Todo check if user already exists
        axios.post("http://localhost:3001/auth", data).then((response) => {
            console.log(data);
            if(response.data.error){
                alert(response.data.error);
            }
            else{
                alert(response.data);
                navigate("/");
            }
            
        });
    };

    return(
        <div className='registerPage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <label>Username:</label>
                    <ErrorMessage name="username" component="span" />
                    <Field id="inputCreatePost" name="username" placeholder="(Ex. John123...)"/>

                    <label>Password:</label>
                    <ErrorMessage name="password" component="span" />
                    <Field type="password" id="inputCreatePost" name="password" placeholder="Password..."/>

                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Registration;