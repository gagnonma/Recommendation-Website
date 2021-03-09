import {useEffect} from 'react'
import { submitAccount} from '../util/utils'



function CreateAccount() {
    var username, password;

    const handleSubmit = async(e) => {
        e.preventDefault();
        const info = {
            username : username,
            password : password
        }
        try {
            const res = await fetch('http://localhost:3000/api/createAccount', {
                method: 'post',
                body: JSON.stringify(info)
            })
            console.log(res)
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
                <label>Username: 
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

export default CreateAccount
