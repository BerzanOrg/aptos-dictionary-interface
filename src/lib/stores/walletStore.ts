import { writable } from "svelte/store";

export const walletStore = writable<WalletStore>({
    address: null,
    isConnected: false,
    network: null,
})

type WalletStore = {
    address: string | null
    isConnected: boolean
    network: 'Devnet' | 'Unsupported' | null
}