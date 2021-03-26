import React from 'react'
import { useCurrentUser } from '../hooks/index';
import {useState} from'react'
import { Button } from '@material-ui/core';

function AddRemoveButton({mediaInfo}) {
    const [user, { mutate }] = useCurrentUser();

    // console.log(mediaInfo)

    const isInList = () => {
        if (user) {
            console.log(`IS IN LIST: ${user.lists[0].mediaList} ${mediaInfo.imdbID}`)
            for (const title of user.lists[0].mediaList) {
                // console.log(`Title: ${title.imdbID} Mi: ${mediaInfo.imdbID}`)
                if (title.imdbID == mediaInfo.imdbID) {
                    console.log("It should be true")
                    return true
                }
            }
            console.log("BIG FALLSE")
            return false
        }else {
            return false
        }
    }
    const temp = isInList()
    const [inList, setInList] = useState(temp);
    console.log(inList)

    const addToList = async(e) => {
        if (!isInList()) {
            user.lists[0].mediaList.push(mediaInfo)
            user.lists[0].idList.push(mediaInfo.imdbID)
            const info = {
                email: user.email,
                lists: user.lists
            }
            try {
                const res = await fetch('/api/updateUserLists', {
                    method: 'post',
                    body: JSON.stringify(info)
                })
                console.log("SETTING TRUE")
                setInList(false)
                setInList(true)
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log("SETTING TRUE KINDA SUS")
            setInList(false)

            setInList(true)
        }
    }

    const removeFromList = async (e) => {
        let index = -1
        for (let i = 0; i < user.lists[0].mediaList.length; i++) {
            if (user.lists[0].mediaList[i].imdbID == mediaInfo.imdbID) {
                index = i
                break;
            }
        }
        index > -1 ? user.lists[0].mediaList.splice(index, 1) : false
        const idIndex =  user.lists[0].idList.indexOf(mediaInfo.imdbID)
        idIndex > -1 ? user.lists[0].idList.splice(idIndex, 1) : false
        console.log( user.lists[0].mediaList)
        const info = {
            email: user.email,
            lists: user.lists
        }
        try {
            const res = await fetch('/api/updateUserLists', {
                method: 'post',
                body: JSON.stringify(info)
            })
            console.log("SETTING FALSE")
            setInList(false)
        } catch (error) {
            console.log(error)
        }
    }
    
    console.log(inList)

    return (
        <div>
            {user ? (
                <div>
                    <p>{inList}</p>
                    {isInList() ? (
                        <Button variant="contained" onClick={removeFromList}>Remove from watched</Button>
                    ) : (
                        <Button variant="contained" onClick={addToList} >Add to watched</Button>
                    )}  
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default AddRemoveButton
