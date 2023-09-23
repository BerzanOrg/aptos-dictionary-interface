<script lang="ts">
	import { authorStore } from '$lib/stores/authorStore';
	import { wordStore } from '$lib/stores/wordStore.js';

	export let data;

	$: entries = $wordStore[data.word];
</script>

<main class="flex flex-col px-4 py-2 gap-6 bg-green-200 border border-green-300 rounded-lg w-full">
	<a href="/word/{data.word}">
		<h1 class="text-4xl font-bold underline">
			{data.word}
		</h1>
	</a>
	<div class="flex flex-col gap-5">
		{#if entries}
			{#each entries as { authorAddress, content }}
				<div
					class="flex flex-col bg-green-300 border border-green-400 px-3 py-1 rounded-lg selection:bg-green-600/50"
				>
					<p class="font-semibold">{content}</p>
					<p class="text-sm self-end font-medium text-green-700">
						Author: <a
							href="/author/{authorAddress}"
							class="underline font-['Inconsolata',mono-space]">{authorAddress}</a
						>
					</p>
				</div>
			{/each}
		{:else}
			<p>There is no entry</p>
		{/if}
	</div>
</main>
