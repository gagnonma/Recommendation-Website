import { useRouter } from 'next/router'
import { connectToDatabase } from "../util/mongodb"
import { getRecommendations } from "../util/getRecommedations"

const Media = ({title, poster, rating}) => (
    <div>
        <img src={poster} />
        <div>
            <p>{title}</p>
            <p>{rating}</p>
        </div>
    </div>

);



export default function Recommend(recommendations) {
    console.log(recommendations)
  

    // function renderMedia() {
    //     const mediaList = [];
    //     for(let i = 0; i < recommendations.len)
    // }

    return (
        <div>
            <h1>Your Recommendations are: </h1>
            {recommendations.recs.map((media) => (
                <Media 
                title={media.Title}
                poster={media.Poster}
                rating={media.Ratings[0].Value}
                />
            ))}
        </div>
    )
}

export async function getServerSideProps({ params }) {

    const testMovies1 = ["tt0903747", "tt0903747", "tt1345836"]
    const testMovies2 = ["tt0903747", "tt0994314", "tt1345836"]


    const recommendations  = await getRecommendations(testMovies2);

    return {
        props: {
            recs: recommendations
        }
    }
}