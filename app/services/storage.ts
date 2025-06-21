// Storage keys
const PASSKEY_ID_KEY = 'passkey_id';
const CONTRACT_ID_KEY = 'contract_id';

// Save functions
export function savePasskeyId(keyId: string): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(PASSKEY_ID_KEY, keyId);
    }
}

export function saveContractId(contractId: string): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CONTRACT_ID_KEY, contractId);
    }
}

// Get functions
export function getPasskeyId(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(PASSKEY_ID_KEY);
    }
    return null;
}

export function getContractId(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(CONTRACT_ID_KEY);
    }
    return null;
}

// Clear functions
export function clearPasskeyId(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(PASSKEY_ID_KEY);
    }
}

export function clearContractId(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(CONTRACT_ID_KEY);
    }
}

// Check if user is logged in
export function isLoggedIn(): boolean {
    return getPasskeyId() !== null && getContractId() !== null;
} 