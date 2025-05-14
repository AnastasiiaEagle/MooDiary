import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { EmotionType } from "generated/prisma";


export class PostDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    content: string

    @IsEnum(EmotionType)
    emotion: EmotionType

    @IsOptional()
    @IsUUID()
    userId?: string
}