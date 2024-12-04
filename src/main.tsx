import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';

import App from './app.tsx';
import ErrorBoundaryUi from '@/components/error/error-boundary-ui.tsx';

import { store } from './redux/store.ts';

import './index.css';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<ErrorBoundary FallbackComponent={ErrorBoundaryUi} fallback={undefined}>
				<App />
			</ErrorBoundary>
		</Provider>
	</BrowserRouter>
);
