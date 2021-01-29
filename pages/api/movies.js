import { connectToDatabase } from "../../util/mongodb"


export default async (req, res) => {
    const { db } = await connectToDatabase()

    const movies = await db
    .collection("MoviesAndMore")
    .find({})
    .sort({ imdbRating: -1 })
    .limit(20)
    .toArray();
  res.json(movies);
}