import { useState } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import OrderConfirmation from './confirmation/OrderComfirmation.jsx';
import OrderSummary from '/home/kolimi/sundaes-on-demand/src/Page/Summary/Order-Form.jsx';
import { OrderDetailsProvider } from '/home/kolimi/sundaes-on-demand/src/Page/contexts/OrderDetails.jsx';
import OrderEntry from '/home/kolimi/sundaes-on-demand/src/Page/Entry/OrderEntry.jsx';
 


function App() {
  const [orderPhase,setOrderPhase] = useState("inProgress");

  let Component = OrderEntry;

  switch(orderPhase){
    case "inProgress":
      {Component = OrderEntry;
      break; }
     case "review":
      {Component = OrderSummary;
      break;  }
      case "completed":{
        Component = OrderConfirmation;
        break;
      }
      default:
    }
  return (
  
    <OrderDetailsProvider>
      <Container>
        {<Component setOrderPhase={setOrderPhase}/>}
        </Container>
    </OrderDetailsProvider>
  )
}

export default App;
