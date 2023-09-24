<script>
	import { base } from '$app/paths';
	import { contract } from '$lib/stores/contract';
	import { wallet } from '$lib/stores/wallet';

	$: author = $wallet.address ? $contract?.authors.get($wallet.address) : undefined;
</script>

<main class="flex flex-col px-4 py-2 bg-green-200 border border-green-300 rounded-lg w-full">
	{#if !$wallet.isConnected}
		<div class="flex items-center justify-center h-full">
			<h1 class="font-bold text-3xl text-green-800">You are not connected.</h1>
		</div>
	{:else if !author}
		<div class="flex items-center justify-center h-full">
			<h1 class="font-bold text-3xl text-green-800">You are not an author.</h1>
		</div>
	{:else}
		<div class="flex flex-col gap-3">
			<h1 class="font-bold text-4xl">Your Profile</h1>
			<!-- svelte-ignore a11y-img-redundant-alt -->

			<div class="flex items-center gap-4">
				<img
					src={author.profilePhoto}
					alt="your profile picture"
					class="h-16 w-16 rounded-full border border-green-900" />
				<a href="{base}/author/{$wallet.address}">
					<h2 class="font-['Inconsolata',mono-space] underline text-green-800">
						{$wallet.address}
					</h2>
				</a>
			</div>
		</div>
	{/if}
</main>
