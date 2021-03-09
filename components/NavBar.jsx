import React, { useContext } from 'react'
import AccountContext from '../contexts/account'
import Link from 'next/link'


function NavBar() {
    const {account, loggedIn, login,logout} = useContext(AccountContext)
    return (
        <div>
            {loggedIn ? (
                <div>
                    <h3>Welcome {account.username}</h3>
                    <Link href="/profile"><button>My Account</button></Link>
                    <Link href='/recommend'><button>My Recommendations</button></Link>
                    <Link href='/'><button>Home</button></Link>
                </div>
            ) : (
                <div>
                    <button>Create an Account</button>
                    <button>Log In</button>
                    <Link href='/'><button>Home</button></Link>
                </div>
            )}
        </div>
    )
}

export default NavBar
