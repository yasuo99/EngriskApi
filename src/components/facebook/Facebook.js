import React, { Component } from 'react'
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { facebookSignIn } from '../../actions/authActions';
class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: '',
        token: ''
    }
    responseFacebook = async (response) => {
        console.log(response);
        if (response.status !== "unknown") {
            this.setState({
                isLoggedIn: true,
                userID: response.userID,
                name: response.name,
                email: response.email,
                picture: response.picture.data.url,
                token: response.accessToken
            });
            const token = {
                token: this.state.token
            };
            await this.props.facebookSignIn(token);
            console.log(response);
        }
    }
    componentClicked = () => console.log('ok');

    render() {
        let fbContent;
        if (this.state.isLoggedIn) {
            fbContent = (
                <div style={{ width: '400px', margin: 'auto', background: '#f4f4f4', padding: '20px' }}>
                    <img src={this.state.picture} alt={this.state.name} />
                    <h2>Welcome {this.state.name}</h2>
                    <p>Email: {this.state.email}</p>
                </div>
            );
        } else {
            fbContent = (<FacebookLogin
                appId="2760969430891401"
                autoLoad={false}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
                icon="fa-facebook"
            />);
        }
        return (
            <div style={{ margin: 'auto' }}>
                {fbContent}
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
        facebookSignIn: (cred) => dispatch(facebookSignIn(cred))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Facebook);