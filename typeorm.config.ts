module.exports = {
  type: 'postgres',
  url: 'postgresql://root:JVB3Y02hMCj8L97f1dUQRKzg5eD6w4lm@hkg1.clusters.zeabur.com:30587/zeabur',
  synchronize: false,
  logging: false,
  entities: [
     "entities/*.entity.ts"
  ],
};