import { readable, writable } from "svelte/store"

export const contract = readable<Contract | null>(null, (set) => {
    setTimeout(() => {
        set(SAMPLE_DATA)
    }, 1000);
})


interface Contract {
    words: Map<string, Entry[]>
    authors: Map<string, Author>
}

interface Entry {
    author: string
    content: string
    time: number
}

interface Author {
    profilePhoto: string
    biography: string
}



const SAMPLE_DATA: Contract = {
    words: new Map([
        ['blockchain', [
            {

                content: 'A blockchain is a distributed ledger with growing lists of records that are securely linked together via cryptographic hashes.',
                author: '0xecc005205fab0f014c5b6ebcdf966dc8a4133b4c47bd5afcdaf7c8853a2e2b3d',
                time: Date.parse('04 May 2023 14:30:10 GMT'),
            },
            {
                content: `Aptos is a blockchain.`,
                author: '0x111e436f0b2aafde60774efb26ccc431cf881b677aca7faaf2a01873bd191311',
                time: Date.parse('05 May 2023 21:00:45 GMT'),
            },
            {
                content: `A blockchain is a distributed database or ledger shared among a computer network's nodes. They are best known for their crucial role in cryptocurrency systems for maintaining a secure and decentralized record of transactions, but they are not limited to cryptocurrency uses. Blockchains can be used to make data in any industry immutable—the term used to describe the inability to be altered.`,
                author: '0x555e436f0b2aafde60774efb26ccc431cf881b677aca7faaf2a01873bd195355',
                time: Date.parse('05 May 2023 23:30:15 GMT'),
            },
        ]]
    ]),
    authors: new Map([
        ['0xecc005205fab0f014c5b6ebcdf966dc8a4133b4c47bd5afcdaf7c8853a2e2b3d', {
            biography: `I'm working for Tesla & SpaceX.`,
            profilePhoto: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.vogel.de%2Funsafe%2F540x0%2Fsmart%2Fimages.vogel.de%2Fvogelonline%2Fbdb%2F1311300%2F1311365%2Foriginal.jpg&f=1&nofb=1&ipt=02b131d6b2da3820b7b8bf89b7a241fa7657641ba9a4eec2ccbcc6c6ff351190&ipo=images'
        }],
        ['0x111e436f0b2aafde60774efb26ccc431cf881b677aca7faaf2a01873bd191311', {
            biography: `Windows has to be activated.`,
            profilePhoto: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F3.bp.blogspot.com%2F_JvNhSOpyWn8%2FSW7YECRaD1I%2FAAAAAAAAAGo%2FGAQDbgCFpxs%2Fs1600%2FBill_Gates_718639.jpg&f=1&nofb=1&ipt=49415ca25d9227abda5552dd82437a3ca2c99fe354a0808ac8de7c398319e4ba&ipo=images'
        }],
        ['0x555e436f0b2aafde60774efb26ccc431cf881b677aca7faaf2a01873bd195355', {
            biography: `Subscribe to Amazon Prime.`,
            profilePhoto: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F6b%2FJeff_Bezos%27_iconic_laugh.jpg%2F340px-Jeff_Bezos%27_iconic_laugh.jpg&f=1&nofb=1&ipt=6c8e20ff23cc9bd10f4206d408c10d09d54c7b5de61bb5d117111a407b41d803&ipo=images'
        }],
    ])
}

