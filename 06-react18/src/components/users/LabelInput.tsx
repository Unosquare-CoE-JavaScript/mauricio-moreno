import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	value: string;
}

export function LabelInput({ label, value, ...rest }: Props) {
	// const id = useId();
	/* You can use and add to the property id={id} of both tags label and input
  with this you can generate dinamically a same id for both elements */
	return (
		<div className="mb-3">
			<label className="form-label">{label}</label>
			<input className="form-control" value={value} {...rest} />
		</div>
	);
}
