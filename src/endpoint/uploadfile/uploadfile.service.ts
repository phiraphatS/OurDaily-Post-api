import { Injectable } from '@nestjs/common';
import IBMServices from '../../_helper/ibm-cloud';

@Injectable()
export class UploadfileService {
    constructor(
        private imbServices: IBMServices,
    ) {}

    async uploadFile(file: Express.Multer.File) {
        try {
            const result = await this.imbServices.uploadFile(file);
            return {
                status: true,
                message: 'Success',
                results: result,
            };
        } catch (err) {
            throw {
                status: false,
                message: err.message,
                results: err,
            }
        }
    }
}
