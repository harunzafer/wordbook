<script lang="ts">
	import SearchBox from '$lib/components/SearchBox.svelte';
	import * as m from '$lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.site_title()}</title>
	<meta
		name="description"
		content={m.site_description()}
	/>
</svelte:head>

<div class="hero min-h-[60vh] pb-96">
	<div class="hero-content text-center">
		<div class="max-w-md w-full">
			<h1 class="text-5xl font-bold">{m.home_welcome()}</h1>
			<p class="py-6">
				{m.home_description()}
			</p>

			<SearchBox showTooltip={true} />
		</div>
	</div>
</div>

<div class="grid gap-6 md:grid-cols-3">
	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">{m.feature_definitions_title()}</h2>
			<p>{m.feature_definitions_description()}</p>
		</div>
	</div>

	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">{m.feature_examples_title()}</h2>
			<p>{m.feature_examples_description()}</p>
		</div>
	</div>

	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">{m.feature_languages_title()}</h2>
			<p>{m.feature_languages_description()}</p>
		</div>
	</div>
</div>
