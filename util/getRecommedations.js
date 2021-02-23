import { connectToDatabase } from "../util/mongodb"

export async function getRecommendations(movieList) {
    const { db } = await connectToDatabase();

    const movies = await db
    .collection("MovieSim")
    .find({'imdbID' : {$in: movieList}})
    .toArray();

    // console.log(movies)

    var scores_condensed = {}
    for (const movie of movies) {
        // console.log(movie['sim'])
        for (const [key,value] of Object.entries(movie['sim'])) {
            if(scores_condensed.hasOwnProperty(key)) {
                scores_condensed[key] = scores_condensed[key] + movie['sim'][key]
            } else {
                scores_condensed[key] = movie['sim'][key]
            }
        }
    }
    

    var scores_condensed_array = Object.entries(scores_condensed)
    .sort(([,a],[,b]) => b-a);

    var movieIds = []
    for (const mId in movies) {
        movieIds.push(mId.dfIndex)
    }
    scores_condensed_array = scores_condensed_array.filter(score => !movieIds.includes(score[0]))
    scores_condensed_array = scores_condensed_array.slice(0,10)

    var rec_df_indices = []
    for (const movie of scores_condensed_array) {
        rec_df_indices.push(parseInt(movie[0]))
    }

    var rec_imdbIDs = []
    for (const index of rec_df_indices) {
        const scores_imdbIds = await db
        .collection("MovieSim")
        .find({'dfIndex': index})
        .toArray();
        rec_imdbIDs.push(scores_imdbIds[0].imdbID)
    }

    const recommendations = await db
    .collection("MoviesAndTv")
    .find({'imdbID' : {$in: rec_imdbIDs}})
    .toArray();
    // const scores_imdbIds = await db
    // .collection("MovieSim")
    // .find({'dfIndex': {$in: rec_df_indices}})
    // .toArray();

    // var rec_imdbIDs = []
    // for (const movie of scores_imdbIds) {
    //     rec_imdbIDs.push(movie.imdbID)
    // }

    // var test = []
    // for (const movie of scores_imdbIds) {
    //     test.push(movie.dfIndex)
    // }

    // console.log(recommendations)
    // console.log(scores_imdbIds)

    return  JSON.parse(JSON.stringify(recommendations))
}
