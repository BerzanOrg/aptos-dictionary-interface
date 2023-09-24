import { Errors } from "$lib/utils/errors";
import { writable } from "svelte/store";

interface Wallet {
    isConnected: boolean
    address?: string
}

const createWallet = () => {
    const { subscribe, set, update } = writable<Wallet>({
        isConnected: false,
        address: undefined,
    })

    return {
        subscribe,
        connect: async () => {
            if (!window.aptos) throw Errors.WalletNotFound

            try {
                const { address } = await window.aptos.connect()

                set({
                    isConnected: true,
                    address,
                })
            } catch { }

        },
        disconnect: async () => {
            if (!window.aptos) return

            await window.aptos.disconnect()

            set({
                isConnected: false,
                address: undefined,
            })
        },
        signAndSubmit: async (tx: Transaction) => {
            if (!window.aptos) return

            const { chainId } = await window.aptos.getNetwork()

            if (chainId !== '82') throw Errors.CurrentNetworkIsNotDevnet

            return window.aptos.signAndSubmitTransaction(tx)
        },
        onMountCallback: () => {
            if (!window.aptos) return

            window.aptos.onDisconnect(() => {
                set({
                    isConnected: false,
                    address: undefined
                })
            })

            window.aptos.onAccountChange(({ address }) => {
                update(v => ({
                    ...v,
                    address,
                }))
            })
        }
    }
}

export const wallet = createWallet()