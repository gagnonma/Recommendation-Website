import { connectToDatabase } from "../../util/mongodb"


export default async (req, res) => {
    const { db } = await connectToDatabase()
    let data = req.body
    data = JSON.parse(data)

    const update = await db
  .collection("Accounts")
  .updateOne({username: data.username}, {$set: {lists: data.lists}})

}