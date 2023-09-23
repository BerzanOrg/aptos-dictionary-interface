<script lang="ts">
	import { walletStore } from '$lib/stores/walletStore';

	async function connect() {
		if (!window.aptos) return alert('An Aptos wallet is not found.');

		await window.aptos.connect();

		const { address } = await window.aptos.getAccount();

		const { chainId } = await window.aptos.getNetwork();

		walletStore.set({
			address,
			isConnected: true,
			network: chainId === '81' ? 'Devnet' : 'Unsupported'
		});
	}

	async function disconnect() {
		if (!window.aptos) return alert('An Aptos wallet is not found.');

		await window.aptos.disconnect();

		walletStore.set({
			address: null,
			isConnected: false,
			network: null
		});
	}
</script>

<header
	class="sticky top-0 z-30 flex justify-between items-center h-16 bg-green-300/50 border-b border-green-300 backdrop-blur-sm px-6"
>
	<a href="/" class="text-2xl font-bold">Aptos Dictionary</a>

	{#if $walletStore.isConnected}
		<button
			class="font-bold bg-green-400/60 hover:bg-green-500/60 border border-green-500 px-4 py-1 rounded-full duration-150"
			on:click={disconnect}
		>
			Disconnect
		</button>
	{:else}
		<button
			class="font-bold bg-green-400/60 hover:bg-green-500/60 border border-green-500 px-4 py-1 rounded-full duration-150"
			on:click={connect}
		>
			Connect
		</button>
	{/if}
</header>
