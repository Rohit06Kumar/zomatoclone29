import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../Style/Header.css'
import { withRouter } from 'react-router-dom';

// import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'solid 2px brown'
    }
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            signUpModalIsOpen: false,
            loginModalIsOpen: false,
            signupuserModalIsOpen: false,
            loginuserModalIsOpen: false,
            email: '',
            pwd: '',
            FN: '',
            LN: '',
            isLoggedIn: false,
            loggedInUser: [],
            loggedInUserBool:true
        }
    }

    signUp = () => {
        this.setState({ signUpModalIsOpen: true,loginModalIsOpen: false, signupuserModalIsOpen: false });
    }

    login = () => {
        this.setState({ loginModalIsOpen: true,signUpModalIsOpen: false, signupuserModalIsOpen: false });
    }

    sinedup = () => {
        this.setState({ signUpModalIsOpen: false,signupuserModalIsOpen: true });
    }
    logged = () =>{
        this.setState({ loginModalIsOpen: false,loginuserModalIsOpen: true, signupuserModalIsOpen: false  });
    }

    handleSignupCren = () => {
        this.setState({ signUpModalIsOpen: true, signupuserModalIsOpen: false});
    }

    handleCancleCrent = () => {
        this.setState({ loginuserModalIsOpen: false,  loginModalIsOpen: true });
    }

    handleChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }

    handleSignUp = () => {
        const { email, pwd, FN, LN } = this.state;
        const signUpObj = {
            userName: email,
            pwd: pwd,
            fn: FN,
            ln: LN
        };
        axios({
            method: 'POST',
            url: 'https://nameless-chamber-61301.herokuapp.com/userSignUp',
            headers: { 'Content-Type': 'application/json' },
            data: signUpObj
        })
            .then(response => {
                this.setState({
                    signupuserModalIsOpen: false,
                    email: '',
                    pwd: '',
                    FN: '',
                    LN: ''
                });
                alert(response.data.message);
            })
            .catch(err => console.log(err))
    }

    handleLogin = () => {
        const { email, pwd } = this.state;
        let loginObj = {
            userName:email,
            pwd
        };
        axios({
            method: 'POST',
            url: 'https://nameless-chamber-61301.herokuapp.com/userLogin',
            headers: { 'Content-Type': 'application/json' },
            data: loginObj
        })
            .then(response => {
                if (response.data.userdetails){
                    this.setState({
                        isLoggedIn: true,
                        loginuserModalIsOpen: false,
                        email: '',
                        pwd: '',
                        loggedInUser:response.data.userdetails[0]['firstName']+' '+ response.data.userdetails[0]['lastName'],
                        loggedInUserBool : false
                    });
                }else{
                    alert(response.data.message)
                }    
                // sessionStorage.setItem('isLoggedIn', response.data.isAuthenticated);
            })
            .catch(err => console.log(err))
    }

    handleLogo = () => {
        this.props.history.push('/');
    }

    responseGoogle = (response) => {
        this.setState({ loggedInUser: response.profileObj, isLoggedIn: true, loginModalIsOpen: false,signUpModalIsOpen:false
            ,loggedInUserBool:true });
        console.log(response.profileObj.imageUrl)
    }

    responseFacebook = (response) => {
        this.setState({ loggedInUser: response.name, isLoggedIn: true, loginModalIsOpen: false });
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, loggedInUser: undefined })
    }

    handleModal = (state,value) => {
        this.setState({[state]:value});
    }

    render() {
        const { signUpModalIsOpen, loginModalIsOpen, email, pwd, FN, LN, isLoggedIn, loggedInUser,
            signupuserModalIsOpen, loginuserModalIsOpen, loggedInUserBool } = this.state;
        return (
            <div className="header container-fluid">
                <div className='row'>
                    <div className='col-4'>
                        <div className="s-logo" onClick={this.handleLogo}>
                            <p>e!</p>
                        </div>
                    </div>
                    <div className='col-8'>
                        {!isLoggedIn ? <div className="btn-group login-block">
                        <button onClick={this.login} className='button'>Login</button>
                        <button onClick={this.signUp} className='button'>SignUp</button>
                        </div> : <div className="btn-group login-block" 
                        style={{'width':'100%', 'justifyContent':'end', 'height':'100%','padding':'0','align-items': 'center'}}>
                            {loggedInUserBool ? <div> <span><img src={`${loggedInUser.imageUrl}`} 
                            style={{'height': '25px','width': '25px','border-radius': '50%'}} /></span> <span>{`${loggedInUser.name}`}</span></div>
                            :<span>{`${loggedInUser}`}</span>}
                        <button className="button-2" style={{'marginLeft': '30px','padding':0}} onClick={this.handleLogout}>Logout</button></div>}
                
                    </div>
                </div>
                <Modal

                    style={customStyles}
                    isOpen={signupuserModalIsOpen}
                    id='signuomodal'
                >
                    <div style={{'height':'100%'}}>
                        <section class="vh-100 bg-image"
                        style={{'backgroundImage': "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
                            <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                                <div class="container h-100">
                                <div class="row d-flex justify-content-center align-items-center h-100">
                                    <div class="col-12" style={{'height':'96%'}}>
                                    <div class="kard" style={{'borderRadius': '15px'}}>
                                        <div class="card-body p-5" style={{'height': '100%'}}>
                                        <h2 class="text-uppercase text-center mb-5">Create an account</h2>

                                        <form style={{'height':'100%'}}>
                                            <i class="fa fa-close" onClick={this.handleSignupCren}
                                             style={{'float':'right', 'cursor':'pointer', 'position': 'absolute','top': '38px','right': '79px'}}></i>
                                            <div class="form-outline mb-4">
                                                <div className='row'>
                                                    <div className='col-6'>
                                                        <input type="text" id="form3Example1cg" class="form-control form-control-sm" onChange={(event) => this.handleChange(event, 'FN')} />
                                                        <label class="form-label" for="form3Example1cg">First Name</label>
                                                    </div>
                                                    <div className='col-6'>
                                                        <input type="text" id="form3Example1cg" class="form-control form-control-sm" onChange={(event) => this.handleChange(event, 'LN')} />
                                                        <label class="form-label" for="form3Example1cg">Last Name</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-outline mb-4">
                                            <input type="email" id="form3Example3cg" class="form-control form-control-lg" onChange={(event) => this.handleChange(event, 'email')} />
                                            <label class="form-label" for="form3Example3cg">Your Email</label>
                                            </div>

                                            <div class="form-outline mb-4">
                                            <input type="password" id="form3Example4cg" class="form-control form-control-lg" onChange={(event) => this.handleChange(event, 'pwd')} />
                                            <label class="form-label" for="form3Example4cg">Password</label>
                                            </div>

                                            <div class="form-outline mb-4">
                                            <input type="password" id="form3Example4cdg" class="form-control form-control-lg" />
                                            <label class="form-label" for="form3Example4cdg">Repeat your password</label>
                                            </div>

                                            <div class="form-check d-flex justify-content-center mb-5">
                                            <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                                            <label class="form-check-label" for="form2Example3g">
                                                I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
                                            </label>
                                            </div>

                                            <div class="d-flex justify-content-center">
                                            <button type="button"
                                                class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={this.handleSignUp}>Register</button>
                                            </div>

                                            <p class="text-center text-muted mt-5 mb-0" style={{'cursor':'pointer'}} >Have already an account? <a onClick={this.login}
                                                class="fw-bold text-body"><u>Login here</u></a></p>

                                        </form>

                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </Modal>
                <Modal

                    style={customStyles}
                    isOpen={loginuserModalIsOpen}
                >
                    <div>
                        <i class="fa fa-close" onClick={() => this.handleModal('loginuserModalIsOpen', false)} style={{'float':'right', 'cursor':'pointer'}}></i>
                        <h3>Login User</h3>
                        <div><span>Email : </span><input type="email" onChange={(event) => this.handleChange(event, 'email')} /></div><br />
                        <div><span>Password : </span><input type="password" onChange={(event) => this.handleChange(event, 'pwd')} /></div><br />
                        <button onClick={this.handleLogin} class="btn btn-sm btn-primary">Login</button>
                        <button class="btn btn-sm btn-primary" style={{'marginLeft':'10px'}} onClick={this.handleCancleCrent}>Cancel</button>
                    </div>
                </Modal>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <i class="fa fa-close" onClick={() => this.handleModal('loginModalIsOpen', false)} style={{'float':'right', 'cursor':'pointer'}}></i>
                        <div class="login-heading">Login</div>
                        <div style={{ marginBottom: '2px' }}>
                            <GoogleLogin onClick={() => this.handleModal('loginModalIsOpen', false)}
                                clientId="885022972582-9e9g4jmrh4ssg29bt8om67e1ffcghkaa.apps.googleusercontent.com"
                                buttonText="Continue with Gmail"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                className="btn google"
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        {/* <FacebookLogin
                            appId="1938560389620287"
                            textButton="Continue with Facebook"
                            size="metro"
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="btn-md fb"
                            icon="fa-facebook-square"
                        /> */}
                        <br />
                        <button className="btn normal-login" style={{'border':'1px solid'}} onClick={this.logged} >
                            <span className="glyphicon glyphicon-user user-icon"></span>
                            Login with Credentials</button>
                        <hr />
                        <div>Don't have account? <span style={{ color: 'red', cursor:'pointer' }} onClick={this.signUp}>SignUp</span></div>
                    </div>
                </Modal>
                <Modal
                    isOpen={signUpModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <i class="fa fa-close" onClick={() => this.handleModal('signUpModalIsOpen', false)} style={{'float':'right', 'cursor':'pointer'}}></i>
                        <div class="login-heading">Sign Up</div>
                        <div style={{ marginBottom: '2px' }}>
                            <GoogleLogin onClick={() => this.handleModal('signUpModalIsOpen', false)}
                                clientId="885022972582-9e9g4jmrh4ssg29bt8om67e1ffcghkaa.apps.googleusercontent.com"
                                buttonText="Continue with Gmail"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                className="google"
                                cookiePolicy={'single_host_origin'}
                            />
                        </div> <br />
                        {/* <FacebookLogin
                            appId="1938560389620287"
                            textButton="Continue with Facebook"
                            size="metro"
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="btn-md fb"
                            icon="fa-facebook-square"
                        /> */}
                        <button className="btn normal-login" style={{'border':'1px solid'}} onClick={this.sinedup} >
                            <span className="glyphicon glyphicon-user user-icon"></span>
                            SignUp with Credentials</button>
                        <hr />
                        <div>Already have an account? <span style={{ color: 'red', cursor:'pointer' }} onClick={this.login}>Login</span></div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Header);