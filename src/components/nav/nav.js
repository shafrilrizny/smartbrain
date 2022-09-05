import React from 'react';
import './nav.css';

const Navigation = ({ onRouteChange, signedIn }) => {
    if (signedIn) {
      return (
          <nav>
            <p onClick = {() => onRouteChange('signOut')} >sign out</p>
          </nav>
    );} else {
      return (
          <nav>
            <p onClick = {() => onRouteChange('signIn')} >sign in</p>
            <p onClick = {() => onRouteChange('register')} >register</p>
          </nav>
    );}
}

export default Navigation;