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
  "gamerz_simplon@outlook.fr",
];

transport
  .sendMail({
    from: sender,
    to: recipients,
    subject: "New user registration",
    text: "A new user has registered on the platform.",
  })
  .then(console.log, console.error);

  // export const sendAdminEmail = async (user: IUser) => {
//   try {
//     const mailOptions = {
//       from: sender,
//       to: recipients,
//       subject: "Nouvelle demonde d'inscription",
//       text: `Une nouvelle demande d'inscription : ${user.username} (${user.email})`,
//       html: `Une nouvelle demande d'inscription attend votre aprobation :</p><p><strong>${user.username}</strong> (${user.email})<br>
//       message: ${user.motivation}<br>
//       <strong>Avatar:</strong> ${user.avatar}<br>
//       </p>`,
//     };

//     await transport.sendMail(mailOptions);
//     console.log("Email envoyé avec succès !");
//   } catch (error) {
//     console.error("Erreur lors de l'envoi de l'email :", error);
//   }
// }