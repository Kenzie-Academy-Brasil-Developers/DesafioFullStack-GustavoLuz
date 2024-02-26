import { ApiProperty } from "@nestjs/swagger"
import { hashSync } from "bcryptjs"
import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"



export class CreateClientDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Transform(({value}: {value:string}) => hashSync(value, 10), {groups: ['hashed']})
    password: string

    @ApiProperty()
    @IsString()
    telephone: string

    @ApiProperty()
    registeredAt: Date
}
