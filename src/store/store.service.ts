import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { responseTemplate } from "src/app.utils";
import * as fs from 'fs';   
import { Store } from "./store.entity";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(Store)
        private readonly storeRepository:Repository<Store>,
        private readonly userService:UsersService
    ){}

    async allStore() {
      const store = await this.storeRepository.find()
      

      for(let item of store) {
        await item.convertStringToArray()
      }
    
      if(store.length == 0) {
        return responseTemplate("400","store doesn't exist",{},true)
      }

      return responseTemplate("200","success",store)
    }

    async detailStore(id:string) {
        const store = await this.storeRepository.findOne({where:{id:id}})
        if(!store) {
            throw new NotFoundException(`store with id ${id} not found`)
        }

        return responseTemplate("200","success",store)
    }

    async uploadStore(uploadStore: CreateStoreDto){
        const {file,name,address,aspek,category,id_owner,phone,omset,link} = uploadStore
        const owner = await this.userService.userDetail(id_owner)
        const store = new Store()

        store.name = name
        store.address = address
        store.aspek = aspek
        store.katagoriSaved = JSON.stringify(category)
        store.user = owner
        store.phone = phone
        store.omset = omset
        store.linkSaved = JSON.stringify(link)

        if(uploadStore.file) {
            store.filename = file.filename
            store.image = file.path
        }

        await this.storeRepository.save(store)
        return responseTemplate("200","success",store)
    }

    async updateStore(updateStore:CreateStoreDto,id:string){
        const store = (await this.detailStore(id)).data
        const owner = await this.userService.userDetail(updateStore.id_owner)

        if(updateStore.file) {
            if(fs.existsSync(store.image)){
                fs.unlinkSync(store.image)
            }

            store.filename = updateStore.file.filename
            store.image = updateStore.file.path
        }

        store.name = updateStore.name
        store.address = updateStore.address
        store.aspek = updateStore.aspek
        store.katagoriSaved = JSON.stringify(updateStore.category) 
        store.phone = updateStore.phone
        store.omset = updateStore.omset
        store.linkSaved = JSON.stringify(updateStore.link)

        await this.storeRepository.save(store)
        return responseTemplate("200","success",store)
    }

    async deleteStore(id: string) {
        let response = ""
        const store = (await this.detailStore(id)).data

        try {
            fs.unlinkSync(store.image)
            response = `${store.createdAt}. ${store.image} deleted`
        } catch(e) {
            response = `${store.createdAt}. ${store.image}, ${e.message}`
        }

        await this.storeRepository.remove(store)

        return responseTemplate("200","success",response)
    }
}