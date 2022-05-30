import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../ErrorFallback';
import { Loading } from '../Loading';
import { AccountDetails } from './AccountDetails';
import { MovieDetails } from './MovieDetails';

interface Props {
	userId: number;
	movieId: number;
}
export function UserDetails({ userId, movieId }: Props) {
	return (
		<div>
			{/* you can also wrap the content in a <SuspenseList revealOrder="together">	 so you can
			coordinate the rendering of every suspense component, BUT this will be added in react 19^ */}
			{/* This suspense allows the user navbar to be even if there is loading data */}
			{/* <Suspense fallback={<Loading />}> */}
			<h4 className="text-center mt-5">User details</h4>
			{/* This is a nested error boundary, when an error happends it finds the first error available
      if there was not this component it will found the root error boundary that
      shows ups something went wrong */}
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<AccountDetails userId={userId} />
			</ErrorBoundary>

			<h4 className="text-center mt-5">Favorite movie</h4>
			{/* Each section has its suspense so each section will load separately */}
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<MovieDetails movieId={movieId} />
			</ErrorBoundary>

			{/* </Suspense> */}
		</div>
	);
}

// Previous to class 13
// export function UserDetails({ userId, movieId }: Props) {
// 	return (
// 		<div>
// 			{/* This suspense allows the user navbar to be even if there is loading data */}
// 			{/* <Suspense fallback={<Loading />}> */}
// 			<h4 className="text-center mt-5">User details</h4>
// 			{/* This is a nested error boundary, when an error happends it finds the first error available
//       if there was not this component it will found the root error boundary that
//       shows ups something went wrong */}
// 			{/* you can also wrap the content in a <SuspenseList revealOrder="together">	 so you can
// 			coordinate the rendering of every suspense component, BUT this will be added in react 19^ */}
// 			<Suspense fallback={<Loading />}>
// 				<ErrorBoundary FallbackComponent={ErrorFallback}>
// 					<AccountDetails userId={userId} />
// 				</ErrorBoundary>
// 			</Suspense>

// 			<h4 className="text-center mt-5">Favorite movie</h4>
// 			{/* Each section has its suspense so each section will load separately */}
// 			<Suspense fallback={<Loading />}>
// 				<ErrorBoundary FallbackComponent={ErrorFallback}>
// 					<MovieDetails movieId={movieId} />
// 				</ErrorBoundary>
// 			</Suspense>

// 			{/* </Suspense> */}
// 		</div>
// 	);
// }
