import React from 'react';
import './signIn.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('https://young-spire-18441.herokuapp.com/signIn', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.id){ 
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
  })
}

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="card center">
        <main className="pa4 black-80">
          <div className="measure">
  
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">sign in</legend>
              <div className="mt3">
                <label 
                    className="db fw6 lh-copy f6" 
                    htmlFor="email-address">e-mail</label>
                <input 
                    className="input-reset inputContainer" 
                    type="email" 
                    name="email-address"  
                    id="email-address" 
                    onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label 
                    className="db fw6 lh-copy f6" 
                    htmlFor="password">password</label>
                <input 
                    className="input-reset inputContainer" 
                    type="password" 
                    name="password"  
                    id="password" 
                    onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
  
            <div className="">
              <input 
                onClick = { this.onSubmitSignIn }
                className="btnSubmit hover-red" 
                type="submit" 
                value="sign in" />
            </div>
            <div className="lh-copy mt3">
              <p 
                  onClick = {() => onRouteChange('register') } 
                  className="f6 link dim black db pointer hover-red "
                  >register here</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;