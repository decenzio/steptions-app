export function setIsLoading(element: HTMLButtonElement, isLoading: boolean) {
    element.ariaBusy = `${isLoading}`
    element.disabled = isLoading
}

export function truncate(text: string, start: number = 4, end: number = 4): string {
    return `${text.slice(0, start)}...${text.slice(text.length - end)}`
}

export async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text)
    alert('copied text to clipboard')
}

export function scrollToTop() {
    window.scrollTo(0, 0)
}

export function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight)
}
