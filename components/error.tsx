import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	static getDerivedStateFromError(_: Error) {
		// Update state so the next render will show the fallback UI
		return { hasError: true };
	}
	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// You can use your own error logging service here
		console.error('ErrorBoundary caught an error:', error, errorInfo);
	}
	render() {
		if (this.state.hasError) {
			return (
				<div>
					<h2>Oops, there is an error!</h2>
					<button
						type="button"
						onClick={() => this.setState({ hasError: false })}
					>
						Try again?
					</button>
				</div>
			);
		}

		// Return children components in case of no error
		return this.props.children;
	}
}
