import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EmailService {
  private async createTransporter() {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID1,
        process.env.CLIENT_SECRET1,
        'https://developers.google.com/oauthplayground',
      );

      oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN1,
      });

      const accessToken = await new Promise<string>((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            console.error('Error generating access token: ', err);
            reject(err);
          } else if (!token) {
            reject(new Error('Access token is null or undefined'));
          } else {
            resolve(token); // Ensure token is not null/undefined
          }
        });
      });

      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.USER_EMAIL1,
          clientId: process.env.CLIENT_ID1,
          clientSecret: process.env.CLIENT_SECRET1,
          refreshToken: process.env.REFRESH_TOKEN1,
          accessToken,
        },
      });
    } catch (err) {
      console.error('Error creating transporter: ', err);
      throw err;
    }
  }

  async sendMail(to: string, subject: string, text: string) {
    try {
      const transporter = await this.createTransporter();

      const mailOptions = {
        from: process.env.USER_EMAIL,
        to,
        subject,
        text,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent: ', result);
      return result;
    } catch (err) {
      console.error('Error sending email: ', err);
      throw err;
    }
  }
}
