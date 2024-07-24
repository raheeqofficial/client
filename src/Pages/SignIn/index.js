import { useContext, useEffect, useState } from "react";
import Logo from '../../assets/images/logo.jpg';
import { MyContext } from "../../App";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import GoogleImg from '../../assets/images/googleImg.png';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from "../../utils/api";
import Confetti from 'react-confetti';
import { Helmet } from "react-helmet-async";

const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(MyContext);
    const history = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
        context.setisHeaderFooterShow(false);
    }, []);

    const [formfields, setFormfields] = useState({
        email: "",
        password: ""
    })


    const onchangeInput = (e) => {
        setFormfields(() => ({
            ...formfields,
            [e.target.name]: e.target.value
        }))
    }


    const login = (e) => {
        e.preventDefault();
        if (formfields.email === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "email can not be blank!"
            })
            return false;
        }
        if (formfields.password === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "password can not be blank!"
            })
            return false;
        }
        setIsLoading(true);
        postData("/api/user/signin", formfields).then((res) => {
            try {

                if (res.error !== true) {
                    localStorage.setItem("token", res.token);

                    const user = {
                        name: res.user?.name,
                        email: res.user?.email,
                        userId: res.user?.id
                    }

                    localStorage.setItem("user", JSON.stringify(user));
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "User Login Successfully!"
                    });
                    setSubmitted(true);
                    setTimeout(() => {
                        setIsLoading(false);

                        window.location.href = "/";
                    }, 2000);
                }

                else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res.msg
                    });
                    setIsLoading(false);
                }

            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }

        })
    }


    return (
        <>
        <Helmet>
        <title>SignIn - EliphStore</title>
        
          <meta
            name="description"
            content="Experience the future of online shopping at Eliphstore, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Eliphstore!."
          />
          <meta
            name="keywords"
            content="SignIn, Eliphstore.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Eliphstore.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
           designer collections, seamless online shopping experience "
          />
        </Helmet>
            <section className="section signInPage">
            <div className="shape-bottom"> <svg fill="#fff" id="Layer_1" x="0px" y="0px" viewBox="0 0 1921 819.8" style={{ enableBackground: 'new 0 0 1921 819.8' }} > <path class="st0" d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"></path> </svg>
            </div>

            <div className="container">
                <div className="box card p-3 shadow border-0">
                    {/* <div className="text-center">
                        <img src={Logo} />
                        <h1 className="mb-0">Raheeq</h1>
                    </div> */}


                    <form className="mt-3" onSubmit={login}>
                        <h2 className="mb-4">Sign In</h2>

                        <div className="form-group">
                            <TextField id="standard-basic" label="Email" type="email" required variant="standard" className="w-100" name="email" onChange={onchangeInput} />
                        </div>
                        <div className="form-group">
                            <TextField id="standard-basic" label="Password" type="password" required variant="standard" className="w-100" name="password" onChange={onchangeInput} />
                        </div>



                        <a className="border-effect cursor txt">Forgot Password?</a>

                        <div className="d-flex align-items-center mt-3 mb-3 ">
                            <Button type="submit" className="btn-blue col btn-lg btn-big">
                                {
                                    isLoading === true ? <CircularProgress /> : 'Sign In'
                                }
                            </Button>
                            <Link to="/"> <Button className="btn-lg btn-big col ml-3" variant="outlined" onClick={() => context.setisHeaderFooterShow(true)}>Cancel</Button></Link>
                        </div>

                        <p className="txt">Not Registered? <Link to="/signUp" className="border-effect">Sign Up</Link></p>

                        <h6 className="mt-4 text-center font-weight-bold">Or continue with social account</h6>

                        <Button className="loginWithGoogle mt-2" variant="outlined"><img src={GoogleImg} /> Sign In with Google</Button>
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

    )
}

export default SignIn;