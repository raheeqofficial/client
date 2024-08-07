import React, { useContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdCloudUpload } from "react-icons/io";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { deleteData, deleteImages, editData, fetchDataFromApi, postData, uploadImage } from '../../utils/api';

import { MyContext } from '../../App';
import { Helmet } from 'react-helmet-async';
import EligibleProducts from '../EligibleProducts';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const MyAccount = () => {
    const [isLogin, setIsLogin] = useState(false);
    const history = useNavigate();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const {userId} = JSON.parse(localStorage.getItem("user"));
    const context = useContext(MyContext)
    const [isLoading, setIsLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [previews, setPreviews] = useState([]);
    const [userData, setUserData] = useState([]);
    const formdata = new FormData();
    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        phone: '',
        images: [],
    });

    const [fields, setFields] = useState({
        oldPassword: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        window.scrollTo(0,0)
        const token = localStorage.getItem("token");
        if (token !== "" && token !== undefined && token !== null) {
            setIsLogin(true);
        }
        else {
            history("/signIn");
        }
        deleteData("/api/imageUpload/deleteAllImages");
        const user = JSON.parse(localStorage.getItem("user"));
        fetchDataFromApi(`/api/user/${user?.userId}`).then((res) => {
            setUserData(res);
            setPreviews(res.images);
            setFormFields({
                name: res.name,
                email: res.email,
                phone: res.phone
            })
        });
    }, []);

    const changeInput = (e) => {
        setFormFields(() => (
            {
                ...formFields,
                [e.target.name]: e.target.value
            }
        ))
    }

    const changeInput2 = (e) => {
        setFields(() => (
            {
                ...fields,
                [e.target.name]: e.target.value
            }
        ))
    }



    let img_arr = [];
    let uniqueArray = [];
    let selectedImages = [];

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            setPreviews([]);

            const files = e.target.files;

            console.log(files)
            setUploading(true);

            //const fd = new FormData();
            for (var i = 0; i < files.length; i++) {

                // Validate file type
                if (files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/jpg' || files[i].type === 'image/png' || files[i].type === 'image/webp')) {

                    const file = files[i];
                    selectedImages.push(file)
                    formdata.append(`images`, file);


                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: 'Please select a valid JPG or PNG image file.'
                    });

                    return false;
                }
            }


            formFields.images = selectedImages;
            selectedImages.push(selectedImages)

        } catch (error) {
            console.log(error)
        }

        uploadImage(apiEndPoint, formdata).then((res) => {
            console.log(selectedImages)
            fetchDataFromApi("/api/imageUpload").then((response) => {
                if (response !== undefined && response !== null && response !== "" && response.length !== 0) {

                    response.length !== 0 && response.map((item) => {
                        item?.images.length !== 0 && item?.images?.map((img) => {
                            img_arr.push(img)
                            //console.log(img)
                        })
                    })

                    uniqueArray = img_arr.filter((item, index) => img_arr.indexOf(item) === index);

                    setPreviews([]);

                    const appendedArray = [...previews, ...uniqueArray];

                  

                    setPreviews(uniqueArray);
                    setTimeout(() => {
                        setUploading(false);
                        img_arr = [];
                        context.setAlertBox({
                            open: true,
                            error: false,
                            msg: "Images Uploaded!"
                        })
                    }, 200);

                }

            });

        });


    }
    const edituser = (e) => {
        e.preventDefault();

        const appendedArray = [...previews, ...uniqueArray];

        img_arr = [];
        formdata.append('name', formFields.name);
        formdata.append('email', formFields.email);
        formdata.append('phone', formFields.phone);

        formdata.append('images', appendedArray);

        formFields.images = appendedArray

        if (formFields.name !== "" && formFields.email !== "" && formFields.phone !== "") {
            setIsLoading(true);
            const user = JSON.parse(localStorage.getItem("user"));

            editData(`/api/user/${user?.userId}`, formFields).then((res) => {
                // console.log(res);
                setIsLoading(false);
               
                deleteData("/api/imageUpload/deleteAllImages");

                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "user updated"
                })
            });

        }
        else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Please fill all the details'
            });
            return false;
        }

    }
    const changePassword=(e)=>{
        e.preventDefault();
        formdata.append('password', fields.password);

        if (fields.oldPassword !== "" && fields.password !== "" && fields.confirmPassword !== "") {
            

            if(fields.password !== fields.confirmPassword){
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: 'Password and confirm password not match'
                });
            }
            else{
                const user = JSON.parse(localStorage.getItem("user"));

                const data={
                    name:user?.name,
                    email:user?.email,
                    password:fields.oldPassword,
                    newPass:fields.password,
                    phone:formFields.phone,
                    images:formFields.images
                }
    
            
                editData(`/api/user/changePassword/${user.userId}`,data).then((res)=>{
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: 'Password Change successfully'
                    });
                   
                })
            }
        } else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Please fill all the details'
            });
            return false;
        }
    }
    return (
        <>
        <Helmet>
          <title>Account - EliphStore</title>
          <meta
            name="description"
            content="Experience the future of online shopping at Eliphstore, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Eliphstore!."
          />
          <meta
            name="keywords"
            content="Account, Eliphstore.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Eliphstore.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
           designer collections, seamless online shopping experience "
          />
        </Helmet>
            <section className='section myAccountPage'>
            <div className='container'>
                <h2 className='hd'>My Account</h2>

                <Box sx={{ width: '100%' }} className="myAccBox card border-0">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Edit Profile" {...a11yProps(0)} />
                            <Tab label="Change Password" {...a11yProps(1)} />
                            <Tab label="Review Product" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <form onSubmit={edituser}>
                            <div className='row'>
                                {/* <div className='col-md-4'>
                                    <div className='userImage'>
                                        {
                                            previews?.length !== 0 ? previews?.map((img, index) => {
                                                return (
                                                    <img src={img} key={index} />
                                                )
                                            })

                                            :

                                            <img src={NoUserImg}/>
                                        }
                                        <div className='overlay d-flex align-items-center justify-content-center'>
                                            <IoMdCloudUpload />
                                            <input type="file" multiple onChange={(e) => onChangeFile(e, '/api/user/upload')} name="images" />
                                        </div>
                                    </div>
                                </div> */}


                                <div className='col-md-8'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <TextField label="Name" variant="outlined" className='w-100' name="name" onChange={changeInput} value={formFields.name} />
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <TextField label="Email" disabled variant="outlined" className='w-100' name="email" onChange={changeInput}  value={formFields.email}/>
                                            </div>
                                        </div>


                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <TextField label="Phone" variant="outlined" className='w-100' name="phone" onChange={changeInput}  value={formFields.phone}/>
                                            </div>
                                        </div>


                                    </div>

                                    <div className='form-group'>
                                        <Button type="submit" className='btn-blue bg-red btn-lg btn-big'> Save</Button>
                                    </div>



                                </div>




                            </div>
                        </form>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <form onSubmit={changePassword}>
                            <div className='row'>

                                <div className='col-md-12'>
                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <div className='form-group'>
                                                <TextField label="Old Password" variant="outlined" className='w-100' name="oldPassword" onChange={changeInput2}/>
                                            </div>
                                        </div>

                                        <div className='col-md-4'>
                                            <div className='form-group'>
                                                <TextField label="New password" variant="outlined" className='w-100'name="password"   onChange={changeInput2}/>
                                            </div>
                                        </div>


                                        <div className='col-md-4'>
                                            <div className='form-group'>
                                                <TextField label="Confirm Password" variant="outlined" className='w-100' name="confirmPassword"  onChange={changeInput2}/>
                                            </div>
                                        </div>


                                    </div>

                                    <div className='form-group'>
                                        <Button type="submit" className='btn-blue bg-red btn-lg btn-big'> Save</Button>
                                    </div>



                                </div>




                            </div>
                        </form>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <EligibleProducts customerId={userId}/>
                    </CustomTabPanel>

                </Box>
            </div>
        </section>
        </>
    )
}

export default MyAccount;