import axios from 'axios'
import React from 'react'


const Home = () => {
    const cookie = document.cookie
    const [access, refresh] = cookie.slice(cookie.indexOf('=') + 1).split('&')

    // const listAccounts = async(access, refresh) => {
    //     const data = await axios.post(`/auth/list`, {access, refresh})
    //     console.log('i got the data!!!', data)
    // }

    const listAccounts = async(access) => {
        const data = await axios.get(`/auth/list/${access}`, {access, refresh})
        console.log('i got the data!!!', data)
    }

    const listCurrencies = async(access, refresh) => {
        const data = await axios.post(`/auth/currencies`, {access, refresh})
        console.log('i got the data!!!', data)
    }

    return (
      <div>
        Home
      </div>
    )
} 

export default Home