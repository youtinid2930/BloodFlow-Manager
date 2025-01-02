import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { EmailService } from './mailer.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  // POST endpoint to send an email
  @Post('send')
  async sendEmail(@Body() body: { email: string; subject: string; text: string }) {
    const { email, subject, text } = body;

    // Validate input
    if (!email || !subject || !text) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }

    try {
      // Call the sendMail function from EmailService
      const result = await this.emailService.sendMail(email, subject, text);
      return {
        message: 'Email sent successfully',
        result,
      };
    } catch (err : any) {
      // Handle error if email sending fails
      throw new HttpException(
        'Error sending email: ' + err.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
