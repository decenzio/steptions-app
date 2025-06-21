import { xdr, Address, nativeToScVal, Contract, scValToNative } from '@stellar/stellar-sdk'
import { Server } from '@stellar/stellar-sdk/rpc';
import { truncate } from './utils';

export const rpc = new Server(process.env.NEXT_PUBLIC_RPC_URL!);

export function stellarExpertUrl(address: string): string {
    return address.startsWith('C')
        ? `https://stellar.expert/explorer/${process.env.NEXT_PUBLIC_NETWORK_NAME}/contract/${address}`
        : `https://stellar.expert/explorer/${process.env.NEXT_PUBLIC_NETWORK_NAME}/address/${address}`
}

export function stellarExpertLink(address: string): HTMLAnchorElement {
    const anchor = document.createElement('a');
    anchor.href = stellarExpertUrl(address);
    anchor.target = '_blank';
    anchor.textContent = truncate(address);

    return anchor
}
