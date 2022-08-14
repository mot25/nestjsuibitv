import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';


@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(
        private JwtService: JwtService
    ) { }



    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {

            const reqHeader = req.headers.authorization
            const bearer = reqHeader.split(' ')[0]
            const token = reqHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'User dont auth' })
            }
            const user = this.JwtService.verify(token)
            req.user = user
            return true
        } catch (error) {
            throw new HttpException({ message: 'User FORBIDDEN' }, HttpStatus.FORBIDDEN)
        }
    }
}