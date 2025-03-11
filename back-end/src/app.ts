//import { removeListener } from "process";

require('dotenv').config();
const {MongoClient} = require('mongodb');
console.log('1',process.env.MONGO_URL);

//const express = require('express');
const client = new MongoClient(process.env.MONGO_URL);
console.log('2',process.env.MONGO_URL);

async function connectDB() {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('gamerz-db');
    const collection = db.collection('users');
    //create = ok
    // try{
    //     const insertUser = await collection.insertOne({
    //     username: 'Roberto', 
    //     password: 'securepassword', 
    //     email: 'roberto@gmail.com',
    //     avatar: 'https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png', 
    //     status: 'pending', 
    //     role : 'admin',
    //     birthdate: new Date('1990-01-01')
    //     });
    //     console.log('Inserted user: ', insertUser);

    // } catch (e) {
    //     throw e;
    // }
    //read
    try{
        // const findUser = await collection.findOne({username:'Gerardo'});
        // console.log('Found user: ', findUser);
       // const findAdmins = await collection.find({role:'admin'});
      //  console.log(await findAdmins.toArray());
    } catch (e) {
        throw e;
    }
    //update
    try{
        // const updateGerardo = await collection.updateOne({username:'Fransisco'}, {$set: {role: 'user'}});
        // console.log(updateGerardo);
        const updateRoles = await collection.updateMany({role:'user'}, {$set: {role: 'admin'}});
        console.log(updateRoles);

    } catch (e) {
        throw e;
    }
    //delete
    try{
         const deleteUser = await collection.deleteOne({username:'Fransisco'});
        console.log(deleteUser);
       // const deleteAllUsers = await collection.deleteMany({});
       // console.log(deleteAllUsers);
       //deleteEvryOne pour tout !
       

    } catch (e) {
        throw e;
    }

    return ('done');
}

connectDB()
.then(console.log)
.catch(console.error)
.finally(() => client.close());



