import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'
import { useContext, useState } from 'react'
import NavBar from '../components/NavBar'
import Link from 'next/link'
import { useCurrentUser } from '../hooks/index';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {IconButton} from '@material-ui/core';
import MediaCard from '../components/MediaCard';




export default function Home({ isConnected, top50Movies, top50Tv }) {
  const [user, { mutate }] = useCurrentUser();
  const [showTopMovies, setShowTopMovies] = useState(false)
  const [showTopSeries, setShowTopSeries] = useState(false)

  const updateShowTopMovies = (e) => {
    setShowTopMovies(!showTopMovies)
  }

  const updateShowTopSeries = (e) => {
    setShowTopSeries(!showTopSeries)
  }


  return (
    <div id="container">
      <Head>
        <title>MMDB</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar/>
      <div id='main' >
       <img id="banner" src="/mmdbBanner.jpg" alt="MMDB banner image"/>

      <div id="listContainer">
       <h2>Top 50 IMDB Rated Movies</h2>
       {showTopMovies ? (
          <IconButton onClick={updateShowTopMovies}>
            <RemoveIcon/>
          </IconButton>
       ) : (
          <IconButton onClick={updateShowTopMovies}>
            <AddIcon/>
          </IconButton>
       )}

       {showTopMovies ? (
          <div>
            <br/>
            <div id='list'>
            {top50Movies.map((media) => (
                <MediaCard media={media}/>
            ))}
            </div>
          </div>) : (<br/>)}
        </div>

        <div id="listContainer">
       <h2>Top 50 IMDB Rated Tv Series</h2>
       {/* {showTop ? (
          <IconButton onClick={updateShowTopMovies}>
            <RemoveIcon/>
          </IconButton>
       ) : (
          <IconButton onClick={updateShowTopMovies}>
            <AddIcon/>
          </IconButton>
       )} */}

       {showTopSeries ? (
          <div>
            <IconButton onClick={updateShowTopSeries}>
              <RemoveIcon/>
            </IconButton>
            <br/>
            <div id='list'>
            {top50Tv.map((media) => (
                <MediaCard media={media}/>
            ))}
            </div>
          </div>) : (
            <div>
              <IconButton onClick={updateShowTopSeries}>
                <AddIcon/>
              </IconButton>
          <br/></div>)}
        </div>

      

      <br/><br/><br/>

       
        {/* <h1 className="title">
          Welcome to Max's Movie Database
        </h1>

        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}

        <br/>
        {user ? (
          <h2>Logged in</h2>
        ) : (
          <h2>Not Logged In</h2>
        )}
        
        <h2>Sample Movies</h2>
        <Link href="/title/tt0386676"><button>The Office</button></Link>
        <Link href="/title/tt0796366"><button>Star Trek</button></Link> */}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { client, db } = await connectToDatabase()

  const isConnected = await client.isConnected()

  const top50Movies = await db.collection("MaxsMoviesAndTv").aggregate(
    [
      {
        '$match': {
          'Type': 'movie', 
          'imdbVotes': {
            '$gt': 10000
          }
        }
      }, {
        '$sort': {
          'imdbRating': -1
        }
      }, {
        '$limit': 50
      }
    ]
  ).toArray();  

  const top50Tv = await db.collection("MaxsMoviesAndTv").aggregate(
    [
      {
        '$match': {
          'Type': 'series', 
          'imdbVotes': {
            '$gt': 10000
          }
        }
      }, {
        '$sort': {
          'imdbRating': -1
        }
      }, {
        '$limit': 50
      }
    ]
  ).toArray();  

  return {
    props: { isConnected : isConnected,
      top50Movies : JSON.parse(JSON.stringify(top50Movies)),
      top50Tv: JSON.parse(JSON.stringify(top50Tv)) },
  }
}
