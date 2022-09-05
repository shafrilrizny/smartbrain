import React from 'react';
import './register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regName: '',
      regEmail: '',
      regPassword: ''
    }
  }

  onNameChange = (event) => {
    this.setState({ regName: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({ regEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({ regPassword: event.target.value})
  }

  onSubmitRegister = () => {
    fetch('https://fierce-harbor-14296.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.regName,
        email: this.state.regEmail,
        password: this.state.regPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
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
            <legend className="f1 fw6 ph0 mh0">register</legend>
            <div className="mt3">
              <label 
                  className="db fw6 lh-copy f6" 
                  htmlFor="email-address">name
              </label>
              <input 
                  className="input-reset inputContainer" 
                  type="text" 
                  name="name"  
                  id="name" 
                  onChange={this.onNameChange}
                />
            </div>
            <div className="mt3">
              <label 
                  className="db fw6 lh-copy f6" 
                  htmlFor="email-address">e-mail
              </label>
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
                  htmlFor="password">password
                </label>
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
              onClick = { this.onSubmitRegister }
              className="btnSubmit hover-red" 
              type="submit" 
              value="register" />
          </div>
      
        </div>
      </main>
    </article>
    );
  }
}

export default Register;

