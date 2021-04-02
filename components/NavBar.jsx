import React, { useContext } from 'react'
import AccountContext from '../contexts/account'
import Link from 'next/link'
import SearchBar from '../components/SearchBar'
import { useCurrentUser } from '../hooks/index';
import { AppBar, span } from '@material-ui/core';
import styles from './NavBar.module.scss'
import Search from './Search';


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
        <div className={styles.navbar}>
            
            {user ? (
                    <ul className={styles.nav_ul}>
                        <li className={styles.nav_li}><Link href='/'><img className={styles.logo} src="/mmdb.png" alt="mmdb logo"/></Link></li>
                        <li className={styles.nav_li}><SearchBar/></li>
                        <li className={styles.nav_li_right}><span style={{color: '#22f617'}} className={styles.navbtn}onClick={handleLogout}>Logout</span></li>
                        <li className={styles.nav_li_right}><Link  href="/profile"><span style={{color: '#178af6'}}  className={styles.navbtn}>My Account</span></Link></li>
                        <li className={styles.nav_li_right}><Link href='/recommend' ><span style={{color: '#e11717'}} className={styles.navbtn}>My Recommendations</span></Link></li>

                    </ul>
                    ) : (
                <ul className={styles.nav_ul}>
                    <li><Link href='/'><span  className={styles.navbtn}>Home</span></Link></li>
                    <li><SearchBar/></li>
                    <li><Link href='/signup'><span className={styles.navbtn}>Create an Account</span></Link></li>
                    <li><Link href='/login'><span className={styles.navbtn}>Log in</span></Link></li>
                </ul>
            )}
        </div>
    )
}

export default NavBar
