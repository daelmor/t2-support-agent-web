class ThemeStore {
	isDark = $state(false);
	private initialized = false;

	init(): void {
		if (this.initialized || typeof window === 'undefined') return;
		this.initialized = true;

		// Check for saved preference or system preference
		const saved = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		this.isDark = saved ? saved === 'dark' : prefersDark;
		this.applyTheme();
	}

	toggle(): void {
		this.isDark = !this.isDark;
		this.applyTheme();
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
		}
	}

	private applyTheme(): void {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.toggle('dark', this.isDark);
		}
	}
}

export const themeStore = new ThemeStore();
