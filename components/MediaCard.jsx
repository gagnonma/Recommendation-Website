import React from 'react'
import Link from 'next/link'
import AddRemoveButton from './AddRemoveButton'



function MediaCard({media}) {
    return (
        <div id="mediaCard">
            <Link href={`/title/${media.imdbID}`}><img src={media.Poster} /></Link>
            <p>{media.Title} ({media.Year})</p>
            <p>{media.imdbRating}/10</p>
            <div id="addRemove"><AddRemoveButton mediaInfo={media} /></div>
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