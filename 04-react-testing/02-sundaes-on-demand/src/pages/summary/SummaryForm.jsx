import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const SummaryForm = ({ setOrderPhase }) => {
	const [tcChecked, setTcChecked] = useState(false);

	const handleSubmit = event => {
		event.preventDefault();

		setOrderPhase('completed');
	};

	const popover = <Popover>No ice cream will actually be delivered</Popover>;

	const checkboxLabel = (
		<span>
			I agree to
			<OverlayTrigger placement="right" overlay={popover}>
				<span style={{ color: 'blue' }}>Terms and Conditions </span>
			</OverlayTrigger>
		</span>
	);

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="terms-and-conditions">
					<Form.Check
						type="checkbox"
						checked={tcChecked}
						onChange={event => setTcChecked(event.target.checked)}
						label={checkboxLabel}
					/>
				</Form.Group>
				<Button variant="primary" type="submit" disabled={!tcChecked}>
					Confirm Order
				</Button>
			</Form>
		</div>
	);
};

export default SummaryForm;

// Replace Popover.Content --> Popover.Body
