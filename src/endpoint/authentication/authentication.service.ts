import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findOneBy({ email: email });
        if (user && user.password === password) {
            const result = {
                id: user.id,
                email: user.email,
            };
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
