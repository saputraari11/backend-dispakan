import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { responseTemplate } from 'src/app.utils'
import { UserLevel } from './user-level.enum'
import { BumdesProfileDto } from './dto/bumdes-profile.dto'
import * as fs from 'fs'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { StorageService } from 'src/commons/storage/storage.service'
import { v4 } from 'uuid'
import { User } from './user.entity'
import { UpdateStatusDto } from './dto/update-status.dto'
import { FilterUmkmDto } from './dto/filter-all.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private storageService:StorageService
  ) {}

  async userUmkm(filterUmkm:FilterUmkmDto) {
    let request_user = this.userRepository.createQueryBuilder('user').where('user.level = :level',{level:UserLevel.UMKM}).andWhere('user.active_on = :activeOn',{activeOn:filterUmkm.active_on})

    if(filterUmkm.search){
      request_user = request_user.andWhere(
        'user.name ILIKE :searchTerm or user.address ILIKE :searchTerm or user.phone ILIKE :searchTerm or user.email ILIKE :searchTerm',
      )
    }

    const user = await request_user.getMany()

    return responseTemplate('200', 'success', user)
  }

  async userBumdes(url: string) {
    const user = await this.userRepository.find({
      where: {
        level: UserLevel.BUMDES,
      },
    })

    user.map(item => (item.url_image = `${process.env.LINK_GCP}/users/${item.active_on}/${item.mediaId}.png`))
    return responseTemplate('200', 'success', user)
  }

  async userDetail(id: string, url?: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    })

    user.url_image = `${process.env.LINK_GCP}/users/${user.active_on}/${user.mediaId}.png`
    if (!user) {
      return new User()
    }

    return user
  }

  async updateProfile(updateProfile: UpdateProfileDto) {
    const user = await this.userDetail(updateProfile.id_owner_umkm)
    if(!user.id) {
      return responseTemplate('404', 'gagal', user)
    }

    if (updateProfile.name) user.name = updateProfile.name
    if (updateProfile.phone) user.phone = updateProfile.phone
    if (updateProfile.address) user.address = updateProfile.address
    if (updateProfile.email) user.email = updateProfile.email

    if (updateProfile.new_password && updateProfile.old_password) {
      await this.updatePassword({new_password:updateProfile.new_password,old_password:updateProfile.old_password,id_user:user.id})
    }

    await this.userRepository.save(user)

    return responseTemplate('200', 'success', user)
  }

  async updateBumdes(updateProfile: BumdesProfileDto) {
    const user = await this.userDetail(updateProfile.id_bumdes_umkm)

    if(!user.id) {
      return responseTemplate('404', 'gagal', user)
    }

    if (updateProfile.name) user.name = updateProfile.name
    if (updateProfile.phone) user.phone = updateProfile.phone
    if (updateProfile.address) user.address = updateProfile.address
    if (updateProfile.status) user.status = updateProfile.status

    if (updateProfile.file) {
      try {
        await this.storageService.delete(`users/${user.active_on}/${user.mediaId}`)
      } catch(err) {
        console.log('error delete',err);
      }

      user.mediaId = v4()

      try {
        await this.storageService.save(
          `users/${user.active_on}/${user.mediaId}`,
          updateProfile.file.mimetype,
          updateProfile.file.buffer,
          [{mediaId:user.mediaId}]
        )
      } catch(err) {
        console.log('error upload',err);
      }
    }

    await this.userRepository.save(user)

    return responseTemplate('200', 'success', user)
  }

  async updatePassword(updatePassword: UpdatePasswordDto) {
    const user = await this.userDetail(updatePassword.id_user)
    const isValid = await user.validatePassword(updatePassword.old_password)
    if (!isValid) {
      return responseTemplate('400', 'Password is Wrong!', [], true)
    }
    const newPassword = await this.userRepository.hashPassword(
      updatePassword.new_password,
      user.salt,
    )
    user.password = newPassword
    await this.userRepository.save(user)

    return responseTemplate('200', 'success', user)
  }

  async updateStatus(updateStatus: UpdateStatusDto,id:string) {
    const user = await this.userDetail(id)
    user.status = updateStatus.status
    await this.userRepository.save(user)

    return responseTemplate('200', 'success', user)
  }

  async deleteUmkm(id: string) {
    const user = await this.userDetail(id)
    await this.userRepository.remove(user)
    return responseTemplate('200', 'success', {})
  }
}
