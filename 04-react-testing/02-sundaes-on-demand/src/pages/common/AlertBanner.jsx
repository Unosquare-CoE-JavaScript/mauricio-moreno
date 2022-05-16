import Alert from 'react-bootstrap/Alert';

export default function AlertBanner({ message, variant }) {
	const alertMessage =
		message || 'An unexpected error ocurred. Please try it later';

	const alertVariant = variant || 'danger';

	return (
		<Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
			{alertMessage}
		</Alert>
	);
}
