import { Form } from 'react-bootstrap';

export default function ToppingOption({ name, imagePath, updateItemCount }) {
	return (
		<div>
			<img
				style={{ width: '75%' }}
				src={`http://localhost:3030${imagePath}`}
				alt={`${name} topping`}
			/>
			<Form.Group controlId={`${name}-topping-checkbox`}>
				<Form.Check
					type="checkbox"
					onChange={event =>
						updateItemCount(name, event.target.checked ? 1 : 0)
					}
					label={name}
				></Form.Check>
			</Form.Group>
		</div>
	);
}
