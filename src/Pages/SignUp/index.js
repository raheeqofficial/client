import { useContext, useEffect, useState } from "react";
import Logo from '../../assets/images/logo.jpg';
import { MyContext } from "../../App";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import GoogleImg from '../../assets/images/googleImg.png';
import { postData } from "../../utils/api";
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Confetti from 'react-confetti';
import { v4 as uuidv4 } from 'uuid';

const SignUp = () => {
    const [id, setId] = useState('');
  
    useEffect(() => {
        const newId = `${uuidv4()}${uuidv4()}`;
        setId(newId);
      }, []);
    
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formfields, setFormfields] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        isAdmin: false
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(() => {
        context.setisHeaderFooterShow(false);
    }, []);

    const onchangeInput = (e) => {
        setFormfields(() => ({
            ...formfields,
            [e.target.name]: e.target.value
        }));
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        const re = /^[a-zA-Z](?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;
        return re.test(password);
    };

    const validatePhone = (phone) => {
        const re = /^(\+92|0)3[0-9]{9}$/;
        return re.test(phone);
    };

    const register = (e) => {
        e.preventDefault();
        let hasErrors = false;

        if (formfields.name === "") {
            setErrors(prevState => ({ ...prevState, name: "Name cannot be blank!" }));
            hasErrors = true;
        } else {
            setErrors(prevState => ({ ...prevState, name: "" }));
        }

        if (!validateEmail(formfields.email)) {
            setErrors(prevState => ({ ...prevState, email: "Invalid email format!" }));
            hasErrors = true;
        } else {
            setErrors(prevState => ({ ...prevState, email: "" }));
        }

        if (!validatePhone(formfields.phone)) {
            setErrors(prevState => ({ ...prevState, phone: "Invalid phone number!" }));
            hasErrors = true;
        } else {
            setErrors(prevState => ({ ...prevState, phone: "" }));
        }

        if (!validatePassword(formfields.password)) {
            setErrors(prevState => ({ ...prevState, password: "Password must be at least 8 characters long and contain at least one special character!" }));
            hasErrors = true;
        } else {
            setErrors(prevState => ({ ...prevState, password: "" }));
        }

        if (hasErrors) {
            return;
        }

        setIsLoading(true);

        postData("/api/user/signup", formfields).then((res) => {
            setSubmitted(true);
            if (res.error !== true) {
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "Register Successfully Please verify your account!"
                });
                localStorage.setItem("userEmail", formfields.email);
                setTimeout(() => {
                    setIsLoading(true);
                    history(`/verify/${id}`);
                }, 2000);
            } else {
                setIsLoading(false);
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: res.msg
                });
            }
        }).catch(error => {
            setIsLoading(false);
            console.error('Error posting data:', error);
        });
    };

    return (
        <section className="section signInPage signUpPage">
            <div className="shape-bottom">
                <svg fill="#fff" id="Layer_1" x="0px" y="0px" viewBox="0 0 1921 819.8" style={{ enableBackground: 'new 0 0 1921 819.8' }}>
                    <path class="st0" d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"></path>
                </svg>
            </div>

            <div className="container">
                <div className="box card p-3 shadow border-0">
                    <div className="text-center">
                        <img src={Logo} alt="Logo" />
                    </div>

                    <form className="mt-2" onSubmit={register}>
                        <h2 className="mb-3">Sign Up</h2>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <TextField
                                        label="Name"
                                        name="name"
                                        onChange={onchangeInput}
                                        type="text"
                                        variant="standard"
                                        className="w-100"
                                        error={!!errors.name}
                                        helperText={errors.name}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <TextField
                                        label="Phone No."
                                        name="phone"
                                        onChange={onchangeInput}
                                        type="text"
                                        variant="standard"
                                        className="w-100"
                                        error={!!errors.phone}
                                        helperText={errors.phone}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <TextField
                                id="standard-basic"
                                label="Email"
                                type="email"
                                name="email"
                                onChange={onchangeInput}
                                variant="standard"
                                className="w-100"
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                id="standard-basic"
                                label="Password"
                                name="password"
                                onChange={onchangeInput}
                                type="password"
                                variant="standard"
                                className="w-100"
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                        </div>

                        <a className="border-effect cursor txt">Forgot Password?</a>

                        <div className="d-flex align-items-center mt-3 mb-3">
                            <div className="row w-100">
                                <div className="col-md-6">
                                    <Button type="submit" disabled={isLoading} className="btn-blue w-100 btn-lg btn-big">
                                        {isLoading ? <CircularProgress /> : 'Sign Up'}
                                    </Button>
                                </div>
                                <div className="col-md-6 pr-0">
                                    <Link to="/" className="d-block w-100">
                                        <Button className="btn-lg btn-big w-100" variant="outlined" onClick={() => context.setisHeaderFooterShow(true)}>Cancel</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <p className="txt">Not Registered? <Link to="/signIn" className="border-effect">Sign In</Link></p>

                        <h6 className="mt-4 text-center font-weight-bold">Or continue with social account</h6>

                        <Button className="loginWithGoogle mt-2" variant="outlined"><img src={GoogleImg} alt="Google" /> Sign In with Google</Button>
                        {submitted && (
                            <Confetti
                                width={window.innerWidth}
                                height={window.innerHeight}
                                numberOfPieces={300}
                                recycle={false}
                                run={submitted}
                                confettiSource={{ x: window.innerWidth / 2, y: window.innerHeight / 2, w: 0, h: 0 }}
                            />
                        )}
                    </form>
                </div>
            </div>

        </section>
    );
};

export default SignUp;
