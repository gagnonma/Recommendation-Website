import { connectToDatabase } from "./mongodb"

export async function getRecommendations({movieList, genreList, type, min, max}) {
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
    scores_condensed_array = scores_condensed_array.slice(0,100)

    var rec_df_indices = []
    for (const movie of scores_condensed_array) {
        rec_df_indices.push(parseInt(movie[0]))
    }

    var rec_imdbIDs = []
    const scores_imdbIds = await db
        .collection("MovieSim")
        .find({'dfIndex': {$in: rec_df_indices}})
        .toArray();
    for (var i of scores_imdbIds) {
        rec_imdbIDs.push(i.imdbID)
    }


    // for (const index of rec_df_indices) {
    //     const scores_imdbIds = await db
    //     .collection("MovieSim")
    //     .find({'dfIndex': index})
    //     .toArray();
    //     rec_imdbIDs.push(scores_imdbIds[0].imdbID)
    // }

    var recommendations = []
    console.log(genreList)
    if (genreList.length > 0) {
        recommendations = await db
        .collection("MaxsMoviesAndTv")
        .find({'imdbID' : {$in: rec_imdbIDs}, 
            'Genre': {$in: genreList}, 
            'imdbRating': {$gt: min, $lt: max}, 
            'Type': {$in: type}})
        .toArray();
    } else {
        recommendations = await db
        .collection("MaxsMoviesAndTv")
        .find({'imdbID' : {$in: rec_imdbIDs}, 
            'imdbRating': {$gt: min, $lt: max}, 
            'Type': {$in: type}})
        .toArray();
    }

    return  JSON.parse(JSON.stringify(recommendations))
}
