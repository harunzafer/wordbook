<script lang="ts">
	import { LANGUAGE_NAMES, SUPPORTED_LANGUAGES, type Language } from '$lib/types/language';

	interface Props {
		value: Language;
		onchange?: (lang: Language) => void;
		compact?: boolean;
	}

	let { value = $bindable(), onchange, compact = false }: Props = $props();

	function handleLanguageChange(lang: Language) {
		value = lang;
		if (onchange) {
			onchange(lang);
		}
	}
</script>

<div class="relative">
	<details class="dropdown dropdown-end">
		<summary
			class={compact
				? "btn btn-ghost btn-sm gap-1 min-w-fit pr-0 pl-1"
				: "btn btn-bordered btn-sm gap-1 min-w-fit px-3"}
		>
			<span class="fi fi-{value} text-base"></span>
			<svg class="w-3 h-3 opacity-60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</summary>
		<ul class="absolute top-full mt-2 right-0 menu bg-base-100 rounded-box z-100 w-32 p-2 shadow">
			{#each SUPPORTED_LANGUAGES.filter((lang) => lang !== 'en') as lang (lang)}
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
