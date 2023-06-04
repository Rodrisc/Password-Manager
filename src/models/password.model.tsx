import { accountData } from "../components/ShowData"

export class Password {

    constructor({ id, identifier, user, email, password, colorBox }: accountData) {

        this.id = id
        this.identifier = identifier
        this.user = user
        this.email = email
        this.password = password
        this.colorBox = colorBox
    }

    public id: string
    public identifier: string
    public user: string
    public email: string
    public password: string
    public colorBox: string

}