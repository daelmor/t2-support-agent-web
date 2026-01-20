import type { ChatRequest, ChatResponse } from '$lib/types';
import { authStore } from '$lib/stores/auth.svelte';

// Use empty string for local dev (proxy via Vite), or explicit URL for production
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

class ApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	private async getAuthHeaders(): Promise<Record<string, string>> {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json'
		};

		const token = await authStore.getAccessToken();
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		return headers;
	}

	async sendMessage(userId: string, message: string): Promise<ChatResponse> {
		const request: ChatRequest = { userId, message };
		const headers = await this.getAuthHeaders();

		const response = await fetch(`${this.baseUrl}/api/Chat`, {
			method: 'POST',
			headers,
			body: JSON.stringify(request)
		});

		if (!response.ok) {
			if (response.status === 401) {
				throw new Error('Please log in to continue');
			}
			const errorText = await response.text();
			throw new Error(`API Error: ${response.status} - ${errorText || response.statusText}`);
		}

		return response.json();
	}

	async clearHistory(userId: string): Promise<void> {
		const headers = await this.getAuthHeaders();

		const response = await fetch(`${this.baseUrl}/api/Chat/${userId}/history`, {
			method: 'DELETE',
			headers
		});

		if (!response.ok) {
			if (response.status === 401) {
				throw new Error('Please log in to continue');
			}
			throw new Error(`Failed to clear history: ${response.statusText}`);
		}
	}
}

export const api = new ApiClient();
export default api;
