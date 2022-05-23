import { useEffect, useState } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOptions';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';
import { pricePerItem } from '../../constants';
import { useOrderDetails } from '../../context/OrderDetails';
import { formatCurrency } from '../../utilities';

export default function Options({ optionType }) {
	const [items, setItems] = useState([]);
	const [error, setError] = useState(false);

	const [orderDetails, updateItemCount] = useOrderDetails();

	// This effect will fail because is asyncronous, the test will run without
	// wait to receive the data
	useEffect(() => {
		// optionType is 'scoops' or 'toopings'
		axios
			.get(`http://localhost:3030/${optionType}`)
			.then(response => setItems(response.data))
			.catch(error => setError(true));
	}, [optionType]);

	// TODO: replace null with ToppingOption when available
	const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

	const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

	if (error) return <AlertBanner />;

	const optionItems = items.map(item => (
		<ItemComponent
			key={item.name}
			name={item.name}
			imagePath={item.imagePath}
			updateItemCount={(itemName, newItemCount) =>
				updateItemCount(itemName, newItemCount, optionType)
			}
		/>
	));

	return (
		<>
			<h2>{title}</h2>
			<p>{formatCurrency(pricePerItem[optionType])} each</p>
			<p>
				{title} total: {orderDetails.totals[optionType]}
			</p>
			<div>{optionItems}</div>;
		</>
	);
}
