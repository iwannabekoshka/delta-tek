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
    specifications: Array<Specification>
    thread?: Array<Thread>
    admin_id: ObjectId
}