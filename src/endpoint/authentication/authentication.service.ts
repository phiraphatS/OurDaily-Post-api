import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findOneBy({ email: email });
        if (user && bcrypt.compare(password, user.password)) {
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
            ...payload,
            access_token: this.jwtService.sign(payload),
        };
    }

    // async onModuleInit() {
    //     // Call regeneratePasswordAndUpdate when the module is initialized
    //     await this.regeneratePasswordAndUpdate();
    // }

    async regeneratePasswordAndUpdate() {
        try {
            const starterPassword = '224488'
            const hashedPassword = await bcrypt.hash(starterPassword, 10)
            const user = await this.userRepository.find()
            await Promise.all(user.map(async (element) => {
                await this.userRepository.update(element.id, { password: hashedPassword })
            }))

            return {
                status: true,
                message: 'Success',
                results: null,
            }
        } catch (err) {
            throw err
        }
    }
}
