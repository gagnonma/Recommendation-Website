import { useRouter } from 'next/router'
import { connectToDatabase } from "../../util/mongodb"


export default function Media (mediaInfo){

    return (
        <div>
            <h1> {mediaInfo.mediaInfo.Title} </h1>
            <img src={mediaInfo.mediaInfo.Poster}></img>
            <p> {mediaInfo.mediaInfo.Plot} </p>
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


    return {
        props: {
            mediaInfo: JSON.parse(JSON.stringify(mediaInfo))[0]
        }
    }
}
