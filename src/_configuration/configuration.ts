export default () => ({
    mode: process.env.NODE_ENV,
    port: parseInt(process.env.NODE_PORT, 10) || 5001,
    s3Storage: {
        region: process.env.AWS_REGION,
        bucket: process.env.AWS_BUCKET,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    database: {
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: process.env.DATABASE_SYNCHRONIZE,
        logging: process.env.DATABASE_LOGGING,
        entities: ['dist/src/entities/*.js']
    },
    jwt_secret: process.env.JWT_SECRET,
});
