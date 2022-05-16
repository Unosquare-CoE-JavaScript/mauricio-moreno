import Options from './Options';
import { useOrderDetails } from '../../context/OrderDetails';

export default function OrderEntry({ setOrderPhase }) {
	const [orderDetails] = useOrderDetails();

	const orderDisabled = orderDetails.totals.scoops === '$0.00';

	return (
		<div>
			<h1>Design your sundae!!!</h1>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<h2>Grand total: {orderDetails.totals.grandTotal}</h2>
			<button onClick={() => setOrderPhase('review')} disabled={orderDisabled}>
				Order Sundae
			</button>
		</div>
	);
}
