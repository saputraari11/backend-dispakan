import { ApiProperty } from '@nestjs/swagger'

export class FilterStoreDto {
    @ApiProperty({
    required: false,
    })
    search:string

    @ApiProperty({
    required: false,
    })
    active_on:string
}

