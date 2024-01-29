import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './upload.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UploadModule])],
  controllers: [UploadController],
})
export class UploadModule {}
