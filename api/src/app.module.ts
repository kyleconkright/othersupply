import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { RecordsModule } from './records/records.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import DatabaseConfig from './database/database.config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
      load: [
        () => ({ database: DatabaseConfig() }),
      ],
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    RecordsModule,
  ],
})
export class AppModule { }

