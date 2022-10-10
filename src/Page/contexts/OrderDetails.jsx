import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PricePerItem } from "../../constants";

function formatCurrency(amount){
    return new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount)
}
export const OrderDetails = createContext();

export function useOrderDetails () {
    const context = useContext(OrderDetails);
    if(!context){
        throw new Error('Use order Details must be wrapped in the provider')
    }
    return context;
}
function calculateSubtotal (optionType,optionCounts){
   let OptionCount = 0;
   for (const count of optionCounts[optionType].values()){
         OptionCount+=count
   }
   return OptionCount*PricePerItem[optionType];
}

 export function OrderDetailsProvider (props){

    const [optionCounts,setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map(),
    })
    const zeroCurrency = formatCurrency(0);
    const [totals,setTotals] = useState({
        scoops:zeroCurrency,
        toppings:zeroCurrency,
        grandTotal:zeroCurrency
    })
useEffect(()=>{
const scoopsSubtotal = calculateSubtotal("scoops",optionCounts);
const toppingsSubtotal = calculateSubtotal("toppings",optionCounts);
 const grandTotal = scoopsSubtotal+toppingsSubtotal;
 setTotals({
    scoops:formatCurrency(scoopsSubtotal),
    toppings: formatCurrency(toppingsSubtotal),
    grandTotal:formatCurrency(grandTotal)
 });
},[optionCounts])

 const value = useMemo(()=>{
         function updateItemCounts (itemName, newItemCount, optionType){
         const newOptionCounts = {...optionCounts}

         const optionCountsMap = optionCounts[optionType];
         optionCountsMap.set(itemName,parseInt(newItemCount));

         setOptionCounts(newOptionCounts);
         };

         function resetOrder(){
            setOptionCounts({
                scoops: new Map(),
        toppings: new Map(),
            })
         }
        return [{...optionCounts,totals},updateItemCounts,resetOrder]
    },[optionCounts,totals])
    return <OrderDetails.Provider value={value} {...props}/>
}