import { connectToDatabase } from "../../util/mongodb"


export default async (req, res) => {
    const { db } = await connectToDatabase()
    let data = req.body
    data = JSON.parse(data)

    const movies = await db
  .collection("MovieAndTv")
  .find({'imdbID' : {$in: data.idList}})
  .toArray();

  res.json({mediaList: movies});
}


