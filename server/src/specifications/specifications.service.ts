import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { SpecificationDTO } from './dtos/specification.dto'
import { Specification, SpecificationDocument } from './schemas/specification.schema'

const { ObjectId } = Types

@Injectable()
export class SpecificationsService {
    private _logger = new Logger(SpecificationsService.name)

    constructor(
        @InjectModel(Specification.name) private _specificationModel: Model<SpecificationDocument>,
    ) {
    }

    async createSpecification(input: SpecificationDTO): Promise<Specification> {
        try {
            const specification = new this._specificationModel(input)

            return await specification.save()
        } catch (error) {
            this._logger.error(error, 'createSpecification method error')
            throw new InternalServerErrorException(error)
        }
    }

}