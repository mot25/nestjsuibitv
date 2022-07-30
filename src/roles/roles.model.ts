import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/user.model';

import { UserRoles } from './User-Role.model';


@Table({ tableName: 'roles' })
export class Role extends Model<Role> {

    @ApiProperty({example: '1', description: 'id role user'})
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true })
    id: number

    @ApiProperty({ example: 'Admin', description: 'role user' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string

    @ApiProperty({ example: 'bannes user', description: 'description roles' })
    @Column({ type: DataType.STRING, allowNull: false })
    description: string


    @BelongsToMany(() => User, () => UserRoles)
    Users: User[]
}