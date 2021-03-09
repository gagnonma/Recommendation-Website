import React from 'react'

function MediaCard({media}) {
    console.log(media.poster)
    return (
        <div>
            <img src={media.Poster} />
            <p>{media.Title}</p>
            <p>{media.imdbRating}</p>
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