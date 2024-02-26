import { Contact } from "@prisma/client"
import { Exclude } from "class-transformer"
import { randomUUID } from "node:crypto"


export class Client {
    readonly id: string
    name: string
    email: string
    
    @Exclude()
    password: string

    telephone: string
    registeredAt: Date
    

    constructor() {
        this.id = randomUUID(),
        this.registeredAt = new Date()
    }
    
}
