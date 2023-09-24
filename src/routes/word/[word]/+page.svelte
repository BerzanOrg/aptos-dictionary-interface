<script lang="ts">
	import { base } from '$app/paths';
	import { contract } from '$lib/stores/contract.js';
	contract;

	export let data;

	$: entries = $contract?.words.get(data.word);
</script>

<main
	class="flex flex-col px-4 pt-2 pb-16 gap-6 bg-green-200 border border-green-300 rounded-lg w-full">
	<a href="{base}/word/{data.word}">
		<h1 class="text-4xl font-bold underline text-green-600">
			{data.word}
		</h1>
	</a>
	<div class="flex flex-col gap-5">
		{#if entries}
			{#each entries as entry}
				<div
					class="flex flex-col bg-green-300 border border-green-400 px-3 pt-1 pb-2 gap-2 rounded-lg">
					<p class="font-semibold">{entry.content}</p>
					<div class="flex justify-end gap-3">
						<div
							class="flex flex-col items-end text-green-600 font-['Inconsolata',mono-space] text-sm font-medium">
							<a href="{base}/author/{entry.author}" class="underline">
								{entry.author}
							</a>
							<p>
								{new Intl.DateTimeFormat('en-UK', {
									dateStyle: 'medium',
									timeStyle: 'short'
								}).format(entry.time)}
							</p>
						</div>
						<img
							src={$contract?.authors.get(entry.author)?.profilePhoto}
							alt="profile photo of author {entry.author}"
							class="h-11 w-11 rounded-full border border-green-500" />
					</div>
				</div>
			{/each}
		{:else}
			<p>There is no entry</p>
		{/if}
	</div>
</main>
