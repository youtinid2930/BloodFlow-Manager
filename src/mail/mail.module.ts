import { Module } from '@nestjs/common';
import { EmailService } from './mailer.service';  // Service to handle email functionality
import { EmailController } from './mail.controller';  // Controller to handle routes

@Module({
  providers: [EmailService],  // Make sure the service is listed here
  controllers: [EmailController],
  exports: [EmailService],   
})
export class EmailModule {}
