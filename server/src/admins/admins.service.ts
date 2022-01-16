import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import * as bcrypt from 'bcrypt'

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
            const bs = 12
            const hashedPassword = bcrypt.hashSync(password, bs)
            const role = await this._rolesService.getRoleByName(role_name)
            const admin = new this._adminModel({ name, password: hashedPassword, role })
            return await admin.save()
        } catch (error) {
            this._logger.error(error, 'createAdmin method error')
            throw new InternalServerErrorException(error)
        }
    }

    async login(input: AdminDto): Promise<Admin> {
        Logger.log(input)
        const { name, password } = input

        const admin = await this._adminModel.findOne({
            name,
        })

        if (!admin) {
            throw new Error('Admin not found')
        }

        const passwordMatch = await bcrypt.compare(password, admin.password)

        if (!passwordMatch) {
            throw new Error('Invalid credentials')
        }

        return admin
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

    async updateAdmin(id: ObjectId, password: string): Promise<any> {
        try {
            const bs = 12
            const hashedPassword = bcrypt.hashSync(password, bs)
            const admin = await this._adminModel.updateOne({_id: id}, {
                password: hashedPassword
            })
            if (!admin) {
                new NotFoundException(`Couldn't find admin`)
            }
            return admin
        } catch (error) {
            this._logger.error(error, 'updateAdmin method error')
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