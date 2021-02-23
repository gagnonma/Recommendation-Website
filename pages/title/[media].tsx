import { useRouter } from 'next/router'
import { getRecommendations } from '../../util/getRecommedations'
import { connectToDatabase } from "../../util/mongodb"

const Movie = ({title, poster, rating}) => (
    <div>
        <img src={poster} />
        <div>
            <p>{title}</p>
            <p>{rating}</p>
        </div>
    </div>

);

export default function Media (mediaInfo){
    // console.log(mediaInfo.recs[0])

    return (
        <div>
            <h1> {mediaInfo.mediaInfo.Title} </h1>
            <img src={mediaInfo.mediaInfo.Poster}></img>
            <p> {mediaInfo.mediaInfo.Plot} </p>
           
            <h1>Your Recommendations are: </h1>
            {mediaInfo.recs.map((media) => (
                <Movie 
                title={media.Title}
                poster={media.Poster}
                rating={media.Ratings[0].Value}
                />
            ))}
        </div>
    )
}



export async function getServerSideProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const { db } = await connectToDatabase()

    var query = {imdbID : params.media}

    const mediaInfo = await db
    .collection("MoviesAndMore")
    .find(query)
    .toArray();

    const recommendations = await getRecommendations([params.media])


    return {
        props: {
            mediaInfo: JSON.parse(JSON.stringify(mediaInfo))[0],
            recs: recommendations
        }
    }
}
