<script lang="ts">
	import Keyboard from './Keyboard.svelte';
	import type { Language } from '$lib/types/language';

	interface Props {
		placeholder?: string;
		fromLang?: string;
		toLang?: string;
		onsubmit?: (word: string, lang: string) => void;
		languageSelector?: any;
		disabled?: boolean;
	}

	let {
		placeholder = 'Search...',
		fromLang = 'en',
		toLang = 'fr',
		onsubmit,
		languageSelector,
		disabled = false
	}: Props = $props();

	let inputValue = $state('');
	let inputElement: HTMLInputElement;
	let suggestions = $state<Array<{ word: string; lang: string; ascii?: string }>>([]);
	let highlightIndex = $state<number | null>(null);
	let isLoading = $state(false);
	let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

	const DEBOUNCE_DELAY = 300;
	const MAX_SUGGESTIONS = 10;

	async function fetchSuggestions() {
		if (!inputValue || inputValue.length < 3) {
			suggestions = [];
			highlightIndex = null;
			return;
		}

		isLoading = true;
		try {
			const response = await fetch('/api/suggest', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					prefix: inputValue.toLowerCase(),
					from_lang: fromLang,
					to_lang: toLang
				})
			});

			if (response.ok) {
				const data = await response.json();
				// API returns array directly, not wrapped in object
				suggestions = Array.isArray(data) ? data : [];
				highlightIndex = null;
			}
		} catch (error) {
			console.error('Error fetching suggestions:', error);
			suggestions = [];
		} finally {
			isLoading = false;
		}
	}

	function handleInput() {
		if (debounceTimeout) {
			clearTimeout(debounceTimeout);
		}
		debounceTimeout = setTimeout(fetchSuggestions, DEBOUNCE_DELAY);
	}

	function handleKeydown(e: KeyboardEvent) {
		const limit = Math.min(suggestions.length, MAX_SUGGESTIONS);

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			highlightIndex =
				highlightIndex === null || highlightIndex === limit - 1 ? 0 : highlightIndex + 1;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (highlightIndex === null) return;
			highlightIndex = highlightIndex === 0 ? limit - 1 : highlightIndex - 1;
		} else if (e.key === 'Enter') {
			if (highlightIndex !== null && suggestions[highlightIndex]) {
				e.preventDefault();
				selectSuggestion(suggestions[highlightIndex]);
			}
		} else if (e.key === 'Escape') {
			suggestions = [];
			highlightIndex = null;
		}
	}

	function selectSuggestion(suggestion: { word: string; lang: string; ascii?: string }) {
		inputValue = suggestion.word;
		suggestions = [];
		highlightIndex = null;
		submitValue(suggestion.word, suggestion.lang);
	}

	function submitValue(word?: string, lang?: string) {
		const submittedWord = word || inputValue;
		const submittedLang = lang || fromLang; // Default to fromLang if not provided
		if (submittedWord && onsubmit) {
			onsubmit(submittedWord.toLowerCase(), submittedLang);
		}
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (highlightIndex !== null && suggestions[highlightIndex]) {
			selectSuggestion(suggestions[highlightIndex]);
		} else if (inputValue) {
			submitValue();
		}
	}

	function clearSuggestions() {
		suggestions = [];
		highlightIndex = null;
	}

	function handleCharacterClick(character: string) {
		if (!inputElement) return;

		const start = inputElement.selectionStart ?? inputValue.length;
		const end = inputElement.selectionEnd ?? inputValue.length;

		// Insert character at cursor position
		inputValue = inputValue.slice(0, start) + character + inputValue.slice(end);

		// Restore focus and cursor position after the inserted character
		setTimeout(() => {
			inputElement.focus();
			const newPosition = start + character.length;
			inputElement.setSelectionRange(newPosition, newPosition);
		}, 0);

		handleInput();
	}
</script>

<div class="relative w-full">
	<form class="relative" onsubmit={handleSubmit} autocomplete="off">
		<div class="flex w-full gap-0">
			<label
				class="input-bordered input flex flex-1 items-center gap-0.5 rounded-r-none pr-1 focus-within:border-primary focus-within:outline-none"
			>
				<input
					bind:this={inputElement}
					bind:value={inputValue}
					type="text"
					class="grow focus:outline-none"
					{placeholder}
					autocomplete="off"
					oninput={handleInput}
					onkeydown={handleKeydown}
				/>

				{#if isLoading}
					<span class="loading loading-sm loading-spinner text-primary"></span>
				{/if}

				<!-- Language selector (if provided) -->
				{#if languageSelector}
					{@render languageSelector()}
				{/if}

				<!-- Show keyboard for fromLang if it's not English, otherwise show for toLang -->
				<Keyboard
					lang={(fromLang !== 'en' ? fromLang : toLang) as Language}
					oncharacterclick={handleCharacterClick}
				/>
			</label>

			<button type="submit" class="btn rounded-l-none btn-primary" {disabled}> Translate </button>
		</div>
	</form>

	{#if suggestions.length > 0}
		<ul
			class="dropdown-content menu absolute top-full z-50 mt-2 max-h-90 w-full flex-col overflow-y-auto rounded-box bg-base-100 p-2 shadow"
		>
			{#each suggestions.slice(0, MAX_SUGGESTIONS) as suggestion, i}
				<li>
					<a
						href="#"
						class:active={i === highlightIndex}
						onclick={(e) => {
							e.preventDefault();
							selectSuggestion(suggestion);
						}}
						onmouseenter={() => (highlightIndex = i)}
					>
						<span class="inline-flex w-full items-center gap-2">
							<span class="flex-1 font-semibold">
								{suggestion.word.slice(0, inputValue.length)}<span class="font-normal opacity-60"
									>{suggestion.word.slice(inputValue.length)}</span
								>
							</span>
							<span class="badge badge-outline badge-sm opacity-60"
								>{suggestion.lang.toUpperCase()}</span
							>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<svelte:window
	onclick={(e) => {
		const target = e.target as HTMLElement;
		if (!target.closest('form')) {
			clearSuggestions();
		}
	}}
/>
