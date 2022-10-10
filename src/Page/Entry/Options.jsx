import axios from '../../axios/lib/axios.js';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ScoopOptions from './ScoopOption';
import ToppingOptions from './ToppingOptions';
import AlertBanner from '../alertBanner';
import { PricePerItem } from '../../constants';
import { useOrderDetails } from '../contexts/OrderDetails';



export default function Options({optionType}){
    const [items,setItems] = useState([])
    const [orderDetails,updateItemCount] = useOrderDetails();
    const [error,setError] = useState(false)
    useEffect(()=>{
        axios.get(`http://localhost:3030/${optionType}`).then((response)=> setItems(response.data)).catch((error)=>
               setError(true))
    },[optionType]);
   
    if (error){
         //@ts-ignore
       return <AlertBanner />
    }

    const ItemComponent = optionType === 'scoops'? ScoopOptions : ToppingOptions;
    const title = optionType[0].toUpperCase()+optionType.slice(1).toLowerCase();

    const optionItems  = items.map((item)=><ItemComponent key={item.name} name={item.name} imagePath={item.imagePath}  updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
    }/>)
    return (
    <>
    <h2>{title}</h2>
    <p>{PricePerItem[optionType]} each</p>
    <p>{title} total: {orderDetails.totals[optionType]}</p>
    < Row>{optionItems}</Row>
    </>)
}
