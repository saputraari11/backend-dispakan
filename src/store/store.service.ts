import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { responseTemplate } from 'src/app.utils'
import * as fs from 'fs'
import { Store } from './store.entity'
import { CreateStoreDto } from './dto/create-store.dto'
import { UsersService } from 'src/users/users.service'
import { v4 } from 'uuid'
import { StorageService } from 'src/commons/storage/storage.service'
import { FilterStoreDto } from './dto/filter-all.dto'
import { UpdateStatusStore } from './dto/update-status.dto'
import { Product } from 'src/product/product.entity'

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    private readonly userService: UsersService,
    private readonly storageService: StorageService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async allStore(filterDto: FilterStoreDto) {
    let request_store = this.storeRepository.createQueryBuilder('store')
    .innerJoinAndSelect('store.user', 'user')

    try {
      if (filterDto.active_on) {
        request_store = request_store.andWhere('store.active_on = :activeOn', {
          activeOn: filterDto.active_on,
        })
      }

      if (filterDto.search) {
        request_store = request_store.andWhere(
          'store.name ILIKE :searchTerm or store.address ILIKE :searchTerm or store.phone ILIKE :searchTerm or store.omset ILIKE :searchTerm or store.aspek ILIKE :searchTerm',
          { searchTerm: `%${filterDto.search}%` },
        )
      }

      if (filterDto.id_mitra) {
        request_store = request_store.andWhere(
          'user.id = :idMitra',
          {idMitra:filterDto.id_mitra}
        )
      }

      const store = await request_store.getMany()

      for (let item of store) {
        item.url_image = `${process.env.LINK_GCP}/umkm/${item.active_on}/${item.mediaId}.png`
        await item.convertStringToArray()
      }


      if (store.length == 0) {
        return responseTemplate('400', "store doesn't exist", {}, true)
      }

      return responseTemplate('200', 'success', store)
    } catch (err) {
      console.log('error query', err)
    }
  }

  async detailStore(id: string) {
    const store = await this.storeRepository.findOne({ where: { id: id } })
    if (!store) {
      throw new NotFoundException(`store with id ${id} not found`)
    }

    store.url_image = `${process.env.LINK_GCP}/umkm/${store.active_on}/${store.mediaId}.png`
    await store.convertStringToArray()

    return responseTemplate('200', 'success', store)
  }

  async uploadStore(uploadStore: CreateStoreDto) {
    const {
      file,
      name,
      address,
      aspek,
      category,
      id_owner,
      phone,
      omset,
      mediaContact,
      mediaOrder,
    } = uploadStore
    const owner = await this.userService.userDetail(id_owner)
    const store = new Store()

    store.name = name || ''
    store.address = address || ''
    store.aspek = aspek || ''

    if (category && category.length != 0)
      store.katagoriSaved = JSON.stringify(category)

    store.user = owner
    store.phone = phone || ''
    store.omset = omset || ''
    store.active_on = uploadStore.active_on

    if (mediaContact && mediaContact.length != 0)
      store.mediaContact = JSON.stringify(mediaContact)

    if (mediaOrder && mediaContact.length != 0)
      store.mediaOrdered = JSON.stringify(mediaOrder)

    if (uploadStore.file) {
      store.mediaId = v4()
      await this.storageService.save(
        `umkm/${store.active_on}/${store.mediaId}`,
        file.mimetype,
        file.buffer,
        [{ mediaId: store.mediaId }],
      )
    }

    await store.convertStringToArray()

    try {
      await this.storeRepository.save(store)
    } catch (err) {
      console.log('error query', err)
    }

    return responseTemplate('200', 'success', store)
  }

  async updateStore(updateStore: CreateStoreDto, id: string) {
    const store: Store = (await this.detailStore(id)).data
    const owner = await this.userService.userDetail(updateStore.id_owner)

    if (updateStore.file) {
      try {
        await this.storageService.delete(
          `umkm/${store.active_on}/${store.mediaId}`,
        )
      } catch (err) {
        console.log('error delete', err)
      }

      store.mediaId = v4()

      try {
        await this.storageService.save(
          `umkm/${store.active_on}/${store.mediaId}`,
          updateStore.file.mimetype,
          updateStore.file.buffer,
          [{ mediaId: store.mediaId }],
        )
      } catch (err) {
        console.log('error upload', err)
      }
    }

    store.name = updateStore.name
    store.address = updateStore.address
    store.aspek = updateStore.aspek
    if (updateStore.category && updateStore.category.length != 0) {
      store.katagoriSaved = JSON.stringify(updateStore.category)
    } else {
      store.katagoriSaved = null
    }

    store.phone = updateStore.phone
    store.omset = updateStore.omset

    if (updateStore.mediaContact && updateStore.mediaContact.length != 0) {
      store.mediaContact = JSON.stringify(updateStore.mediaContact)
    } else {
      store.mediaContact = null
    }

    if (updateStore.mediaOrder && updateStore.mediaOrder.length != 0) {
      store.mediaOrdered = JSON.stringify(updateStore.mediaOrder)
    } else {
      store.mediaOrdered = null
    }
    store.user = owner

    await store.convertStringToArray()

    await this.storeRepository.save(store)
    return responseTemplate('200', 'success', store)
  }

  async updateStatus(updateComment: UpdateStatusStore, id: string) {
    const store = (await this.detailStore(id)).data

    if (!store.id) {
      return responseTemplate('404', 'gagal', {})
    }

    try {
      store.status = String(updateComment.status) === 'true' ? true : false
    } catch (err) {
      console.log('error parsing data', err)
    }

    try {
      await this.storeRepository.save(store)
    } catch (err) {
      console.log('error query', err)
    }

    return responseTemplate('200', 'success', store)
  }

  async deleteStore(id: string) {
    let response = ''
    const store = (await this.detailStore(id)).data
    const products = await this.productRepository.find({
      where: {
        store:{
          id:id
        }
      },
      relations:['store']
    })

    if(products.length > 0 ) {
      for(let product of products) {
        await this.productRepository.delete({id:product.id})
      }
    }

    try {
      await this.storageService.delete(
        `umkm/${store.active_on}/${store.mediaId}`,
      )
      response = `${store.createdAt}. ${store.mediaId} deleted`
    } catch (e) {
      response = `${store.createdAt}. ${store.mediaId}, ${e.message}`
    }

    await this.storeRepository.remove(store)

    return responseTemplate('200', 'success', response)
  }
}
