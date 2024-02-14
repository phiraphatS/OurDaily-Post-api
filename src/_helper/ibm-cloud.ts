import { Injectable } from '@nestjs/common';
import * as ibm from 'ibm-cos-sdk';

interface IFile {
  originalname: string;
  file: File;
  mimetype: string;
}

@Injectable()
class IBMServices {
  private cos: any;

  constructor() {
    const config = {
      endpoint: 's3.jp-tok.cloud-object-storage.appdomain.cloud',
      apiKeyId: 'qPS3Szj1wS1lI00OI4NstXVK9c_N5UMQwSUqle7Gf4Wt',
      serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/2d89d45ebd774c5f8b43d702efc13b15:d1b5c5fd-0836-4130-80fa-547147ccc55d:bucket:cloud-object-storage-cos-standard-tni'
    };

    this.cos = new ibm.S3(config);
  }

  public fileToBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(Buffer.from(reader.result.toString()));
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  public async uploadFile(file: Express.Multer.File) {
    const params = {
      Bucket: 'cloud-object-storage-cos-standard-tni',
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    return this.cos.upload(params).promise();
  }

  public uploadFileList(files: Express.Multer.File[]) {
    const promises = files.map(file => {
      return this.uploadFile(file);
    });

    return Promise.all(promises);
  }

  public deleteFile(file: string) {
    const params = {
      Bucket: 'cloud-object-storage-cos-standard-tni',
      Key: file
    };

    return this.cos.deleteObject(params).promise();
  }
}

export default IBMServices;
