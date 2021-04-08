import React, { useContext } from 'react'
import AccountContext from '../contexts/account';

function Login() {
    const {account, loggedIn, login,logout} = useContext(AccountContext)
    var username, password;

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(login)
        const info = {
            username : username,
            password : password
        }
        try {
            const res = await fetch('/api/validatePassword', {
                method: 'post',
                body: JSON.stringify(info)
            })
            const response = await res.json()
            login(response.account)
        } catch (error) {
            console.log(error)
        }
       
    
    }
    
    const setUsername = (e) => {
        username = e.target.value;
    }

    const setPassword = (e) => {
        password = e.target.value
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label><p> Email Address: </p> 
                    <input 
                    type="text" 
                    value={username} 
                    onChange={setUsername}/>
                    </label><br/>
                <label>Password: 
                    <input 
                    type="text" 
                    value={password}
                    onChange={setPassword} /></label><br/>
                <input type="submit" value="Submit"/>                
            </form>
        </div>
    )
}

export default Login
