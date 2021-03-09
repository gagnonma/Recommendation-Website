
import React from 'react'
import MediaCard from './MediaCard'

function List({list}) {
    console.log(list)

    // const getMediaList = async(e) => {
    //     try {
    //         const res = await fetch('/api/getMediaList', {
    //             method: 'post',
    //             body: JSON.stringify({idList: list.ids})
    //         })
    //         const response = await res.json()
    //         mediaList = response.mediaList
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     return mediaList
    // }

    return (
        <div>
            <h2>{list.name}</h2>
            {list.mediaList.map((media) => (
                <MediaCard media={media}/>
            ))}

        </div>
    )
}


export default List