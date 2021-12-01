const path = require('path');
const envConfig = require('dotenv').config({
  path: '.env.stage.dev'
  // path: path.resolve(__dirname, `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`),
})

function env(key) {
  return envConfig.parsed[key] || process.env[key]
}

const baseConfig = {
  type: env('DB_DIALECT'),
  host: env('DB_HOST'),
  port: env('DB_PORT'),
  username: env('DB_USERNAME'),
  password: env('DB_PASSWORD'),
  database: env('DB_DATABASE'),
  autoLoadEntities: true,
  synchronize: true,
  entities: [path.resolve(__dirname, 'src/**/*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname, 'src/database/migrations/**/*.ts')]
}

export default {...baseConfig}