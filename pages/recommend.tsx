import { useRouter } from 'next/router'
import { connectToDatabase } from "../util/mongodb"
import { getRecommendations } from "../util/getRecommendations"
import NavBar from '../components/NavBar'
import MediaCard from '../components/MediaCard'
import { useCurrentUser } from '../hooks/index';
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import { Checkbox, FormControlLabel, FormLabel, Grid, IconButton, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import Head from 'next/head'




const types = [
    {
        value: "both",
        label: "Both"
    },
    {
        value: "movie",
        label: "Movies"
    },
    {
        value: "series",
        label: "Tv Shows"
    }
]

const g = {
    "Action" : false,
    "Adventure" : false,
    "Animation" : false,
    "Biography" : false,
    "Comedy" : false,
    "Crime" : false,
    "Documentary" : false,
    "Drama" : false,
    "Family" : false,
    "Fantasy" : false,
    "Film-Noir" : false,
    "Game-Show" : false,
    "History" : false,
    "Horror" : false,
    "Music" : false,
    "Musical" : false,
    "Mystery" : false,
    "News" : false,
    "Reality-TV" : false,
    "Romance" : false,
    "Sci-Fi" : false,
    "Sport" : false,
    "Talk-Show" : false,
    "Thriller" : false,
    "War" : false,
    "Western" : false
}

// const theme = createMuiTheme({
//     palette: {
//       type: "dark",
//     }
//   });

const StyledFormControlLabel = withStyles({
    label: {
        color: 'white',
        fontFamily: "'Courier New', Courier, monospace",
    }
})(FormControlLabel);


export default function Recommend() {
    const [user, { mutate }] = useCurrentUser();
    const [recs, setRecs] = useState([])
    const [type, setType] = useState('both')
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(10)
    const [genreList, setGenreList] = useState(g)
    const [displayFilters, setDisplayFilters] = useState(false)
    console.log(recs)

    const handleTypeChange = (e) => {
        setType(e.target.value)
        // console.log(type)
    }

    const handleMinChange = (e) => {
        setMin(parseInt(e.target.value))
    }

    const handleMaxChange = (e) => {
        setMax(parseInt(e.target.value))
    }

    const handleGenreChange = name => e => {
        setGenreList({...genreList, [name]: e.target.checked})
        // var temp = genreList
        // temp[name] = !temp[name]
        // setGenreList(temp)
        // setGenreList(genreList)
    }

    const showFilters = (e) => {
        setDisplayFilters(!displayFilters)
    }

    const getRecs = async(e) => {
        var genres = []
        var scoreMin = min
        var scoreMax = max
        var types = []
        for (const [genre, checked] of Object.entries(genreList)) {
            if (checked) {
                genres.push(genre)
            }
        }
        if (min > 10 || min < 0) {
            scoreMin = 0
        }

        if (max > 10 || max < 0) {
            scoreMax = 10
        }

        if (type == 'both') {
            types = ['movie', 'series']
        } else {
            types = [type]
        }

        const info = {
            movieList: user.lists[0].idList,
            genreList: genres,
            type: types,
            min: scoreMin,
            max: scoreMax
        }
        console.log(info)
        try {
            const res = await fetch('/api/getRecommendations', {
                method: 'post',
                body: JSON.stringify(info)
            })
            const response = await res.json()
            console.log(response)
            setRecs(response.recs)
        } catch (error) {
            console.log(error)
        }        
        window.scrollBy(0, 500)
    }
    // Filters: Genres, Score Range, type
    //Sort by: score, popularity, similarity

    return (
        <div>
            <Head>
                <title> MMDB Recommendations </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar/>
            <div id="main">
            {user ? (
            <div>
            

            <h2>Filters</h2>

            {/* <ThemeProvider theme={theme}> */}
        
            {displayFilters ? (
                <div>
                    
                    <IconButton onClick={showFilters}>
                        <RemoveIcon/>
                    </IconButton>

                    <br/>

                    <TextField
                        id='scoreMin'
                        label='Minimum Score'
                        type='number'
                        value={min}
                        onChange={handleMinChange}
                    />
                    <TextField
                        id='scoreMax'
                        label='Maximum Score'
                        type='number'
                        value={max}
                        onChange={handleMaxChange}
                    />

                    <TextField
                        id="selectType"
                        select
                        label="Type"
                        value={type}
                        onChange={handleTypeChange}
                        helperText="Please select the media type"
                    >
                    {types.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                    <FormLabel component="legend" >Genres</FormLabel>
                    <br/>
                    <Grid lg={10} md={5} sm={3} spacing={2} container={true}>
                        {Object.entries(genreList).map(([genre, checked]) => (
                            <StyledFormControlLabel
                                control={
                                    <Checkbox checked={checked} onChange={handleGenreChange(genre)} value={genre} />
                                }
                                label = {genre}
                            />
                        ))}

                    </Grid>
                </div>
            ) : (
                <div>
                    <IconButton onClick={showFilters}>
                        <AddIcon  style={{ color: 'white'}} />
                    </IconButton>
                </div>
            )}

            {/* </ThemeProvider> */}
                
                
                
            <h1>Your Recommendations are: </h1>
            <Button onClick={getRecs} variant='contained'>Generate Recommendations</Button>
            <br/>
            <div id='list'>
            {recs.map((media) => (
                <MediaCard media={media}/>
            ))}
            </div>
            </div>) : (<h1>Please log in</h1>)}
            </div>
        </div>
    )
}

// export async function getServerSideProps({ params }) {
    


//     const testMovies1 = ["tt0903747", "tt0903747", "tt1345836"]
//     const testMovies2 = ["tt0903747", "tt0994314", "tt1345836"]


//     // const recommendations  = await getRecommendations(user.lists[0].idList);

//     return {
//         props: {
//             recs: recommendations
//         }
//     }
// }