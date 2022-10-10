import { render, screen, waitFor } from "@testing-library/react"
import { rest } from "msw";
import { server } from "../../mocks/server";
import { OrderDetailsProvider } from "../contexts/OrderDetails";
import Options from "./Options"
import OrderEntry from "./OrderEntry";

test('displays image for each scoop option from the server',async()=>{
    render (<Options optionType={'scoops'}/>,{wrapper: OrderDetailsProvider})

    const scoopImages = await screen.findAllByRole('img',{name: /scoop$/i})
    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((element)=>element.alt)
    expect(altText).toEqual(['Chocolate scoop','Vanilla scoop']);
})
test('displays image for each topping option from the server',async()=>{
    render (<Options optionType={'toppings'}/>,{wrapper: OrderDetailsProvider})

    const toppingImages = await screen.findAllByRole('img',{name: /topping$/i})
    expect(toppingImages).toHaveLength(4);

    const altText = toppingImages.map((element)=>element.alt)
    expect(altText).toEqual(['M&Ms topping','Hot fudge topping','Peanut butter cups topping',"Cherries topping"]);
})

test('handles error for scoops and toppings routes', async () => {
    server.resetHandlers(
      rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
        res(ctx.status(500))
      )
    );
  
    render(<OrderEntry/>,{wrapper: OrderDetailsProvider});
  
    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert');
      expect(alerts).toHaveLength(2);
    });
  });