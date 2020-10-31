/**
 * The login route component contains a simple form that checks authentication data via the server.
 */

import React from 'react';
import * as mutations from '../store/mutations';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const LoginComponent = ({ authenticateUser, authenticated }) => (
  <div className='card p-3 col-6'>
    <form onSubmit={authenticateUser}>
      <input
        type='email'
        placeholder='login'
        name='username'
        defaultValue=''
        className='form-control'
        required
      />
      <input
        type='password'
        placeholder='password'
        name='password'
        defaultValue=''
        className='form-control mt-2'
        required
      />
      {authenticated === mutations.NOT_AUTHENTICATED ? (
        <p>Login incorrect.</p>
      ) : null}
      <button
        type='submit'
        disabled={authenticated === `PROCESSING`}
        className='form-control mt-2 btn btn-primary'
      >
        Login
      </button>
    </form>
    <h6>
      <Link to='signup'>
        Вы не зарегистрированы? <strong>Зарегистрироваться.</strong>
      </Link>
    </h6>
  </div>
);

const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(e) {
    e.preventDefault();
    let username = e.target[`username`].value;
    let password = e.target[`password`].value;
    dispatch(mutations.requestAuthenticateUser(username, password));
  },
});

export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
