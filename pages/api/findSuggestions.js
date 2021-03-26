import { connectToDatabase } from "../../util/mongodb"


export default async (req, res) => {
    let data = req.body
    data = JSON.parse(data)

    const { db } = await connectToDatabase()

    const movies = await db
    .collection("MaxsMoviesAndTv")
    .find({ "Title" : { $regex : new RegExp(data.title, "i") } })
    .sort({ imdbRating: -1 })
    .limit(5)
    .toArray();
  
    res.json(movies);
}