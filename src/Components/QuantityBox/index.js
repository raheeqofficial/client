import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";

const QuantityBox = (props) => {

    const [inputVal, setInputVal] = useState(1);

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

    }, [inputVal]);

    return (
        <div className='quantityDrop d-flex align-items-center'>
            <Button onClick={minus}><FaMinus /></Button>
            <input type="text" value={inputVal} />
            <Button onClick={plus}><FaPlus /></Button>
        </div>
    )
}

export default QuantityBox;