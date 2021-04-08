import React from 'react'
import { useCurrentUser } from '../hooks/index';
import {useState} from'react'
import { Button } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'


const StyledButton = withStyles({
    root: {
        fontFamily: "'Courier New', Courier, monospace",
    }
})(Button);

function AddRemoveButton({mediaInfo}) {
    const [user, { mutate }] = useCurrentUser();

    // console.log(mediaInfo)

    const isInList = () => {
        if (user) {
            // console.log(`IS IN LIST: ${user.lists[0].mediaList} ${mediaInfo.imdbID}`)
            for (const title of user.lists[0].mediaList) {
                // console.log(`Title: ${title.imdbID} Mi: ${mediaInfo.imdbID}`)
                if (title.imdbID == mediaInfo.imdbID) {
                    return true
                }
            }
            return false
        }else {
            return false
        }
    }
    const temp = isInList()
    const [inList, setInList] = useState(temp);

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
                setInList(false)
                setInList(true)
            } catch (error) {
                console.log(error)
            }
        } else {
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
        // console.log( user.lists[0].mediaList)
        const info = {
            email: user.email,
            lists: user.lists
        }
        try {
            const res = await fetch('/api/updateUserLists', {
                method: 'post',
                body: JSON.stringify(info)
            })
            setInList(false)
        } catch (error) {
            console.log(error)
        }
    }
    

    return (
        <div>
            {user ? (
                <div>
                    <p>{inList}</p>
                    {isInList() ? (
                        <StyledButton variant="contained" onClick={removeFromList}>Remove from watched</StyledButton>
                    ) : (
                        <StyledButton variant="contained" onClick={addToList} >Add to watched</StyledButton>
                    )}  
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default AddRemoveButton
