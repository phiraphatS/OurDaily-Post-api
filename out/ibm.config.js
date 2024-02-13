"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    useHmac: false,
    bucketName: 'testbucketname',
    serviceCredential: {
        "apikey": "XXXXXXXX",
        "cos_hmac_keys": {
            "access_key_id": "XXXXXXXXX",
            "secret_access_key": "XXXXXXXX"
        },
        "endpoints": "https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints",
        "iam_apikey_description": "Auto-generated for key XXXXXX-XXXX-XXXX-XXXX",
        "iam_apikey_name": "Service credentials-2",
        "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Writer",
        "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/XXXXXXXX::serviceid:ServiceId-XXXXX-XXXXX-XXXXX",
        "resource_instance_id": "crn:v1:bluemix:public:cloud-object-storage:global:a/XXXXXXXX:XXXXX-XXXXX-XXXXX-XXXX::"
    },
};
