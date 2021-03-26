import { connectToDatabase } from "../../util/mongodb"


export default async (req, res) => {
    const { db } = await connectToDatabase()
    let data = req.body
    data = JSON.parse(data)

    const update = await db
  .collection("users")
  .updateOne({email: data.email}, {$set: {lists: data.lists}})

  res.status(200).send('Updated lists')

}