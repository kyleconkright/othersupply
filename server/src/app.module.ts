import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configValidationSchema } from './config.schema';
import { DatabaseModule } from './database/database.module';
import { DiscogsModule } from './discogs/discogs.module';
import DatabaseConfig from './database/database.config';
import { RecordModule } from './record/record.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
      load: [() => ({ database: DatabaseConfig() })],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
      playground: true,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    RecordModule,
    DiscogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
