import { Auth0Client, type User } from '@auth0/auth0-spa-js';
import { browser } from '$app/environment';

const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN || '';
const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID || '';
const AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE || '';

class AuthStore {
	private client: Auth0Client | null = null;
	isAuthenticated = $state(false);
	isLoading = $state(true);
	user = $state<User | null>(null);
	error = $state<string | null>(null);

	async init(): Promise<void> {
		if (!browser) return;

		if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID) {
			console.warn('Auth0 not configured. Set VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID.');
			this.isLoading = false;
			return;
		}

		try {
			this.client = new Auth0Client({
				domain: AUTH0_DOMAIN,
				clientId: AUTH0_CLIENT_ID,
				authorizationParams: {
					redirect_uri: window.location.origin,
					audience: AUTH0_AUDIENCE || undefined
				},
				cacheLocation: 'localstorage',
				useRefreshTokens: true
			});

			// Handle redirect callback
			if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
				await this.client.handleRedirectCallback();
				window.history.replaceState({}, document.title, window.location.pathname);
			}

			this.isAuthenticated = await this.client.isAuthenticated();

			if (this.isAuthenticated) {
				this.user = (await this.client.getUser()) ?? null;
			}
		} catch (err) {
			console.error('Auth initialization error:', err);
			this.error = err instanceof Error ? err.message : 'Failed to initialize authentication';
		} finally {
			this.isLoading = false;
		}
	}

	async login(): Promise<void> {
		if (!this.client) {
			this.error = 'Auth0 not configured';
			return;
		}

		try {
			await this.client.loginWithRedirect();
		} catch (err) {
			console.error('Login error:', err);
			this.error = err instanceof Error ? err.message : 'Login failed';
		}
	}

	async logout(): Promise<void> {
		if (!this.client) return;

		try {
			await this.client.logout({
				logoutParams: {
					returnTo: window.location.origin
				}
			});
		} catch (err) {
			console.error('Logout error:', err);
			this.error = err instanceof Error ? err.message : 'Logout failed';
		}
	}

	async getAccessToken(): Promise<string | null> {
		if (!this.client || !this.isAuthenticated) return null;

		try {
			const token = await this.client.getTokenSilently();
			return token;
		} catch (err) {
			console.error('Get token error:', err);
			return null;
		}
	}

	clearError(): void {
		this.error = null;
	}
}

export const authStore = new AuthStore();
