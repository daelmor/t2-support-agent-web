import type { ChatRequest, ChatResponse } from '$lib/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

class ApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	async sendMessage(userId: string, message: string): Promise<ChatResponse> {
		const request: ChatRequest = { userId, message };

		const response = await fetch(`${this.baseUrl}/api/Chat`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(request)
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`API Error: ${response.status} - ${errorText || response.statusText}`);
		}

		return response.json();
	}

	async clearHistory(userId: string): Promise<void> {
		const response = await fetch(`${this.baseUrl}/api/Chat/${userId}/history`, {
			method: 'DELETE'
		});

		if (!response.ok) {
			throw new Error(`Failed to clear history: ${response.statusText}`);
		}
	}
}

export const api = new ApiClient();
export default api;
