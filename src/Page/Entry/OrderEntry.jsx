import { useState } from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../contexts/OrderDetails";
import Options from "./Options";


export default function OrderEntry({setOrderPhase}){
    const[orderDetails] = useOrderDetails();
    const orderButtonDisable = orderDetails.totals.scoops==="$0.00"
    return (
        <div>
            <h1>Design Your Sundae!!</h1>
            <Options optionType={'scoops'}/>
            <Options optionType={'toppings'}/>
            <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
            <Button onClick={() => setOrderPhase('review')} disabled={orderButtonDisable}>
        Order Sundae!
      </Button>
        </div>
    )
}