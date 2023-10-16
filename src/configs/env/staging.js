export default {
  db: {
    type: process.env.DB_TYPE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    db: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  },
  url: process.env.BASE_URI || 'http://localhost:5001',
  media_url:
    process.env.AWS_BUCKET_IMAGE_BASE_URL ||
    'https://media-dev-bucket.s3.ap-south-1.amazonaws.com',
  dbOptions: (options) => {
    return {
      useCreateIndex: true,
      autoIndex: options.autoIndex,
      autoReconnect: true,
      useNewUrlParser: true,
      keepAlive: 1,
      connectTimeoutMS: 300000,
      socketTimeoutMS: 300000,
    }
  },
  masterIP: process.env.MASTER_IP,
  // Secret for token
  secret: process.env.SECRET,
  email: {
    id: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  superAdmin: {
    username: process.env.SUPER_ADMIN_USERNAME,
    password: process.env.SUPER_ADMIN_PASSWORD,
    email: process.env.SUPER_ADMIN_EMAIL,
    fullName: process.env.SUPER_ADMIN_FULL_NAME,
  },
  superAdminRoleId: process.env.SUPER_ADMIN_ROLE,
  redisDB: {
    host: process.env.REDIS_URL || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    isClusterMode: process.env.REDIS_CLUSTER,
  }
}
