const LS_KEYID_KEY = 'snapchain:keyId'
const LS_CONTRACTID_KEY = 'snapchain:contractId'

export function savePasskeyId(id: string) {
    localStorage.setItem(LS_KEYID_KEY, id);
}

export function getPasskeyId() {
    return localStorage.getItem(LS_KEYID_KEY)
}

export function clearPasskeyId() {
    localStorage.removeItem(LS_KEYID_KEY)
}

export function saveContractId(id: string) {
    localStorage.setItem(LS_CONTRACTID_KEY, id)
}

export function getContractId() {
    return localStorage.getItem(LS_CONTRACTID_KEY);
}

export function clearContractId() {
    localStorage.removeItem(LS_CONTRACTID_KEY)
}
