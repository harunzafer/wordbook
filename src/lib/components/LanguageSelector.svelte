<script lang="ts">
	import { LANGUAGE_NAMES, TRANSLATION_LANGUAGES, type TranslationLanguage, NO_LANGUAGE_SELECTED } from '$lib/types/language';
	import { Globe } from 'lucide-svelte';

	interface Props {
		value: TranslationLanguage | typeof NO_LANGUAGE_SELECTED;
		onchange?: (lang: TranslationLanguage) => void;
		onclick?: () => void;
		onclose?: () => void;
		compact?: boolean;
	}

	let { value = $bindable(), onchange, onclick, onclose, compact = false }: Props = $props();
	let detailsElement: HTMLDetailsElement | undefined = $state();

	function handleLanguageChange(lang: TranslationLanguage) {
		value = lang;
		if (onchange) {
			onchange(lang);
		}
	}

	// Watch for dropdown close events
	$effect(() => {
		if (!detailsElement) return;

		const handleToggle = () => {
			// If dropdown is closed (not open) and still showing globe, trigger onclose
			if (!detailsElement?.open && value === NO_LANGUAGE_SELECTED && onclose) {
				onclose();
			}
		};

		detailsElement.addEventListener('toggle', handleToggle);
		return () => detailsElement?.removeEventListener('toggle', handleToggle);
	});
</script>

<div class="relative">
	<details class="dropdown dropdown-end" bind:this={detailsElement}>
		<summary
			class={compact
				? "btn btn-ghost btn-sm gap-1 min-w-fit pr-0 pl-1"
				: "btn btn-bordered btn-sm gap-1 min-w-fit px-3"}
			onclick={() => onclick?.()}
		>
			{#if value === NO_LANGUAGE_SELECTED}
				<Globe class="w-4 h-4" />
			{:else}
				<span class="fi fi-{value} text-base"></span>
			{/if}
			<svg class="w-3 h-3 opacity-60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</summary>
		<ul class="absolute top-full mt-2 right-0 menu bg-base-100 rounded-box z-100 w-32 p-2 shadow">
			{#each TRANSLATION_LANGUAGES as lang (lang)}
				<li>
					<button
						type="button"
						onclick={(e) => {
							handleLanguageChange(lang);
							e.currentTarget.closest('details')?.removeAttribute('open');
						}}
					>
						<span class="fi fi-{lang}"></span>
						{LANGUAGE_NAMES[lang]}
					</button>
				</li>
			{/each}
		</ul>
	</details>
</div>
