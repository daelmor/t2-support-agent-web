import { api } from '$lib/api/client';
import type { Message, Conversation } from '$lib/types';

function generateId(): string {
	return Math.random().toString(36).substring(2, 15);
}

function generateUserId(): string {
	const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('userId') : null;
	if (stored) return stored;

	const newId = `user_${generateId()}`;
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('userId', newId);
	}
	return newId;
}

class ChatStore {
	messages = $state<Message[]>([]);
	isLoading = $state(false);
	error = $state<string | null>(null);
	userId = $state(generateUserId());
	conversations = $state<Conversation[]>([]);
	currentConversationId = $state<string | null>(null);

	async sendMessage(content: string): Promise<void> {
		if (!content.trim() || this.isLoading) return;

		this.error = null;

		// Add user message
		const userMessage: Message = {
			id: generateId(),
			role: 'user',
			content: content.trim(),
			timestamp: new Date()
		};
		this.messages = [...this.messages, userMessage];

		// Add placeholder for assistant response
		const assistantMessage: Message = {
			id: generateId(),
			role: 'assistant',
			content: '',
			timestamp: new Date(),
			isStreaming: true
		};
		this.messages = [...this.messages, assistantMessage];

		this.isLoading = true;

		try {
			const response = await api.sendMessage(this.userId, content);

			// Update assistant message with response
			this.messages = this.messages.map((msg) =>
				msg.id === assistantMessage.id
					? { ...msg, content: response.message, isStreaming: false }
					: msg
			);
		} catch (err) {
			this.error = err instanceof Error ? err.message : 'An unexpected error occurred';
			// Remove the placeholder message on error
			this.messages = this.messages.filter((msg) => msg.id !== assistantMessage.id);
		} finally {
			this.isLoading = false;
		}
	}

	async clearHistory(): Promise<void> {
		try {
			await api.clearHistory(this.userId);
			this.messages = [];
			this.error = null;
		} catch (err) {
			this.error = err instanceof Error ? err.message : 'Failed to clear history';
		}
	}

	clearError(): void {
		this.error = null;
	}

	newConversation(): void {
		// Save current conversation if it has messages
		if (this.messages.length > 0) {
			const conversation: Conversation = {
				id: this.currentConversationId || generateId(),
				title: this.messages[0]?.content.substring(0, 50) || 'New conversation',
				messages: [...this.messages],
				createdAt: this.messages[0]?.timestamp || new Date(),
				updatedAt: new Date()
			};

			const existingIndex = this.conversations.findIndex((c) => c.id === conversation.id);
			if (existingIndex >= 0) {
				this.conversations[existingIndex] = conversation;
			} else {
				this.conversations = [conversation, ...this.conversations];
			}
		}

		// Start fresh
		this.messages = [];
		this.currentConversationId = generateId();
		this.error = null;
	}

	loadConversation(conversationId: string): void {
		const conversation = this.conversations.find((c) => c.id === conversationId);
		if (conversation) {
			this.messages = [...conversation.messages];
			this.currentConversationId = conversationId;
			this.error = null;
		}
	}
}

export const chatStore = new ChatStore();
