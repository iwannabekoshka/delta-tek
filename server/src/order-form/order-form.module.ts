import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { OrderFormController } from './order-form.controller'
import { OrderFormService } from './order-form.service'
import { OrderForm, OrderFormSchema } from './schemas/order-form.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: OrderForm.name, schema: OrderFormSchema }]),
    ],
    controllers: [OrderFormController],
    providers: [OrderFormService],
    exports: [OrderFormService]
})
export class OrderFormModule {
}