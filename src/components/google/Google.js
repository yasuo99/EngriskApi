import React, { Component } from 'react'
import { connect } from "react-redux";
import GoogleLogin from 'react-google-login'
import {googleSignIn} from '../../actions/authActions';
class Google extends Component {
    state = {
        isLoggedIn: false,
        googleId: '',
        name: '',
        email: '',
        imageUrl: '',
        token: ''
    }
    responseGoogle = async (response) => {
        this.setState({
            isLoggedIn: true,
            googleId: response.profileObj.googleId,
            name: response.profileObj.name,
            email: response.profileObj.email,
            imageUrl: response.profileObj.imageUrl,
            token: response.tokenId
        });
        const token = {
            token: this.state.token
        }
        await this.props.googleSignIn(token);
        console.log(response);
    }
    failureGoogle = (failure) => console.log(failure);
    render() {
        let googleContent;
        if (this.state.isLoggedIn) {
            googleContent = (
                <div style={{ width: '400px', margin: 'auto', background: '#f4f4f4', padding: '20px' }}>
                    <img src={this.state.imageUrl} alt={this.state.name} />
                    <h5>Welcome {this.state.name}</h5>
                    <p>Email: {this.state.email}</p>
                </div>
            );
        }
        else {
            googleContent = (
                <GoogleLogin
                    clientId="704575261938-i3iiefjaminroc2114rbd02qpjbcgho9.apps.googleusercontent.com"
                    buttonText="Login With Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.failureGoogle}
                    cookiePolicy={'single_host_origin'}
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
const mapStateToProps = (state) => {
    // const uid = state.data.Account.id
    // return {
    //   uid: uid,
    // };
};

const mapDispatchToProps = (dispatch) => {
    return {
        googleSignIn: (cred) => dispatch(googleSignIn(cred)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Google);