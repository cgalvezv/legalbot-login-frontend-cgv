export interface UserInput {
    name: string,
    lastname: string,
    gender: string,
    email: string,
    password: string
}

export interface UserOutput {
    name: string,
    lastname: string,
    gender: string,
    email: string,
    password: string,
    accessToken: string,
    refreshToken: string
}

export interface UserToSignIn {
    email: string,
    password: string,
}