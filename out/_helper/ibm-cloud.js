"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ibm = require("ibm-cos-sdk");
const config = {
    endpoint: 's3.jp-tok.cloud-object-storage.appdomain.cloud',
    apiKeyId: 'qPS3Szj1wS1lI00OI4NstXVK9c_N5UMQwSUqle7Gf4Wt',
    serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/2d89d45ebd774c5f8b43d702efc13b15:d1b5c5fd-0836-4130-80fa-547147ccc55d:bucket:cloud-object-storage-cos-standard-tni'
};
const cos = new ibm.S3(config);
const uploadFile = (file) => {
    const params = {
        Bucket: 'cloud-object-storage-cos-standard-tni',
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
    };
    return cos.upload(params).promise();
};
const deleteFile = (file) => {
    const params = {
        Bucket: 'cloud-object-storage-cos-standard-tni',
        Key: file
    };
    return cos.deleteObject(params).promise();
};
module.exports = {
    uploadFile,
    deleteFile
};
