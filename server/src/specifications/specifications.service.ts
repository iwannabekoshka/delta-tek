import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'

import { SpecificationDTO } from './dtos/specification.dto'
import { Specification, SpecificationDocument } from './schemas/specification.schema'


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

    async getSpecifications(): Promise<Specification[]> {
        try {
            const specifications = await this._specificationModel.find()
            if (specifications.length <= 0) {
                new NotFoundException(`Couldn't find specifications`)
            }
            return await specifications
        } catch (error) {
            this._logger.error(error, 'getSpecifications method error')
            throw new InternalServerErrorException(error)
        }
    }

    async deleteSpecification(id: ObjectId): Promise<Specification> {
        try {
            const specification = await this._specificationModel.findByIdAndDelete(id)
            return  specification
        } catch (error) {
            this._logger.error(error, 'deleteSpecification method error')
            throw new InternalServerErrorException(error)
        }
    }

}