<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import AutoComplete from './AutoComplete.svelte';
	import LanguageSelector from './LanguageSelector.svelte';
	import { preferences } from '$lib/stores/preferences.svelte';
	import { NO_LANGUAGE_SELECTED } from '$lib/types/language';
	import * as m from '$lib/paraglide/messages.js';

	interface Props {
		fromLang?: string;
		placeholder?: string;
		showTooltip?: boolean;
	}

	let { fromLang = 'en', placeholder = 'Search for a word...', showTooltip = false }: Props = $props();

	let tooltipVisible = $state(false);

	// Determine effective language for autocomplete
	const effectiveLang = $derived(
		preferences.language !== NO_LANGUAGE_SELECTED ? preferences.language : 'es'
	);

	onMount(() => {
		// Show tooltip if enabled and no language is selected (globe icon showing)
		if (showTooltip && preferences.language === NO_LANGUAGE_SELECTED) {
			tooltipVisible = true;
			// Mark as visited
			if (preferences.isFirstVisit()) {
				preferences.markVisited();
			}
			// No auto-hide - stays visible until user selects a language
		}
	});

	function handleSearch(word: string, lang: string) {
		if (word && word.trim()) {
			// Determine the other language (not the suggestion's language)
			const otherLang = lang === 'en' ? effectiveLang : 'en';
			// Navigate to: fromLang-toLang/word
			goto(`/${lang}-${otherLang}/${word.toLowerCase()}`);
		}
	}

	function hideTooltip() {
		tooltipVisible = false;
	}

	function showTooltipIfNeeded() {
		// Show tooltip again if globe is still showing (user didn't select a language)
		if (showTooltip && preferences.language === NO_LANGUAGE_SELECTED) {
			tooltipVisible = true;
		}
	}
</script>

<div class="w-full relative">
	<AutoComplete
		{placeholder}
		{fromLang}
		toLang={effectiveLang}
		onsubmit={handleSearch}
		disabled={preferences.language === NO_LANGUAGE_SELECTED}
	>
		{#snippet languageSelector()}
			<LanguageSelector
				bind:value={preferences.language}
				onchange={hideTooltip}
				onclick={hideTooltip}
				onclose={showTooltipIfNeeded}
				compact={true}
			/>
		{/snippet}
	</AutoComplete>

	{#if tooltipVisible}
		<div
			class="absolute top-full mt-3 right-25 bg-primary text-primary-content px-4 py-2 rounded-lg shadow-lg z-2 whitespace-nowrap opacity-90"
			role="tooltip"
		>
			<div class="flex items-center gap-2">
				<span>👆 {m.tooltip_select_language()}</span>
				<button
					type="button"
					class="btn btn-ghost btn-xs btn-circle"
					onclick={hideTooltip}
					aria-label={m.aria_close_tooltip()}
				>
					✕
				</button>
			</div>
			<!-- Arrow pointing up -->
			<div
				class="absolute bottom-full right-12 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-primary opacity-90"
			></div>
		</div>
	{/if}
</div>
