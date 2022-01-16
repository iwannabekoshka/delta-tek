import { ObjectId } from 'mongoose'

class Specification {
    name: string
    value: string
}

export class ProductDto {
    name: string
    description: string
    price: number
    specifications: string
    admin_id: ObjectId
}