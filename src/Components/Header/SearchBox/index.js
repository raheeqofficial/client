import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchDataFromApi } from '../../../utils/api';
import { MyContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import './searchBox.css'

const SearchBox = (props) => {
    const [searchFields, setSearchFields] = useState("");
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const context = useContext(MyContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchFields) {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const res = await fetchDataFromApi(`/api/search?q=${searchFields}`);
                    setOptions(res);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchData();
        } else {
            setOptions([]);
        }
    }, [searchFields]);

    const onChangeValue = (event, newValue) => {
        setSearchFields(newValue);
    };

    const searchProducts = () => {
        if (searchFields !== "") {
            setIsLoading(true);
            fetchDataFromApi(`/api/search?q=${searchFields}`).then((res) => {
                context.setSearchData(res);
                setIsLoading(false);
                props.closeSearch();
                navigate("/search");
            });
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchProducts();
        }
    };

    const handleOptionChange = (event, value) => {
        if (value && value.id) {
            navigate(`/product/${value.staticId}`);
            props.closeSearch();
        }
    };

    return (
        <>
            <div className='headerSearch ml-3 mr-3'>

                <Autocomplete
                    freeSolo
                    options={options}
                    getOptionLabel={(option) => option.name}
                    onInputChange={onChangeValue}
                    onChange={handleOptionChange}
                    renderInput={(params) => (
                        <div className='searchWrapper'>
                            <TextField
                            {...params}
                            placeholder='Search for products...'
                            variant='outlined'
                            fullWidth
                            onKeyDown={handleKeyDown}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {isLoading ? <CircularProgress size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                        <div className='searchIconBox' onClick={searchProducts}>
                            <IoSearch/>
                        </div>
                        </div>
                    )}
                />
                {/* <Button onClick={searchProducts}>
        {isLoading ? <CircularProgress size={24} /> : <IoIosSearch />}
    </Button> */}
            </div>

        </>

    );
};

export default SearchBox;

// import React, { useContext, useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
// import CircularProgress from '@mui/material/CircularProgress';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import { fetchDataFromApi } from '../../../utils/api';
// import { MyContext } from '../../../App';
// import { useNavigate } from 'react-router-dom';
// import { IoSearch } from 'react-icons/io5';
// import './searchBox.css';

// const SearchBox = (props) => {
//     const [searchFields, setSearchFields] = useState("");
//     const [options, setOptions] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     const context = useContext(MyContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (searchFields) {
//             const fetchData = async () => {
//                 setIsLoading(true);
//                 try {
//                     const res = await fetchDataFromApi(`/api/search?q=${searchFields}`);
                    
//                     // Filter out duplicate keywords
//                     const uniqueOptions = [...new Set(res)];
                    
//                     setOptions(uniqueOptions); // Set unique keywords as options
//                 } catch (error) {
//                     console.error('Error fetching data:', error);
//                 } finally {
//                     setIsLoading(false);
//                 }
//             };

//             fetchData();
//         } else {
//             setOptions([]);
//         }
//     }, [searchFields]);

//     const onChangeValue = (event, newValue) => {
//         setSearchFields(newValue);
//     };

//     const searchProducts = () => {
//         if (searchFields !== "") {
//             setIsLoading(true);
//             fetchDataFromApi(`/api/search?q=${searchFields}`).then((res) => {
//                 context.setSearchData(res);
//                 setIsLoading(false);
//                 props.closeSearch();
//                 navigate("/search");
//             });
//         }
//     };

//     const handleKeyDown = (event) => {
//         if (event.key === 'Enter') {
//             event.preventDefault();
//             searchProducts();
//         }
//     };

//     const handleOptionChange = (event, value) => {
//         if (value) {
//             setSearchFields(value);
//             props.closeSearch();
//             navigate(`/search?q=${value}`);
//         }
//     };

//     return (
//         <div className='headerSearch ml-3 mr-3'>
//             <Autocomplete
//                 freeSolo
//                 options={options}
//                 getOptionLabel={(option) => option.name} // Each option is a keyword (string)
//                 onInputChange={onChangeValue}
//                 onChange={handleOptionChange}
//                 renderInput={(params) => (
//                     <div className='searchWrapper'>
//                         <TextField
//                             {...params}
//                             placeholder='Search for products...'
//                             variant='outlined'
//                             fullWidth
//                             onKeyDown={handleKeyDown}
//                             InputProps={{
//                                 ...params.InputProps,
//                                 endAdornment: (
//                                     <>
//                                         {isLoading ? <CircularProgress size={20} /> : null}
//                                         {params.InputProps.endAdornment}
//                                     </>
//                                 ),
//                             }}
//                         />
//                         <div className='searchIconBox' onClick={searchProducts}>
//                             <IoSearch />
//                         </div>
//                     </div>
//                 )}
//             />
//         </div>
//     );
// };

// export default SearchBox;
