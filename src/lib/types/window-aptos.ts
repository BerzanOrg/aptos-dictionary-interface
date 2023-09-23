declare interface Window {
    aptos?: {
        connect: () => Promise<void>
        disconnect: () => Promise<void>
        isConnected: () => Promise<boolean>
        getNetwork: () => Promise<Network>
        getAccount: () => Promise<Account>
        onAccountChange: (callback: (a: Account) => Promise<void>) => void
        onNetworkChange: (callback: (n: Network) => Promise<void>) => void
        onDisconnect: (callback: () => Promise<void>) => void
        signAndSubmitTransaction: (tx: Transaction) => Promise<void>

    }
}

interface Network {
    chainId: "1" | "2" | "81" | string
    name: "Mainnet" | "Testnet" | "Devnet" | string
    url: string
}


interface Account {
    address: string
    publicKey: string
}

interface Transaction {
    arguments: Array<string>
    function: string
    type: string
    type_arguments: string[]
}