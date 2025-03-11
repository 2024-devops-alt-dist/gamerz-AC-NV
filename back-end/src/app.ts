require('dotenv').config();
const {MongoClient} = require('mongodb');
console.log('1',process.env.MONGO_URL);

//const express = require('express');
const client = new MongoClient(process.env.MONGO_URL);
console.log('2',process.env.MONGO_URL);

async function connectDB() {
    await client.connect();
    console.log('Connected to MongoDB');
    return ('done');
}

connectDB()
.then(console.log)
.catch(console.error)
.finally(() => client.close());