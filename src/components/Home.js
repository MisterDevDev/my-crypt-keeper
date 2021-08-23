import axios from 'axios'
import React from 'react'


const Home = () => {
    const cookie = document.cookie
    const [access, refresh] = cookie.slice(cookie.indexOf('=') + 1).split('&')

    const listAccounts = async(access, refresh) => {
        const data = await axios.post(`/auth/list`, {access, refresh})
        console.log('i got the data!!!', data)
    }

    return (
        <div>
            <div>
                Home is here!
            </div>   
            <button onClick={() => listAccounts(access, refresh)}>
                list accounts
            </button>       
        </div>
    )
}

export default Home