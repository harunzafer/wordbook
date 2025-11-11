<script lang="ts">
	import { setLocale, locales, getLocale } from '$lib/paraglide/runtime';

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

	function handleLocaleChange(locale: string) {
		setLocale(locale);
	}

	const currentLocale = $derived(getLocale());
	const currentFlag = $derived(LOCALE_TO_FLAG[currentLocale] || 'gb');
</script>

<div class="dropdown dropdown-end">
	<button
		type="button"
		tabindex="0"
		class="btn btn-ghost btn-circle"
		aria-label="Change UI language"
	>
		<span class="fi fi-{currentFlag} text-xl"></span>
	</button>
	<ul
		tabindex="0"
		class="menu dropdown-content bg-base-100 rounded-box z-[1] w-40 p-2 shadow mt-3"
	>
		{#each locales as locale (locale)}
			<li>
				<button
					type="button"
					class:active={locale === getLocale()}
					onclick={() => handleLocaleChange(locale)}
				>
					{LOCALE_NAMES[locale] || locale}
				</button>
			</li>
		{/each}
	</ul>
</div>
