import { useRouter } from 'next/router'
import { getRecommendations } from '../../util/getRecommendations'
import { connectToDatabase } from "../../util/mongodb"
import NavBar from '../../components/NavBar'
import MediaCard from '../../components/MediaCard'
import React, { useContext, useState, useEffect } from 'react'
import AccountContext from '../../contexts/account'
import { useCurrentUser } from '../../hooks/index';
import Dropdown  from 'react-dropdown';
import AddRemoveButton from '../../components/AddRemoveButton'
import Head from 'next/head'




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
        <div id="container">
            <Head>
                <title> {mediaInfo.Title} ({mediaInfo.Year}) </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar/>
            <div id="main">
            <div id="info">
                <div id="titleContainer">
                <h1> {mediaInfo.Title} ({mediaInfo.Year}) </h1>
                <p><span> {mediaInfo.Rated} | {mediaInfo.Runtime} | {mediaInfo.Type}</span></p>
                </div>
                <p><span id="bold">Genre:</span> {mediaInfo.Genre.map((genre, i) => <span key={i}>{i > 0 && ","}{genre}</span>)}</p>
                <p><span id="bold">Director:</span> {mediaInfo.Director.map((d, i) => <span key={i}>{i > 0 && ","}{d}</span>)}</p>
                <p><span id="bold">Ratings:</span></p> 
                <ul>
                 {mediaInfo.Ratings.map((r) => <div>
                    <li id="rating"><p>{r.Source} : {r.Value}</p></li>
                </div>)}
                </ul>
                <p><span id="bold">Plot:</span>  {mediaInfo.Plot} </p>

            </div>
            <img id="poster" src={mediaInfo.Poster}></img>


            <div id="clear"><AddRemoveButton mediaInfo={mediaInfo}/></div>
           
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
