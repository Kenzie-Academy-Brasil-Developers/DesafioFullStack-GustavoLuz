import { randomUUID } from "node:crypto"

export class Contact {
    readonly id: string 
    name: string
    email: string  
    telephone: string
    client_id: string
    registeredAt: Date

    constructor() {
        this.id = randomUUID()
        this.registeredAt = new Date()
    }
}


