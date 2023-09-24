<script lang="ts">
	import { base } from '$app/paths';
	import { contract } from '$lib/stores/contract.js';

	export let data;

	$: authorInfo = $contract?.authors.get(data.authorAddress);
</script>

<main class="flex flex-col px-4 py-2 gap-6 bg-green-200 border border-green-300 rounded-lg w-full">
	<a href="{base}/author/{data.authorAddress}">
		<h1 class="text-4xl font-bold underline">
			{#if authorInfo}
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					src={authorInfo.profilePhoto}
					alt="author profile photo"
					class="h-32 w-32 rounded-full" />
			{:else}
				<p>author does not exist</p>
			{/if}
		</h1>
	</a>
</main>
