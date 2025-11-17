<script lang="ts">
	import { setLocale, locales, getLocale, type Locale } from '$lib/paraglide/runtime';

	const LOCALE_NAMES: Record<string, string> = {
		en: 'English',
		fr: 'Français',
		de: 'Deutsch',
		it: 'Italiano',
		pl: 'Polski',
		pt: 'Português',
		es: 'Español',
		tr: 'Türkçe'
	};

	// Map locale codes to flag-icons country codes
	const LOCALE_TO_FLAG: Record<string, string> = {
		en: 'gb', // English -> Great Britain flag
		fr: 'fr',
		de: 'de',
		it: 'it',
		pl: 'pl',
		pt: 'pt',
		es: 'es',
		tr: 'tr'
	};

	function handleLocaleChange(locale: Locale) {
		setLocale(locale);
	}

	const currentLocale = $derived(getLocale());
	const currentFlag = $derived(LOCALE_TO_FLAG[currentLocale] || 'gb');
</script>

<div class="dropdown dropdown-end">
	<div
		tabindex="0"
		role="button"
		class="btn btn-ghost btn-sm gap-1"
		aria-label="Change website language"
		title="Change website language"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
		</svg>
		<span class="fi fi-{currentFlag} text-base"></span>
	</div>
	<ul
		class="menu dropdown-content bg-base-100 rounded-box z-1 w-32 p-2 shadow mt-3"
	>
		{#each locales as locale (locale)}
			<li>
				<button
					type="button"
					class:active={locale === getLocale()}
					onclick={() => handleLocaleChange(locale)}
				>
					<span class="fi fi-{LOCALE_TO_FLAG[locale]}"></span>
					{LOCALE_NAMES[locale] || locale}
				</button>
			</li>
		{/each}
	</ul>
</div>
