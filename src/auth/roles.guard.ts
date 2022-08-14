import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { ROLES_KEY } from './roles-auth.decoration';


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private JwtService: JwtService,
        private Reflector: Reflector ,
    ) { }



    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {

            const requierRoles = this.Reflector.getAllAndOverride(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            if (!requierRoles) {
                return true
            }
            const reqHeader = req.headers.authorization
            const bearer = reqHeader.split(' ')[0]
            const token = reqHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'User dont auth' })
            }
            const user = this.JwtService.verify(token)
            console.log(user, 999);
            
            req.user = user
            return user.roles.some(role => requierRoles.includes(role.value))
        } catch (error) {
            throw new HttpException({ message: 'User dont FORBIDDEN' }, HttpStatus.FORBIDDEN)
        }
    }
}