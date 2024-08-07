
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../App';
import { fetchDataFromApi } from '../../../utils/api';
const Navigation = () => {

    const [selected, setSelected] = useState(0)
    const [catData, setCatData] = useState([])
    const [isShow, setIsShow] = useState(true)

    const context = useContext(MyContext);

    useEffect(()=>{
        fetchDataFromApi('/api/category').then((res) => {
            setCatData(res.categoryList)
        })
    },[]);


    return (
        <div className='page-wrapper'>
            <header className='header header-14'>
            <div className="header-bottom sticky-header">
                <div className="container-fluid">
                    <div className="row">
                        {/* <div className="col-auto col-lg-3 col-xl-3 col-xxl-2 header-left" onClick={() => setIsShow(!isShow)}>
                            <div className={`dropdown category-dropdown is-on ${isShow && 'show'}`} data-visible="true">
                                <a href="#" className="dropdown-toggle text-white" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static" title="Browse Categories">
                                    Browse Categories
                                </a>

                                <div className={`dropdown-menu ${isShow && 'show'}`}>
                                    <nav className="side-nav">
                                        <ul className="menu-vertical sf-arrows">
                                            <li className="megamenu-container">
                                                <a className="sf-with-ul" href="#"><i className="icon-laptop"></i>Electronics</a>

                                                <div className="megamenu">
                                                    <div className="row no-gutters">
                                                        <div className="col-md-8">
                                                            <div className="menu-col">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="menu-title">Laptops & Computers</div>
                                                                        <ul>
                                                                            <li><a href="#">Desktop Computers</a></li>
                                                                            <li><a href="#">Monitors</a></li>
                                                                            <li><a href="#">Laptops</a></li>
                                                                            <li><a href="#">iPad & Tablets</a></li>
                                                                            <li><a href="#">Hard Drives & Storage</a></li>
                                                                            <li><a href="#">Printers & Supplies</a></li>
                                                                            <li><a href="#">Computer Accessories</a></li>
                                                                        </ul>

                                                                        <div className="menu-title">TV & Video</div>
                                                                        <ul>
                                                                            <li><a href="#">TVs</a></li>
                                                                            <li><a href="#">Home Audio Speakers</a></li>
                                                                            <li><a href="#">Projectors</a></li>
                                                                            <li><a href="#">Media Streaming Devices</a></li>
                                                                        </ul>
                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <div className="menu-title">Cell Phones</div>
                                                                        <ul>
                                                                            <li><a href="#">Carrier Phones</a></li>
                                                                            <li><a href="#">Unlocked Phones</a></li>
                                                                            <li><a href="#">Phone & Cellphone Cases</a></li>
                                                                            <li><a href="#">Cellphone Chargers </a></li>
                                                                        </ul>

                                                                        <div className="menu-title">Digital Cameras</div>
                                                                        <ul>
                                                                            <li><a href="#">Digital SLR Cameras</a></li>
                                                                            <li><a href="#">Sports & Action Cameras</a></li>
                                                                            <li><a href="#">Camcorders</a></li>
                                                                            <li><a href="#">Camera Lenses</a></li>
                                                                            <li><a href="#">Photo Printer</a></li>
                                                                            <li><a href="#">Digital Memory Cards</a></li>
                                                                            <li><a href="#">Camera Bags, Backpacks & Cases</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <div className="banner banner-overlay">
                                                                <a href="category.html" className="banner banner-menu">
                                                                    <img src="assets/images/demos/demo-13/menu/banner-1.jpg" alt="Banner"/>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="megamenu-container">
                                                <a className="sf-with-ul" href="#"><i className="icon-couch"></i>Furniture</a>

                                                <div className="megamenu">
                                                    <div className="row no-gutters">
                                                        <div className="col-md-8">
                                                            <div className="menu-col">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="menu-title">Bedroom</div>
                                                                        <ul>
                                                                            <li><a href="#">Beds, Frames & Bases</a></li>
                                                                            <li><a href="#">Dressers</a></li>
                                                                            <li><a href="#">Nightstands</a></li>
                                                                            <li><a href="#">Kids' Beds & Headboards</a></li>
                                                                            <li><a href="#">Armoires</a></li>
                                                                        </ul>

                                                                        <div className="menu-title">Living Room</div>
                                                                        <ul>
                                                                            <li><a href="#">Coffee Tables</a></li>
                                                                            <li><a href="#">Chairs</a></li>
                                                                            <li><a href="#">Tables</a></li>
                                                                            <li><a href="#">Futons & Sofa Beds</a></li>
                                                                            <li><a href="#">Cabinets & Chests</a></li>
                                                                        </ul>
                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <div className="menu-title">Office</div>
                                                                        <ul>
                                                                            <li><a href="#">Office Chairs</a></li>
                                                                            <li><a href="#">Desks</a></li>
                                                                            <li><a href="#">Bookcases</a></li>
                                                                            <li><a href="#">File Cabinets</a></li>
                                                                            <li><a href="#">Breakroom Tables</a></li>
                                                                        </ul>

                                                                        <div className="menu-title">Kitchen & Dining</div>
                                                                        <ul>
                                                                            <li><a href="#">Dining Sets</a></li>
                                                                            <li><a href="#">Kitchen Storage Cabinets</a></li>
                                                                            <li><a href="#">Bakers Racks</a></li>
                                                                            <li><a href="#">Dining Chairs</a></li>
                                                                            <li><a href="#">Dining Room Tables</a></li>
                                                                            <li><a href="#">Bar Stools</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <div className="banner banner-overlay">
                                                                <a href="category.html" className="banner banner-menu">
                                                                    <img src="assets/images/demos/demo-13/menu/banner-2.jpg" alt="Banner"/>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="megamenu-container">
                                                <a className="sf-with-ul" href="#"><i className="icon-concierge-bell"></i>Cooking</a>

                                                <div className="megamenu">
                                                    <div className="menu-col">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="menu-title">Cookware</div>
                                                                <ul>
                                                                    <li><a href="#">Cookware Sets</a></li>
                                                                    <li><a href="#">Pans, Griddles & Woks</a></li>
                                                                    <li><a href="#">Pots</a></li>
                                                                    <li><a href="#">Skillets & Grill Pans</a></li>
                                                                    <li><a href="#">Kettles</a></li>
                                                                    <li><a href="#">Soup & Stockpots</a></li>
                                                                </ul>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="menu-title">Dinnerware & Tabletop</div>
                                                                <ul>
                                                                    <li><a href="#">Plates</a></li>
                                                                    <li><a href="#">Cups & Mugs</a></li>
                                                                    <li><a href="#">Trays & Platters</a></li>
                                                                    <li><a href="#">Coffee & Tea Serving</a></li>
                                                                    <li><a href="#">Salt & Pepper Shaker</a></li>
                                                                </ul>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="menu-title">Cooking Appliances</div>
                                                                <ul>
                                                                    <li><a href="#">Microwaves</a></li>
                                                                    <li><a href="#">Coffee Makers</a></li>
                                                                    <li><a href="#">Mixers & Attachments</a></li>
                                                                    <li><a href="#">Slow Cookers</a></li>
                                                                    <li><a href="#">Air Fryers</a></li>
                                                                    <li><a href="#">Toasters & Ovens</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        <div className="row menu-banners">
                                                            <div className="col-md-4">
                                                                <div className="banner">
                                                                    <a href="#">
                                                                        <img src="assets/images/demos/demo-13/menu/1.jpg" alt="image"/>
                                                                    </a>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="banner">
                                                                    <a href="#">
                                                                        <img src="assets/images/demos/demo-13/menu/2.jpg" alt="image"/>
                                                                    </a>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="banner">
                                                                    <a href="#">
                                                                        <img src="assets/images/demos/demo-13/menu/3.jpg" alt="image"/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="megamenu-container">
                                                <a className="sf-with-ul" href="#"><i className="icon-tshirt"></i>Clothing</a>

                                                <div className="megamenu">
                                                    <div className="row no-gutters">
                                                        <div className="col-md-8">
                                                            <div className="menu-col">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="menu-title">Women</div>
                                                                        <ul>
                                                                            <li><a href="#"><strong>New Arrivals</strong></a></li>
                                                                            <li><a href="#"><strong>Best Sellers</strong></a></li>
                                                                            <li><a href="#"><strong>Trending</strong></a></li>
                                                                            <li><a href="#">Clothing</a></li>
                                                                            <li><a href="#">Shoes</a></li>
                                                                            <li><a href="#">Bags</a></li>
                                                                            <li><a href="#">Accessories</a></li>
                                                                            <li><a href="#">Jewlery & Watches</a></li>
                                                                            <li><a href="#"><strong>Sale</strong></a></li>
                                                                        </ul>
                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <div className="menu-title">Men</div>
                                                                        <ul>
                                                                            <li><a href="#"><strong>New Arrivals</strong></a></li>
                                                                            <li><a href="#"><strong>Best Sellers</strong></a></li>
                                                                            <li><a href="#"><strong>Trending</strong></a></li>
                                                                            <li><a href="#">Clothing</a></li>
                                                                            <li><a href="#">Shoes</a></li>
                                                                            <li><a href="#">Bags</a></li>
                                                                            <li><a href="#">Accessories</a></li>
                                                                            <li><a href="#">Jewlery & Watches</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <div className="banner banner-overlay">
                                                                <a href="category.html" className="banner banner-menu">
                                                                    <img src="assets/images/demos/demo-13/menu/banner-3.jpg" alt="Banner"/>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="menu-col menu-brands">
                                                        <div className="row">
                                                            <div className="col-lg-2">
                                                                <a href="#" className="brand">
                                                                    <img src="assets/images/brands/1.png" alt="Brand Name"/>
                                                                </a>
                                                            </div>

                                                            <div className="col-lg-2">
                                                                <a href="#" className="brand">
                                                                    <img src="assets/images/brands/2.png" alt="Brand Name"/>
                                                                </a>
                                                            </div>

                                                            <div className="col-lg-2">
                                                                <a href="#" className="brand">
                                                                    <img src="assets/images/brands/3.png" alt="Brand Name"/>
                                                                </a>
                                                            </div>

                                                            <div className="col-lg-2">
                                                                <a href="#" className="brand">
                                                                    <img src="assets/images/brands/4.png" alt="Brand Name"/>
                                                                </a>
                                                            </div>

                                                            <div className="col-lg-2">
                                                                <a href="#" className="brand">
                                                                    <img src="assets/images/brands/5.png" alt="Brand Name"/>
                                                                </a>
                                                            </div>

                                                            <div className="col-lg-2">
                                                                <a href="#" className="brand">
                                                                    <img src="assets/images/brands/6.png" alt="Brand Name"/>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            {
                                                catData?.length !== 0 && catData?.map((cat, index) =>(
                                                    <li key={index}><Link to={`/products/category/${cat.id}`}><i className="icon-blender"></i>{cat?.name}</Link></li>
                                                ))
                                            }
                                            
                                            <li><a href="#"><i className="icon-heartbeat"></i>Healthy & Beauty</a></li>
                                            <li><a href="#"><i className="icon-shoe-prints"></i>Shoes & Boots</a></li>
                                            <li><a href="#"><i className="icon-map-signs"></i>Travel & Outdoor</a></li>
                                            <li><a href="#"><i className="icon-mobile-alt"></i>Smart Phones</a></li>
                                            <li><a href="#"><i className="icon-tv"></i>TV & Audio</a></li>
                                            <li><a href="#"><i className="icon-shopping-bag"></i>Backpack & Bag</a></li>
                                            <li><a href="#"><i className="icon-music"></i>Musical Instruments</a></li>
                                            <li><a href="#"><i className="icon-gift"></i>Gift Ideas</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div> */}

                        <div className="headerMenu col ">
                            <nav className="main-nav">
                                <ul className="menu sf-arrows">
                                    <li className={`megamenu-container ${selected === 0 && 'active'}`} onClick={()=>setSelected(0)}>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className={`${selected === 1 && 'active'}`} onClick={()=>setSelected(1)}>
                                        <Link to="/shops">Shops</Link>
                                    </li>
                                    <li className={`${selected === 2 && 'active'}`} onClick={()=>setSelected(2)}>
                                        <Link to="/about">About Us</Link>
                                    </li>
                                    <li className={`${selected === 3 && 'active'}`} onClick={()=>setSelected(3)}>
                                        <Link to={'/contact'}>Contact Us</Link>
                                    </li>
                                    {/* <li>
                                        <a href="blog.html" className="sf-with-ul">Blog</a>

                                        <ul>
                                            <li><a href="blog.html">Classic</a></li>
                                            <li><a href="blog-listing.html">Listing</a></li>
                                            <li>
                                                <a href="#">Grid</a>
                                                <ul>
                                                    <li><a href="blog-grid-2cols.html">Grid 2 columns</a></li>
                                                    <li><a href="blog-grid-3cols.html">Grid 3 columns</a></li>
                                                    <li><a href="blog-grid-4cols.html">Grid 4 columns</a></li>
                                                    <li><a href="blog-grid-sidebar.html">Grid sidebar</a></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#">Masonry</a>
                                                <ul>
                                                    <li><a href="blog-masonry-2cols.html">Masonry 2 columns</a></li>
                                                    <li><a href="blog-masonry-3cols.html">Masonry 3 columns</a></li>
                                                    <li><a href="blog-masonry-4cols.html">Masonry 4 columns</a></li>
                                                    <li><a href="blog-masonry-sidebar.html">Masonry sidebar</a></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#">Mask</a>
                                                <ul>
                                                    <li><a href="blog-mask-grid.html">Blog mask grid</a></li>
                                                    <li><a href="blog-mask-masonry.html">Blog mask masonry</a></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#">Single Post</a>
                                                <ul>
                                                    <li><a href="single.html">Default with sidebar</a></li>
                                                    <li><a href="single-fullwidth.html">Fullwidth no sidebar</a></li>
                                                    <li><a href="single-fullwidth-sidebar.html">Fullwidth with sidebar</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="elements-list.html" className="sf-with-ul">Elements</a>

                                        <ul>
                                            <li><a href="elements-products.html">Products</a></li>
                                            <li><a href="elements-typography.html">Typography</a></li>
                                            <li><a href="elements-titles.html">Titles</a></li>
                                            <li><a href="elements-banners.html">Banners</a></li>
                                            <li><a href="elements-product-category.html">Product Category</a></li>
                                            <li><a href="elements-video-banners.html">Video Banners</a></li>
                                            <li><a href="elements-buttons.html">Buttons</a></li>
                                            <li><a href="elements-accordions.html">Accordions</a></li>
                                            <li><a href="elements-tabs.html">Tabs</a></li>
                                            <li><a href="elements-testimonials.html">Testimonials</a></li>
                                            <li><a href="elements-blog-posts.html">Blog Posts</a></li>
                                            <li><a href="elements-portfolio.html">Portfolio</a></li>
                                            <li><a href="elements-cta.html">Call to Action</a></li>
                                            <li><a href="elements-icon-boxes.html">Icon Boxes</a></li>
                                        </ul>
                                    </li> */}
                                </ul>
                            </nav>
                        </div>

                        {/* <div className="col col-lg-3 col-xl-3 col-xxl-2 header-right">
                            <i className="la la-lightbulb-o"></i><p><span>Clearance Up to 30% Off</span></p>
                        </div> */}
                    </div>
                </div>
            </div>
            </header>
        </div>
    )
}

export default Navigation;