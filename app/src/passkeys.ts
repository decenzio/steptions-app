import { PasskeyKit, PasskeyServer } from "passkey-kit";
import { clearContractId, clearPasskeyId, saveContractId, savePasskeyId } from "./storage";

export const account = new PasskeyKit({
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!,
    networkPassphrase: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE!,
    walletWasmHash: process.env.NEXT_PUBLIC_WALLET_WASM_HASH!,
    timeoutInSeconds: 30,
})

// Keep server for potential future use, but not required for basic auth
export const server = new PasskeyServer({
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!,
    launchtubeUrl: process.env.NEXT_PUBLIC_LAUNCHTUBE_URL!,
    launchtubeJwt: process.env.NEXT_PUBLIC_LAUNCHTUBE_JWT!,
})

export interface AuthResult {
    success: boolean;
    error?: string;
    contractId?: string;
    keyId?: string;
}

export async function signup(): Promise<AuthResult> {
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

        return {
            success: true,
            contractId,
            keyId: keyIdBase64
        };
    } catch (err: unknown) {
        console.error(err)
       throw `error signing up: ${JSON.stringify(err)}`
    }
}

export async function login(): Promise<AuthResult> {
    console.log('logging in')
    try {
        const { keyIdBase64, contractId } = await account.connectWallet()

        // Store credentials
        savePasskeyId(keyIdBase64)
        saveContractId(contractId)

        return {
            success: true,
            contractId,
            keyId: keyIdBase64
        };
    } catch (err: unknown) {
        console.error(err)
        throw `error logging in: ${JSON.stringify(err)}`
    }
}

export function logout(): void {
    console.log('logging out')
    
    clearPasskeyId()
    clearContractId()
}
