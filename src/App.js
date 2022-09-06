import React, { Component } from 'react';
import SignIn from './components/signIn/signIn';
import Register from './components/register/register';
import Navigation from './components/nav/nav';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imgLink/imgLink';
import FaceRecognition from './components/face/face';
import Rank from './components/rank/rank';
// import Particles from 'react-particles-js';
import './App.css';

// const particlesOptions = {
//   particles: {
//     number: {
//       value: 85,
//       density: {
//         enable: true,
//         value_area: 800
//       }
//     }
//   }
// }

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signIn',
  signedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor () {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLoc = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
      leftCol: clarifaiFace.left_col * width
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://young-spire-18441.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response) {
          fetch('https://young-spire-18441.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLoc(response))
      })
      .catch(err => console.log(err));    
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ signedIn: true })
    }
    this.setState({route: route});
  }

  render () {
    const { signedIn, imageUrl, route, box } = this.state;
    return (
      <div className='App'>
          {/* <Particles 
            className='particles'
            params={particlesOptions}
          /> */}
          <Navigation signedIn = { signedIn } onRouteChange = { this.onRouteChange }/>
          { route === 'home' 
            ? <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm 
                    onInputChange = {this.onInputChange}
                    onButtonSubmit = {this.onButtonSubmit}/>
                <FaceRecognition
                    box = { box }
                    imageUrl = { imageUrl } />
              </div>
            : ( route === 'signIn' 
                ? <SignIn loadUser={this.loadUser} onRouteChange = { this.onRouteChange } />
                : <Register loadUser={ this.loadUser } onRouteChange = { this.onRouteChange } />
            )}
      </div>
    );
  }
}

export default App;
