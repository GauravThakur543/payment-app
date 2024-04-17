import { atom } from 'recoil'

const firstName = atom({
    key: "firstName",
    default: null
})

const lastName = atom({
    key: "lastName",
    default: null
})

const email = atom({
    key: "email",
    default: null
})

const password = atom({
    key: "password",
    default: null
})

export {firstName, lastName, email, password}