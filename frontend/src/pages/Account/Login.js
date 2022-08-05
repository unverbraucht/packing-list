import React, { useState, useContext } from 'react';

import { useForm } from "react-hook-form";
import { UserContext } from '../../UserContext';

import styles from './Login.module.css';

function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setAccessToken } = useContext(UserContext);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Enter an unique name</p>;
  }

  const onSubmit = (formData) => {
    setError(false);
    setLoading(true);

    fetch('/auth/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then(( { access_token }) => {
      setLoading(false);
      console.log('Success:', access_token);
      sessionStorage.setItem('access_token', access_token)
      setAccessToken(access_token);
    })
    .catch((error) => {
      setLoading(false);
      setError(error);
      console.error('Error:', error);
    });
  }
  //console.log(watch("templateName")); // watch input value by passing the name of it

  return (
    <div className={ styles.loginWrapper }>
      <h3> Login </h3>
      <form onSubmit={handleSubmit(onSubmit)} className={ "field " + styles.loginForm }>
        <input {...register("username", { required: true })} placeholder="username" autoFocus/>
        {errors.username && <span>This field is required</span>}
        <input type="password" {...register("password", { required: true })} placeholder="password"/>
        {errors.password && <span>This field is required</span>}
        <input className={ "button primary small round responsive " + styles.formBtn } type="submit" value="Login" />
        <div> Don't have an account yet? Register <a href="#">here</a> </div>
      </form>
    </div>
  )
}

export default Login;