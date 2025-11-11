<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import { preferences } from '$lib/stores/preferences.svelte';
	import { browser } from '$app/environment';

	let { children } = $props();

	// Apply theme to document element
	$effect(() => {
		if (browser) {
			document.documentElement.setAttribute('data-theme', preferences.theme);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Wordbook - Online Dictionary</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />

	<main class="flex-1 container mx-auto px-4 py-8">
		{@render children()}
	</main>

	<footer class="footer footer-center bg-base-200 p-10 text-base-content">
		<div class="flex flex-wrap items-center justify-between gap-4 w-full max-w-6xl">
			<p class="text-sm">&copy; 2025 Wordbook. All rights reserved.</p>
			<div class="flex gap-4">
				<a href="/privacy" class="link link-hover text-sm">Privacy Policy</a>
				<a href="/terms" class="link link-hover text-sm">Terms of Service</a>
			</div>
		</div>
	</footer>
</div>
