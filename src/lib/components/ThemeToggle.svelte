<script lang="ts">
	import { preferences } from '$lib/stores/preferences.svelte';
	import SunIcon from 'lucide-svelte/icons/sun';
	import MoonIcon from 'lucide-svelte/icons/moon';
	import * as m from '$lib/paraglide/messages.js';

	function toggleTheme() {
		preferences.theme = preferences.theme === 'light' ? 'dark' : 'light';
	}
</script>

<button
	type="button"
	class="btn btn-ghost btn-circle"
	onclick={toggleTheme}
	aria-label={m.aria_toggle_theme()}
>
	{#if preferences.theme === 'light'}
		<MoonIcon size={20} />
	{:else}
		<SunIcon size={20} />
	{/if}
</button>
