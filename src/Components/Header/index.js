import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { IoBagOutline } from "react-icons/io5";
import SearchBox from './SearchBox';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { BiSupport } from "react-icons/bi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { FaClipboardCheck } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft, FaUser } from "react-icons/fa6";
import { Tooltip } from '@mui/material';
import Navigation from './Navigation';
import logo from '../../assets/images/eliph-logo.png'



const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpenNav, setIsOpenNav] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const open = Boolean(anchorEl);

    const headerRef = useRef();
    const context = useContext(MyContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        setAnchorEl(null);
        localStorage.clear();
        context.setIsLogin(false);
        window.location.href = "/signIn"
    }
    useEffect(() => {


        window.addEventListener("scroll", () => {
            let position = window.pageYOffset;
            if (headerRef.current) {
                if (position > 100) {
                    headerRef.current.classList.add('fixed');
                } else {
                    headerRef.current.classList.remove('fixed');
                }
            }

        })
    }, [])


    const openNav = () => {
        setIsOpenNav(!isOpenNav);
        context.setIsOpenNav(true)
    }

    const closeNav = () => {
        setIsOpenNav(false);
        context.setIsOpenNav(false)
    }

    const openSearch = () => {
        setIsOpenSearch(!isOpenSearch);
    }

    const closeSearch = () => {
        setIsOpenSearch(false);
    }

    return (
        <>
        <div className='header-top'>
            <ul>
                <li><Link to={'/become-seller'}>Become a seller</Link></li>
                <li><Link>Become a investor</Link></li>
                <li><Link>Faq</Link></li>
            </ul>
        </div>
            <div  ref={headerRef}>
                <div className="headerWrapper">
                    <header className="header">
                        <div className="container">
                            <div className="row">
                                <div className="logoWrapper d-flex align-items-center">
                                    <Link to={'/'}><img src={logo} alt='Logo' /></Link>
                                    {/* <Link to={'/'}><h1>Raheeq</h1></Link> */}
                                </div>

                                <div className=' d-flex align-items-center part2'>
                                    {/* {
                                        context.countryList.length !== 0 && context.windowWidth > 992 && <CountryDropdown />
                                    } */}
                                    

                                    <div className={`headerSearchWrapper ${isOpenSearch === true && 'open'}`}>
                                        <div className=' d-flex align-items-center'>
                                            <span className="closeSearch mr-3" onClick={() => setIsOpenSearch(false)}><FaAngleLeft /></span>
                                            <SearchBox closeSearch={closeSearch} />
                                        </div>
                                    </div>


                                    <div className='part3 d-flex align-items-center ml-auto'>
                                        {
                                            context.windowWidth < 992 && <Button className="circle mr-3 toggleNav" onClick={openSearch}><IoIosSearch /></Button>
                                        }
                                        
                                        <Link to={'/help-center'}><Button className='circle mr-3'><BiSupport /></Button></Link>
                                        
                                        { context.windowWidth > 768 && (
                                            <>
                                                {
                                            context.isLogin !== true ? <Link to="/signIn"><Button className="circle mr-3"><FaUser /></Button></Link> :
                                                <>
                                                    <Tooltip placement="top" title="Account Setting">
                                                        <Button className='circle loginUser mr-3' onClick={handleClick}>{context.user?.name?.charAt(0)}</Button>
                                                    </Tooltip>
                                                    <Menu
                                                        anchorEl={anchorEl}
                                                        id="accDrop"
                                                        open={open}
                                                        onClose={handleClose}
                                                        onClick={handleClose}

                                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                    >
                                                        <Link to="/account-setting">
                                                            <MenuItem onClick={handleClose}>
                                                                <ListItemIcon>
                                                                    <FaUserAlt fontSize="small" />
                                                                </ListItemIcon>
                                                                My Account
                                                            </MenuItem>
                                                        </Link>
                                                        <Link to="/orders">
                                                            <MenuItem onClick={handleClose}>
                                                                <ListItemIcon>
                                                                    <FaClipboardCheck fontSize="small" />
                                                                </ListItemIcon>
                                                                Orders
                                                            </MenuItem>
                                                        </Link>
                                                        <Link to="/my-list">
                                                            <MenuItem onClick={handleClose}>
                                                                <ListItemIcon>
                                                                    <FaHeart fontSize="small" />
                                                                </ListItemIcon>
                                                                My List
                                                            </MenuItem>
                                                        </Link>
                                                        <MenuItem onClick={logout}>
                                                            <ListItemIcon>
                                                                <RiLogoutCircleRFill fontSize="small" />
                                                            </ListItemIcon>
                                                            Logout
                                                        </MenuItem>
                                                    </Menu>
                                                </>
                                        }
                                            </>
                                        ) }
                                        


                                        <div className='ml-auto cartTab d-flex align-items-center'>
                                           {
                                            context.windowWidth > 768 &&  <div className='position-relative ml-2'>
                                            <Link to="/cart">
                                                <Button className='circle'><IoBagOutline /></Button>
                                                <span className='count d-flex align-items-center justify-content-center'>{context.cartData?.length}</span>
                                            </Link>
                                        </div>
                                           }

                                            {/* {
                                                context.windowWidth < 992 &&
                                                <Button className="circle ml-3 toggleNav" onClick={openNav}><IoMdMenu /></Button>
                                            } */}


                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            </div>
            <Navigation/>
        </>
    )
}

export default Header;