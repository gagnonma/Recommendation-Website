import NavBar from '../components/NavBar'
import { useContext } from 'react'
import AccountContext from '../contexts/account'
import List from '../components/List'
import { useCurrentUser } from '../hooks/index';


export default function Profile() {
    const [user, { mutate }] = useCurrentUser();

    return (
        <div>
            <div>
             <NavBar/>
             {user ? (
                <div id="main">
                    <h1>Hello {user.name}</h1>
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