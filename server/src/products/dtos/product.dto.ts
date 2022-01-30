import { ObjectId } from 'mongoose'

// class Specification {
//     name: string
//     value: string
// }
//
// class Thread {
//     value: number
//     price: number
// }

export class ProductDto {
    name: string
    description: string
    price: number
    specifications: string
    thread?: string
    admin_id: ObjectId
}