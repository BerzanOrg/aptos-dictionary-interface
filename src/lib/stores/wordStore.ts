import { writable } from "svelte/store";



const sampleWords: WordStore = {
    'blockchain': [
        {
            authorAddress: '0xecc005205fab0f014c5b6ebcdf966dc8a4133b4c47bd5afcdaf7c8853a2e2b3d',
            content: 'A blockchain is a distributed ledger with growing lists of records that are securely linked together via cryptographic hashes.'
        },
        {
            authorAddress: '0x111e436f0b2aafde60774efb26ccc431cf881b677aca7faaf2a01873bd19111',
            content: 'Aptos is a blockchain.'
        },
        {
            authorAddress: '0x555e436f0b2aafde60774efb26ccc431cf881b677aca7faaf2a01873bd19555',
            content: `A blockchain is a distributed database or ledger shared among a computer network's nodes. They are best known for their crucial role in cryptocurrency systems for maintaining a secure and decentralized record of transactions, but they are not limited to cryptocurrency uses. Blockchains can be used to make data in any industry immutable—the term used to describe the inability to be altered.`
        },
    ]
}


export const wordStore = writable<WordStore>(sampleWords)

type WordStore = {
    [word in string]?: Array<Entry>
}

type Entry = {
    authorAddress: string
    content: string
}