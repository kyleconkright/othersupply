import { configValidationSchema } from './config.schema';
import { Module } from '@nestjs/common';

import { RecordsModule } from './records/records.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import DatabaseConfig from './database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
      load: [
        () => ({ database: DatabaseConfig() }),
      ],
    }),
    DatabaseModule,
    AuthModule,
    RecordsModule,
  ],
})
export class AppModule { }

