import React, { useContext } from 'react'
import AccountContext from '../contexts/account'
import Link from 'next/link'
import SearchBar from '../components/SearchBar'
import { useCurrentUser } from '../hooks/index';
import { AppBar, Button } from '@material-ui/core';
import styles from './NavBar.module.scss'


function NavBar() {

    const [user, { mutate }] = useCurrentUser();

    const handleLogout = async () => {
        await fetch('/api/auth', {
          method: 'DELETE',
        });
        // set the user state to null
        mutate(null);
      };

    return (
        <div id='navbar'>
            <div>
            <Link href='/'><Button  variant="contained">Home</Button></Link>
            </div>
            <SearchBar/>
            {user ? (
                <div>
                    <Link href='/recommend'><Button  variant="contained">My Recommendations</Button></Link>
                    <Link  href="/profile"><Button  variant="contained">My Account</Button></Link>
                    <Button  variant="contained" onClick={handleLogout}>Logout</Button>
                </div>
            ) : (
                <div>
                    <Link href='/signup'><Button  variant="contained">Create an Account</Button></Link>
                    <Link href='/login'><Button  variant="contained">Log in</Button></Link>
                </div>
            )}
        </div>
    )
}

export default NavBar
