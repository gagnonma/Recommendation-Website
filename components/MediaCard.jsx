import React from 'react'
import Link from 'next/link'
import AddRemoveButton from './AddRemoveButton'



function MediaCard({media}) {
    console.log(media.poster)
    return (
        <div id="mediaCard">
            <Link href={`/title/${media.imdbID}`}><img src={media.Poster} /></Link>
            <p>{media.Title}</p>
            <p>{media.imdbRating}</p>
            <AddRemoveButton mediaInfo={media} />
        </div>
    )
}

export default MediaCard



// const Media = ({title, poster, rating}) => (
//     <div>
//         <img src={poster} />
//         <div>
//             <p>{title}</p>
//             <p>{rating}</p>
//         </div>
//     </div>

// );