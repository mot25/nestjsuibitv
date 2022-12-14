import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { RolesService } from 'src/roles/roles.service';
import { UserRoles } from 'src/roles/User-Role.model';

import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
  ],
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      UserRoles
    ]),
    RolesModule,
    forwardRef(() => AuthModule )
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule { }
