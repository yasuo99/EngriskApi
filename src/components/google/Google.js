import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
export default class Google extends Component {
    state = {
        isLoggedIn: false,
        googleId: '',
        name: '',
        email: '',
        imageUrl: ''
    }
    responseGoogle = (response) => {
        this.setState({
            isLoggedIn: true,
            googleId: response.profileObj.googleId,
            name: response.profileObj.name,
            email: response.profileObj.email,
            imageUrl: response.profileObj.imageUrl
        })
        console.log(response);
    }
    failureGoogle = (failure) => console.log(failure);
    render() {
        let googleContent;
        if(this.state.isLoggedIn){
            googleContent = (
                <div style={{width: '400px', margin: 'auto', background: '#f4f4f4', padding: '20px'}}>
                    <img src={this.state.imageUrl} alt={this.state.name}/>
                    <h5>Welcome {this.state.name}</h5>
                    <p>Email: {this.state.email}</p>
                </div>
            );
        }
        else{
            googleContent = (
                <GoogleLogin 
                    clientId = "704575261938-i3iiefjaminroc2114rbd02qpjbcgho9.apps.googleusercontent.com"
                    buttonText = "Login With Google"
                    onSuccess = {this.responseGoogle}
                    onFailure = {this.failureGoogle}
                    cookiePolicy = {'single_host_origin'}
                />
            );
        }
        return (
            <div>
                {googleContent}
            </div>
        )
    }
}
