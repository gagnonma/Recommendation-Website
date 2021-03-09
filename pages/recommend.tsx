import { useRouter } from 'next/router'
import { connectToDatabase } from "../util/mongodb"
import { getRecommendations } from "../util/getRecommedations"
import NavBar from '../components/NavBar'
import MediaCard from '../components/MediaCard'



export default function Recommend({recs}) {
    console.log(recs)

    return (
        <div>
            <NavBar/>
            <h1>Your Recommendations are: </h1>
            {recs.map((media) => (
                <MediaCard media={media}/>
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