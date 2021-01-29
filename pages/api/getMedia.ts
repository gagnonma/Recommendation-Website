import { connectToDatabase } from "../../util/mongodb"


export default async (req, res) => {
    const { db } = await connectToDatabase()

    var query = { imdbID : "tt6723592"}

    const media = await db
    .collection("MoviesAndMore")
    .find(query)
    .toArray();
  res.json(media);
}
