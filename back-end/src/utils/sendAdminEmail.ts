import nodemailer from 'nodemailer';
// Removed incorrect Mailtrap import
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import User from '../models/userModel.js';
import { ObjectId } from 'mongoose';
import { User as MailtrapUser } from 'mailtrap/dist/types/api/accounts.js';

dotenv.config();






const transport = nodemailer.createTransport({
host: process.env.MAILTRAP_HOST || "sandbox.smtp.mailtrap.io",
port: Number(process.env.MAILTRAP_PORT) || 2525,


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
  "gamerz_simplon@outlook.fr",
];


  export const sendAdminEmail = async (user: any) => {
  try {
    const mailOptions = {
      from: sender,
      to: recipients,
      subject: "Nouvelle demonde d'inscription",
      text: `Une nouvelle demande d'inscription attend votre aprobation :
      </p>`,
    };

    await transport.sendMail(mailOptions);
    console.log("Email envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
  }
}