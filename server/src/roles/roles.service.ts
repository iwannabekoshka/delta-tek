import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'

import { RoleDto } from './dtos/role.dto'
import { Role, RoleDocument } from './schemas/role.schema'


@Injectable()
export class RolesService {
    private _logger = new Logger(RolesService.name)

    constructor(
        @InjectModel(Role.name) private _roleModel: Model<RoleDocument>,
    ) {
    }

    async createRole(input: RoleDto): Promise<Role> {
        try {
            const role = new this._roleModel(input)

            return await role.save()
        } catch (error) {
            this._logger.error(error, 'createRole method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getRoles(): Promise<Role[]> {
        try {
            const roles = await this._roleModel.find()
            if (roles.length <= 0) {
                new NotFoundException(`Couldn't find roles`)
            }
            return await roles
        } catch (error) {
            this._logger.error(error, 'getRoles method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getRoleById(id: ObjectId): Promise<Role> {
        try {
            const role = await this._roleModel.findById(id)
            if (!role) {
                new NotFoundException(`Couldn't find role`)
            }
            return await role
        } catch (error) {
            this._logger.error(error, 'getRoleById method error')
            throw new InternalServerErrorException(error)
        }
    }

    async deleteRole(id: ObjectId): Promise<Role> {
        try {
            const role = await this._roleModel.findByIdAndDelete(id)
            return  role
        } catch (error) {
            this._logger.error(error, 'deleteRole method error')
            throw new InternalServerErrorException(error)
        }
    }

}