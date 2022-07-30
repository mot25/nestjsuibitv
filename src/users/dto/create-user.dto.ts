import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty({ example: 'mail@gmail.com', description: 'email  user' })
    readonly email: string

    @ApiProperty({ example: '12345', description: 'password  user' })
    readonly password: string
}