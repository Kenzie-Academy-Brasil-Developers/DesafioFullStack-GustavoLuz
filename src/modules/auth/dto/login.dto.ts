import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, MinLength, IsString, IsEmail } from "class-validator"

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string
}
