// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// // import { Request, Response } from 'express';
// // import User from '../models/userModel.js';
// // import { ObjectId } from 'mongoose';
// // import { User as MailtrapUser } from 'mailtrap/dist/types/api/accounts.js';

// dotenv.config();






// const transport = nodemailer.createTransport({
//     service: "Gmail",
// //host: process.env.MAILTRAP_HOST || "sandbox.smtp.mailtrap.io",
// //host: process.env.GMAIL_HOST || "smtp-mail.outlook.com",
// //port: Number(process.env.MAILTRAP_PORT) || 2525,
// //port: Number(process.env.GMAIL_PORT) || 587,
// //secure: false, // true pour 465, false pour autres ports (587)

//   auth: {
//     //user: process.env.MAILTRAP_USER,
//    // pass: process.env.MAILTRAP_PASS,
//    user: process.env.EMAIL_ADMIN,
//    pass: process.env.EMAIL_PASS,
//   },
// });

// const sender = {
//     address: process.env.EMAIL_ADMIN || "gamerz_simplon@outlook.fr",
//     name: "Gamerz Simplon",
// };
// const recipients = [
//     process.env.EMAIL_ADMIN || "gamerz_simplon@outlook.fr",
// ];


//  // export const sendAdminEmail = async (user: any) => {
//  export const sendAdminEmail = async (email:string, username:string) => {
//   console.log("user dans sendAdminEmail", email, username);
//   try {
//     const mailOptions = {
//       from: sender,
//       to: recipients,
//       subject: "Nouvelle demonde d'inscription",
//       text: `Une nouvelle demande d'inscription attend votre aprobation :
//       </p>`,
//     };

//     await transport.sendMail(mailOptions);
//     console.log("Email envoyé avec succès !");
//   } catch (error) {
//     console.error("Erreur lors de l'envoi de l'email :", error);
//   }
// }


import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

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
      text: `Une nouvelle demande d'inscription attend votre aprobation. Veuillez vous connecter à l'admin pour l'approuver ou la refuser.
      <p>Nom d'utilisateur : ${user.username}</p>
      <p>Email : ${user.email}</p>`,
    };

    await transport.sendMail(mailOptions);
    console.log("Email envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
  }
}