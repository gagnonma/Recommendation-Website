import NavBar from '../components/NavBar'
import { useContext } from 'react'
import AccountContext from '../contexts/account'
import List from '../components/List'
import { useCurrentUser } from '../hooks/index';


export default function Profile() {
    const {account, loggedIn, login,logout} = useContext(AccountContext)
    const [user, { mutate }] = useCurrentUser();

    return (
        <div>
            <div>
             <NavBar/>
             {user ? (
                <div>
                    <h2>{user.name}</h2>
                    <h2>Your Lists</h2>
                    {user.lists.map((l) => (
                        <List list={l}/>
                    ))}

                </div>
            ) : (
                <div>
                    <h1>Please log in or create an account</h1>
                </div>
            )}
        </div>
        </div>
    )
}