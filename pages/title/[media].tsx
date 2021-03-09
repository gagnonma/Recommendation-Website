import { useRouter } from 'next/router'
import { getRecommendations } from '../../util/getRecommedations'
import { connectToDatabase } from "../../util/mongodb"
import NavBar from '../../components/NavBar'
import MediaCard from '../../components/MediaCard'
import { useContext } from 'react'
import AccountContext from '../../contexts/account'
import DropdownButton from 'react-bootstrap/DropdownButton'


export default function Media ({mediaInfo, recs}){
    // console.log(mediaInfo.recs[0])
    const {account, loggedIn, login,logout} = useContext(AccountContext)
    const addToList = async(e) => {
        account.lists[0].mediaList.push(mediaInfo)
        const info = {
            username: account.username,
            lists: account.lists
        }
        try {
            const res = await fetch('/api/addMediaToList', {
                method: 'post',
                body: JSON.stringify(info)
            })
        } catch (error) {
            console.log(error)
        }
    } 

    return (
        <div>
            <NavBar/>
            <h1> {mediaInfo.Title} </h1>
            <img src={mediaInfo.Poster}></img>
            <p> {mediaInfo.Plot} </p>

            {loggedIn ? (
                <div>
                    <button onClick={addToList} >Add to watched</button>
                </div>
            ) : (
                <div></div>
            )}
           
            <h1>Your Recommendations are: </h1>
            {recs.map((media) => (
                <MediaCard media={media}/>
            ))}
        </div>
    )
}



export async function getServerSideProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const { db } = await connectToDatabase()

    var query = {imdbID : params.media}

    const mediaInfo = await db
    .collection("MoviesAndTv")
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
