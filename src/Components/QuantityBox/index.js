import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";

const QuantityBox = (props) => {

    const [inputVal, setInputVal] = useState(1);
        const [isMinusDisabled, setIsMinusDisabled] = useState(false);
        const [isPlusDisabled, setIsPlusDisabled] = useState(false);

    const context = useContext(MyContext);

    useEffect(() => {
        if (props?.value !== undefined && props?.value !== null && props?.value !== "") {
            setInputVal(parseInt(props?.value))
        }
    }, [props.value])

    const minus = () => {
        if (inputVal !== 1 && inputVal > 0) {
            setInputVal(inputVal - 1);
        }

    }

    const plus = () => {
        setInputVal(inputVal + 1);
    }

    useEffect(() => {
        if (props.quantity) {
            props.quantity(inputVal)
        }

        if (props.selectedItem) {
            props.selectedItem(props.item, inputVal);
        }

        let countInStock = parseInt(props.item.countInStock);
        if(inputVal>countInStock){
            context.setAlertBox({
                open:true,
                error:true,
                msg:"The quantity is greater than product count in stock"
            })
        }else{
            context.setAlertBox({
                open:false,
                error:true,
                msg:"The quantity is greater than product count in stock"
            })
        }
                setIsMinusDisabled(inputVal <= 1);
        setIsPlusDisabled(inputVal >= countInStock);

    }, [inputVal]);

    return (
        <div className='quantityDrop d-flex align-items-center'>
            <Button onClick={minus} disabled={isMinusDisabled}><FaMinus /></Button>
            <input type="text" value={inputVal} />
            <Button onClick={plus} disabled={isPlusDisabled} ><FaPlus /></Button>
        </div>
    )
}

export default QuantityBox;
// import { FaMinus } from "react-icons/fa6";
// import { FaPlus } from "react-icons/fa6";
// import Button from '@mui/material/Button';
// import { useContext, useEffect, useState } from "react";
// import { MyContext } from "../../App";

// const QuantityBox = (props) => {
//     const [inputVal, setInputVal] = useState(1);
//     const [isMinusDisabled, setIsMinusDisabled] = useState(false);
//     const [isPlusDisabled, setIsPlusDisabled] = useState(false);

//     const context = useContext(MyContext);

//     useEffect(() => {
//         if (props?.value !== undefined && props?.value !== null && props?.value !== "") {
//             setInputVal(parseInt(props?.value))
//         }
//     }, [props.value]);

//     const minus = () => {
//         if (inputVal > 1) {
//             setInputVal(inputVal - 1);
//         }
//     };

//     const plus = () => {
//         setInputVal(inputVal + 1);
//     };

//     useEffect(() => {
//         if (props.quantity) {
//             props.quantity(inputVal);
//         }

//         if (props.selectedItem) {
//             props.selectedItem(props.item, inputVal);
//         }

//         const countInStock = parseInt(props.item.countInStock);
//         if (inputVal > countInStock) {
//             context.setAlertBox({
//                 open: true,
//                 error: true,
//                 msg: "The quantity is greater than product count in stock"
//             });
//         } else {
//             context.setAlertBox({
//                 open: false,
//                 error: true,
//                 msg: ""
//             });
//         }

//         setIsMinusDisabled(inputVal <= 1);
//         setIsPlusDisabled(inputVal >= countInStock);

//     }, [inputVal, props.item, props.quantity, props.selectedItem, context]);

//     return (
//         <div className='quantityDrop d-flex align-items-center'>
//             <Button onClick={minus} disabled={isMinusDisabled}><FaMinus /></Button>
//             <input type="text" value={inputVal} readOnly />
//             <Button onClick={plus} disabled={isPlusDisabled}><FaPlus /></Button>
//         </div>
//     );
// };

// export default QuantityBox;
