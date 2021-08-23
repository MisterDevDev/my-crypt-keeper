import axios from 'axios'
import React from 'react'


const Home = () => {
    const cookie = document.cookie
    const slicedCookie = cookie.slice(cookie.indexOf('=') + 1)

    const listAccounts = async() => {
        const data = await axios.get(`/auth/list/${slicedCookie}`)
        console.log('i got the data!!!', data)
    }

    return (
        <div>
            <div>
                Home is here!
            </div>   
            <button onClick={listAccounts}>
                list accounts
            </button>       
        </div>
    )
}

export default Home