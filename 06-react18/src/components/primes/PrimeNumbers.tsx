import { startTransition, useState, useTransition, useCallback } from 'react';
import { CheckNumber } from './CheckNumber';
import { PrimeRange } from './PrimeRange';

const defaultValue = 250;

export function PrimeNumbers() {
	const [maxPrime, setMaxPrime] = useState(defaultValue);
	const values = new Array(maxPrime).fill(null);
	// is pending will return a boolean so you can put loading images to the content that is still loading
	const [isPending, startTransition] = useTransition();

	const handleChange = useCallback(
		value => {
			startTransition(() => setMaxPrime(value));
		},
		[startTransition],
	);

	return (
		<div className="row">
			<h2 className="text-center mt-5">Prime Numbers</h2>
			<PrimeRange
				defaultValue={defaultValue}
				// This will set the rendering of the element as prioritary and so you can optimize the movement
				// of the range while it loads the content of the page
				// onChange={value => startTransition(() => setMaxPrime(value))}
				onChange={handleChange}
			/>

			<div className="row row-cols-auto g-2">
				{values
					.filter((_, index) => index < 10_000)
					.map((_, index) => {
						return (
							<CheckNumber
								key={index}
								value={maxPrime - index}
								isPending={isPending}
							/>
						);
					})}
			</div>
		</div>
	);
}
