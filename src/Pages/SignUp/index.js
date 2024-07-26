import React from 'react';
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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Helmet } from 'react-helmet-async';

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

    const [passwordStatus, setPasswordStatus] = useState({
        startsWithLetter: false,
        minLength: false,
        specialChar: false
    });

    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(() => {
        context.setisHeaderFooterShow(false);
    }, []);

    const onchangeInput = (e) => {
        const { name, value } = e.target;
        setFormfields(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === "password") {
            validatePasswordInput(value);
        }
    };

    const validatePasswordInput = (password) => {
        const startsWithLetter = /^[a-zA-Z]/.test(password);
        const minLength = password.length >= 8;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        setPasswordStatus({
            startsWithLetter,
            minLength,
            specialChar
        });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
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

        if (!passwordStatus.startsWithLetter || !passwordStatus.minLength || !passwordStatus.specialChar) {
            setErrors(prevState => ({ ...prevState, password: "Password does not meet the criteria!" }));
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
        <>
        <Helmet>
        <title>SignUp - EliphStore</title>
        
          <meta
            name="description"
            content="Experience the future of online shopping at Eliphstore, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Eliphstore!."
          />
          <meta
            name="keywords"
            content="SignUp, Eliphstore.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Eliphstore.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
           designer collections, seamless online shopping experience "
          />
          <meta property="og:title" content="SignUp - EliphStore" />
        <meta property="og:description" content="This is the signup page of my website." />
        <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "EliphStore",
          "url": "https://www.eliphstore.com/signUp",
          "logo": "https://www.eliphstore.com/logo.png",
          "sameAs": [
            "https://www.facebook.com/eliphstore",
            "https://www.instagram.com/eliphstore"
          ]
        }
        `}
      </script>
        </Helmet>
            <section className="section signInPage signUpPage">
            <div className="shape-bottom">
                <svg fill="#fff" id="Layer_1" x="0px" y="0px" viewBox="0 0 1921 819.8" style={{ enableBackground: 'new 0 0 1921 819.8' }}>
                    <path class="st0" d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"></path>
                </svg>
            </div>

            <div className="container">
                <div className="box card p-3 shadow border-0">
                    {/* <div className="text-center">
                        <img src={Logo} alt="Logo" />
                    </div> */}

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

                        <div className="password-criteria mt-3">
                            <p className={`password-criteria-item ${passwordStatus.startsWithLetter ? 'valid' : 'invalid'}`}>
                                {passwordStatus.startsWithLetter ? <CheckIcon style={{ color: 'green' }} /> : <CloseIcon style={{ color: 'red' }} />} Password starts with a letter
                            </p>
                            <p className={`password-criteria-item ${passwordStatus.minLength ? 'valid' : 'invalid'}`}>
                                {passwordStatus.minLength ? <CheckIcon style={{ color: 'green' }} /> : <CloseIcon style={{ color: 'red' }} />} Password is at least 8 characters long
                            </p>
                            <p className={`password-criteria-item ${passwordStatus.specialChar ? 'valid' : 'invalid'}`}>
                                {passwordStatus.specialChar ? <CheckIcon style={{ color: 'green' }} /> : <CloseIcon style={{ color: 'red' }} />} Password contains a special character
                            </p>
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
        </>
    );
};

export default SignUp;
