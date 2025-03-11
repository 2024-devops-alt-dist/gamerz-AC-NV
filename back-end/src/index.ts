// import mongoose from 'mongoose';
// import User from './models/userModel.js';
// import dotenv from 'dotenv';
// dotenv.config();

// async function createUser() {


// //forcer TypeScript à le considérer comme une string avec "!" :
// mongoose.connect(process.env.MONGO_URL!);


// // Create
// const user = new User({
//     username: 'John',
//     //password: 'password',
//     email: 'john@example.com',
//     role: 'user',
//     avatar: 'https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png',
//     status: 'pending',
//     birthdate: new Date('1990-01-01')
// });
// await user.save();
// }

// createUser().catch(err => console.error(err));

// // // Insert in MongoDB avec findOne() :


// // // Importation de Mongoose
// // import mongoose from 'mongoose';

// // // Déstructuration pour récupérer Schema et model
// // const { Schema, model } = mongoose;

// // // Définition du schéma User
// // const userSchema = new Schema({
// //   username: {
// //     type: String,
// //     required: true,
// //   },
// //   email: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //     lowercase: true,
// //   },
// //   password: {
// //     type: String,
// //     required: true,
// //     minlength: 6,
// //   },
// //   role: {
// //     type: String,
// //     required: true,
// //     default: 'user',
// //   },
// //   avatar: {
// //     type: String,
// //     default: 'https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png',
// //   },
// //   status: {
// //     type: String,
// //     default: 'pending',
// //   },
// //   birthdate: {
// //     type: Date,
// //     required: true,
// //   },
// //   createdAt: {
// //     type: Date,
// //     default: Date.now,
// //     immutable: true,
// //   }
// // });

// // // Création du modèle User
// // const User = model('User', userSchema);

// // // Exportation du modèle
// // export default User;

// // // Connexion à MongoDB et insertion d'un utilisateur
// // async function connectAndInsertUser() {
// //   try {
// //     await mongoose.connect(process.env.MONGO_URL!);

// //     const newUser = await User.create({
// //       name: "John Doe",
// //       email: "johndoe@example.com",
// //       password: "securepassword",
// //     });

// //     console.log("Utilisateur inséré :", newUser);
// //   } catch (error) {
// //     console.error("Erreur lors de l'insertion :", error);
// //   } finally {
// //     mongoose.connection.close();
// //   }
// // }

// // connectAndInsertUser();