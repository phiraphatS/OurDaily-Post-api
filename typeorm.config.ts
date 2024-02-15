module.exports = {
  type: 'postgres',
  url: 'postgres://default:on8afHArcxP6@ep-blue-dawn-a4j3ysk6-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
  synchronize: false,
  logging: false,
  entities: [
     "src/entities/*.entity{.ts,.js}"
  ],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};