import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/User-Role.model';

type UserCreateAttr = {
    email: string
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreateAttr>{

    @ApiProperty({ example: '1', description: 'description id user' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'mail@gmail.com', description: 'email  user' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @ApiProperty({ example: '12345', description: 'password user' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @ApiProperty({ example: 'true', description: 'banned or dont banned user' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean

    @ApiProperty({ example: '228', description: 'summary banned  user' })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string

    @BelongsToMany(() => Role, () => UserRoles)
    Roles: Role[]
}