import React from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../store'

/**
 * COMPONENT
 */
const SignIn = props => {
  const { name, displayName, handleSubmit, error } = props
  
  return (
    <div>
      <section class="hero is-success is-fullheight">
        <div class="hero-body">
          <div class="container has-text-centered">
            <div class="column is-4 is-offset-4">
              <h3 class="title has-text-black">Login</h3>
              <hr class="login-hr" />
              <p class="subtitle has-text-black">Please login to proceed.</p>
              <div class="box">
                <figure class="avatar">
                  <img src="https://mckeeper.s3.us-east-2.amazonaws.com/mckeeper_logo.png" />
                </figure>
                <form onSubmit={handleSubmit} name={name}>
                  <div class="field">
                    <div class="control">
                    <label htmlFor="username">
                      <input name="username" type="text" class="input is-large" placeholder="Username" autoFocus=""/>
                      </label>
                                </div>
                    </div>

                    <div class="field">
                      <div class="control">
                      <label htmlFor="password">
                        <input class="input is-large" name="password" type="password" placeholder="Your Password"/>
                        </label>
                                </div>
                      </div>
                      <div class="field">
                      </div>
                      <button class="button is-block is-info is-large is-fullwidth">Login <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                        </form>
                  </div>
                  <p class="has-text-grey">
                    <a href="../">Sign Up</a> &nbsp;·&nbsp;
                    <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                    <a href="../">Need Help?</a>
                  </p>
                </div>
              </div>
            </div>
    </section>
        </div>

        )
}

/*
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
          name: 'login',
        displayName: 'Login',
        error: state.auth.error
  }
}

const mapSignup = state => {
  return {
          name: 'signup',
        displayName: 'Sign Up',
        error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
          handleSubmit(evt) {
          evt.preventDefault()
      const formName = evt.target.name
        const username = evt.target.username.value
        const password = evt.target.password.value
        dispatch(authenticate(username, password, formName))
    }
  }
}

        export const LogIn = connect(mapLogin, mapDispatch)(SignIn)
        export const Signup = connect(mapSignup, mapDispatch)(SignIn)

                {/* <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div> */}