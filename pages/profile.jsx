import NavBar from '../components/NavBar'
import { useContext } from 'react'
import AccountContext from '../contexts/account'
import List from '../components/List'

export default function Profile() {
    const {account, loggedIn, login,logout} = useContext(AccountContext)
    return (
        <div>
            <h1>Hi</h1>
            <div>
             <NavBar/>
             {loggedIn ? (
                <div>
                    <h2>{account.username}</h2>
                    <h2>Your Lists</h2>
                    {account.lists.map((l) => (
                        <List list={l}/>
                    ))}

                </div>
            ) : (
                <div>
                    <h1>Please log in</h1>
                </div>
            )}
        </div>
        </div>
    )
}