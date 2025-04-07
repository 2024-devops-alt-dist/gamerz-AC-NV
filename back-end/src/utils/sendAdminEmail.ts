import nodemailer from 'nodemailer';
// Removed incorrect Mailtrap import
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import User from '../models/userModel.js';
import { ObjectId } from 'mongoose';

dotenv.config();






const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const sender = {
  address: "hello@example.com",
  name: "Mailtrap Test",
};
const recipients = [
  "senga.ds@gmail.com",
];

transport
  .sendMail({
    from: sender,
    to: recipients,
    subject: "New user registration",
    text: "A new user has registered on the platform.",
  })
  .then(console.log, console.error);

