import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DonorsModule } from '../donors/donors.module'; // Import DonorsModule
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    DonorsModule, 
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule], 
})
export class UsersModule {}
