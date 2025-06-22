import { account, server } from "./passkeys";
import { Client as SteptionsClient } from "../../stellar-hack-Pera-2025/bindings/src";
import type { u64, i128 } from '@stellar/stellar-sdk/contract';

// Initialize the contract client - you'll need to set these environment variables
const steptionsClient = new SteptionsClient({
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!,
    contractId: process.env.NEXT_PUBLIC_STEPTIONS_CONTRACT_ID!,
    networkPassphrase: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE!,
});

export interface LiquidityResult {
    success: boolean;
    lpShares?: string;
    transactionHash?: string;
    error?: string;
}

/**
 * Provide liquidity to a specific pool using passkey authentication
 * @param poolId - The ID of the pool to provide liquidity to
 * @param provider - The provider's contract address (from passkey wallet)
 * @param amount - The amount of liquidity to provide (as string to avoid precision issues)
 * @param keyId - The passkey ID for signing
 */
export async function provideLiquidity(
    poolId: u64,
    provider: string,
    amount: string,
    keyId: string
): Promise<LiquidityResult> {
    try {
        console.log(`Providing liquidity: pool=${poolId}, provider=${provider}, amount=${amount}`);

        // Ensure wallet is connected
        if (!account.wallet?.options) {
            await account.connectWallet({ keyId });
        }

        // Convert amount string to i128 format expected by contract
        const liquidityAmount = BigInt(amount) as i128;

        // Call the provide_liquidity contract method to build the transaction
        const assembledTx = await steptionsClient.provide_liquidity({
            pool_id: poolId,
            provider: provider,
            amount: liquidityAmount
        });

        // Sign the transaction using the passkey
        const signedTx = await account.sign(assembledTx.built!, { keyId });

        // Submit the transaction
        const result = await server.send(signedTx);

        // Extract LP shares from simulation result
        const lpShares = assembledTx.result?.toString() || "0";

        return {
            success: true,
            lpShares,
            transactionHash: result.hash
        };

    } catch (error: unknown) {
        console.error('Error providing liquidity:', error);
        return {
            success: false,
            error: `Failed to provide liquidity: ${JSON.stringify(error)}`
        };
    }
}

/**
 * Withdraw liquidity from a specific pool
 */
export async function withdrawLiquidity(
    poolId: u64,
    provider: string,
    shareAmount: string,
    keyId: string
): Promise<LiquidityResult> {
    try {
        console.log(`Withdrawing liquidity: pool=${poolId}, provider=${provider}, shares=${shareAmount}`);

        if (!account.wallet?.options) {
            await account.connectWallet({ keyId });
        }

        const shares = BigInt(shareAmount) as i128;

        const assembledTx = await steptionsClient.withdraw_liquidity({
            pool_id: poolId,
            provider: provider,
            share_amount: shares
        });

        const signedTx = await account.sign(assembledTx.built!, { keyId });
        const result = await server.send(signedTx);

        const withdrawnAmount = assembledTx.result?.toString() || "0";

        return {
            success: true,
            lpShares: withdrawnAmount,
            transactionHash: result.hash
        };

    } catch (error: unknown) {
        console.error('Error withdrawing liquidity:', error);
        return {
            success: false,
            error: `Failed to withdraw liquidity: ${JSON.stringify(error)}`
        };
    }
}

/**
 * Buy an option from a specific pool
 */
export async function buyOption(
    poolId: u64,
    buyer: string,
    optType: "Call" | "Put",
    strike: string,
    expiry: u64,
    amount: string,
    keyId: string
) {
    try {
        console.log(`Buying option: pool=${poolId}, type=${optType}, strike=${strike}`);

        if (!account.wallet?.options) {
            await account.connectWallet({ keyId });
        }

        const optionType = { tag: optType, values: undefined } as any;
        const strikePrice = BigInt(strike) as i128;
        const optionAmount = BigInt(amount) as i128;

        const assembledTx = await steptionsClient.buy_option({
            pool_id: poolId,
            buyer: buyer,
            opt_type: optionType,
            strike: strikePrice,
            expiry: expiry,
            amount: optionAmount
        });

        const signedTx = await account.sign(assembledTx.built!, { keyId });
        const result = await server.send(signedTx);

        return {
            success: true,
            optionId: assembledTx.result?.toString(),
            transactionHash: result.hash
        };

    } catch (error: unknown) {
        console.error('Error buying option:', error);
        return {
            success: false,
            error: `Failed to buy option: ${JSON.stringify(error)}`
        };
    }
}

/**
 * Get pool information
 */
export async function getPoolInfo(poolId: u64) {
    try {
        const result = await steptionsClient.get_pool({ pool_id: poolId });
        return {
            success: true,
            pool: result.result
        };
    } catch (error: unknown) {
        console.error('Error fetching pool info:', error);
        return {
            success: false,
            error: `Failed to get pool info: ${JSON.stringify(error)}`
        };
    }
}

/**
 * Get user's LP shares for a pool
 */
export async function getUserLpShares(poolId: u64, provider: string) {
    try {
        const result = await steptionsClient.get_pool_lp_shares({
            pool_id: poolId,
            provider: provider
        });
        return {
            success: true,
            shares: result.result?.toString() || "0"
        };
    } catch (error: unknown) {
        console.error('Error fetching LP shares:', error);
        return {
            success: false,
            error: `Failed to get LP shares: ${JSON.stringify(error)}`
        };
    }
}
