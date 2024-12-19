import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',  // Choose SMTP provider like Gmail
      auth: {
        user: 'Testfste@gmail.com',  
        pass: 'fste2003ohayou',  
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'Testfste@gmail.com', 
      to: to,
      subject: subject,
      text: text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent OK!');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send');
    }
  }
}
