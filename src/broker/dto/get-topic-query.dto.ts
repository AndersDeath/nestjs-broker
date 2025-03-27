import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class GetTopicQueryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsUUID()
    uuid?: UUID;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string;
}