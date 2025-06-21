import './style.css'

import { ChatLog } from './chitChat.ts'
import { signup, login, logout } from './passkeys.ts'
import { getPasskeyId, getContractId } from './storage.ts'
import { copyToClipboard } from './utils.ts';
import { stellarExpertLink } from './stellar.ts';

// initialize
const storedPasskeyId = getPasskeyId();
const storedContractId = getContractId();
const connectButtonsList = document.querySelector<HTMLUListElement>('#connect-buttons')!

// signup/login/logout buttons
console.log('storedPasskeyId :', storedPasskeyId);
console.log('storedContractId :', storedContractId);
if (storedPasskeyId && storedContractId) {
    const expertLinkListItem = document.createElement('li')
    const logoutListItem = document.createElement('li')

    const expertLinkAnchor = stellarExpertLink(storedContractId);

    const clipboardSpan = document.createElement('span')
    clipboardSpan.textContent = '⧉'
    clipboardSpan.addEventListener('click', () => copyToClipboard(storedContractId));

    const logoutButton = document.createElement('button')
    logoutButton.textContent = 'Logout'
    logoutButton.addEventListener('click', logout)

    expertLinkListItem.append(expertLinkAnchor)
    expertLinkListItem.append(clipboardSpan)
    logoutListItem.append(logoutButton)
    connectButtonsList.append(expertLinkListItem)
    connectButtonsList.append(logoutListItem)
} else {
    const loginListItem = document.createElement('li')
    const loginButton = document.createElement('button')
    loginButton.textContent = 'Login'
    loginButton.classList.add('outline')
    loginButton.addEventListener('click', login)
    loginListItem.append(loginButton)

    const signupListItem = document.createElement('li')
    const signupButton = document.createElement('button')
    signupButton.textContent = 'Signup'
    signupButton.addEventListener('click', signup)
    signupListItem.append(signupButton)

    connectButtonsList.append(loginListItem, signupListItem)
}

// place the chat log in the page
let cl = new ChatLog(document.querySelector<HTMLDivElement>('#chit-chat')!)

// set up the form
let form = document.querySelector<HTMLFormElement>('#message-form');
let sendButton = document.querySelector<HTMLButtonElement>('#sendButton');
sendButton!.disabled = storedPasskeyId === null

// on form submission, invoke the contract's function
form?.addEventListener('submit', async (event: Event) => {
    event.preventDefault()
    sendButton!.ariaBusy = "true"

    const author = storedContractId
    const message = form.message.value

    if (!storedPasskeyId) {
        alert('please login first')
        return
    }
    if (!message) {
        alert('no message to send')
        return
    }
    if (!author) {
        alert('no author')
        return
    }

    await cl.sendMessage(message, author, storedPasskeyId)
    form.message.value = ''
    sendButton!.ariaBusy = "false"
})
