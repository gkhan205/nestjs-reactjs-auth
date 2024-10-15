import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const uri: string = this.configService.get<string>('MONGO_URL');
    const dbName: string = this.configService.get<string>('DB_NAME');

    return {
      uri,
      dbName,
    };
  }
}
