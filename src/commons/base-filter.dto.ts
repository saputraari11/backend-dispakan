import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber} from "class-validator";

export class BaseFilterDto{
  @ApiProperty({
    required: false,
  })
  @IsNumber()
  limit: number = 10

  @ApiProperty({
    required: false,
  })
  @IsNumber()
  start: number = 0

  @ApiProperty({
    required: false,
  })
  @IsBoolean()
  is_filter_active: boolean = false
}