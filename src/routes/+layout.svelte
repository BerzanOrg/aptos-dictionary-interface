<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import LeftNavbar from '$lib/components/LeftNavbar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { walletStore } from '$lib/stores/walletStore';

	onMount(async () => {
		if (!window.aptos) return;

		const isConnected = await window.aptos.isConnected();
		if (!isConnected) return;

		const { address } = await window.aptos.getAccount();
		const { chainId } = await window.aptos.getNetwork();

		walletStore.set({
			isConnected,
			address,
			network: chainId === '81' ? 'Devnet' : 'Unsupported'
		});

		window.aptos.onAccountChange(async ({ address }) => {
			console.log('account changed');
			const isConnected = await window.aptos?.isConnected();
			if (!isConnected) return;

			walletStore.set({
				...$walletStore,
				isConnected,
				address
			});
		});

		window.aptos.onNetworkChange(async ({ chainId }) => {
			console.log('netowrk changed', chainId);
			walletStore.set({
				...$walletStore,
				network: chainId === '81' ? 'Devnet' : 'Unsupported'
			});
		});
	});
</script>

<Header />
<div class="flex max-w-6xl mx-auto p-4 gap-4">
	<LeftNavbar />
	<slot />
</div>
<Footer />
