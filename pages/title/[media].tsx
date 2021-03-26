import { useRouter } from 'next/router'
import { getRecommendations } from '../../util/getRecommendations'
import { connectToDatabase } from "../../util/mongodb"
import NavBar from '../../components/NavBar'
import MediaCard from '../../components/MediaCard'
import { useContext, useState, useEffect } from 'react'
import AccountContext from '../../contexts/account'
import { useCurrentUser } from '../../hooks/index';
import Dropdown  from 'react-dropdown';
import AddRemoveButton from '../../components/AddRemoveButton'



export default function Media ({mediaInfo}){
    // console.log(mediaInfo.recs[0])
    const [user, { mutate }] = useCurrentUser();  
    const [recs, setRecs] = useState({id : mediaInfo.imdbId, list: []})
    
    const getRecs = async() => {

        const data= {
            movieList: [mediaInfo.imdbID],
            genreList: [],
            type: ['movie', 'series'],
            min: 0,
            max: 10
        }

        try {
            const res = await fetch('/api/getRecommendations', {
                method: 'post',
                body: JSON.stringify(data)
            })
            const response = await res.json()
            console.log(response)
            const newRecs = {id : mediaInfo.imdbID, list : response.recs}
            setRecs(newRecs)
        } catch (error) {
            console.log(error)
        }        
    }

    useEffect(() => {
        async function getRecsContainer() {
            await getRecs()            
        }
        getRecsContainer()
    },[mediaInfo.imdbID])

    return (
        <div>
            <NavBar/>
            <h1> {mediaInfo.Title} </h1>
            <img src={mediaInfo.Poster}></img>
            <p> {mediaInfo.Plot} </p>

            <AddRemoveButton mediaInfo={mediaInfo}/>
           
           {recs.list.length == 0  || recs.id != mediaInfo.imdbID ? (
           <div>
               <h2>Recommendations loading...</h2>
           </div>) : 
           (<div>
           <h1>Similar titles to {mediaInfo.Title} </h1>
           <div id='list'>
            {recs.list.map((media) => (
                <MediaCard media={media}/>
            ))}
            </div>
            </div>)}
            
        </div>
    )
}



export async function getServerSideProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const { db } = await connectToDatabase()

    var query = {imdbID : params.media}

    const mediaInfo = await db
    .collection("MaxsMoviesAndTv")
    .find(query)
    .toArray();

    const data= {
        movieList: [params.media],
        genreList: [],
        type: ['movie', 'series'],
        min: 0,
        max: 10
    }

    // const recommendations = await getRecommendations(data)


    return {
        props: {
            mediaInfo: JSON.parse(JSON.stringify(mediaInfo))[0],
            // recs: recommendations
        }
    }
}
