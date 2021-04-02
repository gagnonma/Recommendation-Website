import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'
import { useContext } from 'react'
import NavBar from '../components/NavBar'
import Link from 'next/link'
import { useCurrentUser } from '../hooks/index';



export default function Home({ isConnected }) {
  const [user, { mutate }] = useCurrentUser();

  return (
    <div id="container">
      <Head>
        <title>MMDB</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar/>
      <div id='main' >
       <img id="banner" src="/mmdbBanner.jpg" alt="MMDB banner image"/>
       
        <h1 className="title">
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
        <Link href="/title/tt0796366"><button>Star Trek</button></Link>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()

  const isConnected = await client.isConnected()

  return {
    props: { isConnected },
  }
}
