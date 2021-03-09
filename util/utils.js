import { Db } from "mongodb"
import { connectToDatabase } from "./mongodb"

export function validateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

export async function doesAccountExist(username) {
    const {db} = await connectToDatabase();
    const matchingAccounts =  await db
    .collection("Accounts")
    .find({'username' : username})
    .toArray();

    return matchingAccounts.length != 0
}

export async function createAccount(username,password) {
    const newAccount = {
        username : username,
        password : password,
        lists : [{name: "Watched", mediaList: []}],
        ignore : []
    }
    const {db} = await connectToDatabase();
    const result = db.collection("Accounts").insertOne(newAccount)
    console.log("A new account was added")
}

export async function submitAccount(username, password) {
    const isValid = !(await doesAccountExist(username))
    if(isValid) {
        await createAccount(username,password)
    }
}

export async function getAccount(username) {
    const {db} = await connectToDatabase();
    const matchingAccounts =  await db
    .collection("Accounts")
    .find({'username' : username})
    .toArray();

    return matchingAccounts
}

export async function getMediaList(idList) {
    const { db } = await connectToDatabase();

    const movies = await db
    .collection("MovieAndTv")
    .find({'imdbID' : {$in: idList}})
    .toArray();

    return movies;
}