import { removeListener } from "process";

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
    const insertUser = await collection.insertOne({
        username: 'Gerardo', 
        password: 'securepassword', 
        email: 'gerard@gmail.com',
        avatar: 'https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png', 
        status: 'pending', 
        role : 'admin',
        birthdate: new Date('1990-01-01')
    });
    console.log('User inserted:', insertUser);
    // const user = {name: 'John', age: 25};
    return ('done');
}

connectDB()
.then(console.log)
.catch(console.error)
.finally(() => client.close());