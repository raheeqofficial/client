import Button from '@mui/material/Button';
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { FaAngleRight } from "react-icons/fa6";
import { MyContext } from '../../../App';



const Navigation = () => {

    const [isopenSidebarVal, setisopenSidebarVal] = useState(false);
    const [isOpenNav, setIsOpenNav] = useState(false);
    const [selected, setSelected] = useState(0)

    const context = useContext(MyContext);

    // useEffect(()=>{
    //     setIsOpenNav(props.isOpenNav)
    // },[props.isOpenNav]);


    return (
        <nav className='navigation-nav'>
            {/* <div className='container'>

                <div className='row'> */}
                    {/* <div className='col-sm-2 navPart1 '>
                        <div className='catWrapper'>
                            <Button className='allCatTab align-items-center res-hide' onClick={() => setisopenSidebarVal(!isopenSidebarVal)}>
                                <span className='icon1 mr-2'><IoIosMenu /></span>
                                <span className="text">ALL CATEGORIES</span>
                                <span className='icon2  ml-2'><FaAngleDown /></span>
                            </Button>

                            <div className={`sidebarNav ${isopenSidebarVal === true ? 'open' : ''}`}>
                                <ul>
                                    {
                                        context.subCategoryData?.length !== 0 && context.subCategoryData?.map((item, index) => {
                                            return (
                                                <li>
                                                    <Link to={`/products/subCat/${item?.id}`}><Button>{item?.subCat} <FaAngleRight className='ml-auto' /></Button></Link>

                                                </li>
                                            )
                                        })
                                    }

                                 
                                    
                                   
                                </ul>
                            </div>
                        </div>
                    </div> */}

                    <div className={`navPart2 d-flex align-items-center`}>
                        <div className="res-nav-overlay"></div>
                        <ul className='list list-inline mb-0'>
                            <li className={`list-inline-item ${selected === 0 && 'selected'}`} onClick={() => setSelected(0)}><Link to="/"><Button>Home</Button></Link></li>
                            <li className={`list-inline-item ${selected === 1 && 'selected'}`} onClick={() => setSelected(1)}>
                                <Link to={`/shops`} ><Button>Shops</Button></Link>

                            </li>
                            <li className={`list-inline-item ${selected === 2 && 'selected'}`} onClick={() => setSelected(2)}>
                                <Link to={`/contact`}><Button>Contact Us</Button></Link>

                            </li>
                            <li className={`list-inline-item ${selected === 3 && 'selected'}`} onClick={() => setSelected(3)}>
                                <Link to={`/about`}><Button>About Us</Button></Link>

                            </li>
                        </ul>
                    </div>

                {/* </div>
            </div> */}
        </nav >
    )
}

export default Navigation;