import { PasskeyKit, PasskeyServer } from "passkey-kit";

export const account = new PasskeyKit({
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
    networkPassphrase: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE,
    walletWasmHash: process.env.NEXT_PUBLIC_WALLET_WASM_HASH,
    timeoutInSeconds: 30,
})

export const server = new PasskeyServer({
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
    launchtubeUrl: process.env.NEXT_PUBLIC_LAUNCHTUBE_URL,
    launchtubeJwt: process.env.NEXT_PUBLIC_LAUNCHTUBE_JWT,
})

import { clearContractId, clearPasskeyId, saveContractId, savePasskeyId } from "./storage";
export async function signup() {
    console.log('signing up')
    try {
        const { keyIdBase64, contractId, signedTx } = await account.createWallet(
            'SnapChain',
            'user123',
        );

        if (!signedTx) {
            throw 'built transaction missing'
        }

        await server.send(signedTx)

        savePasskeyId(keyIdBase64)
        saveContractId(contractId)

        window.location.reload()
    } catch (err: unknown) {
        console.error(err)

        alert(`error signing up: ${JSON.stringify(err)}`)
    }
}

export async function login() {
    console.log('logging in')
    try {
        const { keyIdBase64, contractId } = await account.connectWallet()

        savePasskeyId(keyIdBase64)
        saveContractId(contractId)

        window.location.reload()
    } catch (err: unknown) {
        console.error(err)

        alert('error logging in');
    }
}

export function logout() {
    console.log('logging out')

    clearPasskeyId()
    clearContractId()

    window.location.reload()
}
