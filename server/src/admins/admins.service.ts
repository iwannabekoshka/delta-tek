import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'

import { AdminDto } from './dtos/admin.dto'
import { Admin, AdminDocument } from './schemas/admin.schema'
import { RolesService } from '../roles/roles.service'


@Injectable()
export class AdminsService {
    private _logger = new Logger(AdminsService.name)

    constructor(
        @InjectModel(Admin.name) private _adminModel: Model<AdminDocument>,
        private readonly _rolesService: RolesService,
    ) {
    }

    async createAdmin(input: AdminDto): Promise<Admin> {
        const { name, password, role_name } = input
        try {
            const role = await this._rolesService.getRoleByName(role_name)
            const admin = new this._adminModel({ name, password, role })
            return await admin.save()
        } catch (error) {
            this._logger.error(error, 'createAdmin method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getAdmins(): Promise<Admin[]> {
        try {
            const admins = await this._adminModel.find().populate('role')
            if (admins.length <= 0) {
                new NotFoundException(`Couldn't find admins`)
            }
            return await admins
        } catch (error) {
            this._logger.error(error, 'getAdmins method error')
            throw new InternalServerErrorException(error)
        }
    }

    async getAdminById(id: ObjectId): Promise<Admin> {
        try {
            const admin = await this._adminModel.findById(id)
            if (!admin) {
                new NotFoundException(`Couldn't find admin`)
            }
            return await admin
        } catch (error) {
            this._logger.error(error, 'getAdminById method error')
            throw new InternalServerErrorException(error)
        }
    }

    async deleteAdmin(id: ObjectId): Promise<Admin> {
        try {
            return await this._adminModel.findByIdAndDelete(id)
        } catch (error) {
            this._logger.error(error, 'deleteAdmin method error')
            throw new InternalServerErrorException(error)
        }
    }

}