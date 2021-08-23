import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'


//https://dev.to/vinodchauhan7/react-hooks-with-async-await-1n9g
//helpful async useEffect article 

const Auth = (props) => {
    const [publicKey, setPublicKey] = useState(() => [])
    const [secretKey, setSecretKey] = useState(() => [])

    useEffect(() => fetchPublicKey(), [])
    useEffect(() => fetchSecretKey(), [])


    async function fetchPublicKey() {
        try {
            const {data} = await axios.get('/auth/oauth')
            setPublicKey(data)
        } catch (error) {
            console.log('Fetch Public Key Failed')
        }
    }

    async function fetchSecretKey() {
        try {
            const {data} = await axios.get('/auth/access')
            setSecretKey(data)
        } catch (error) {
            console.log('Fetch Secret Key Failed')
        }
    }

    const storeAccess = async() => {
        try {
            if(_key){
                const {data} = await axios.post(access_url, accessPost)
                makeCookie(data.access_token)
                console.log('coinbase response data', data)
                props.history.push('/home')
            } else console.log('no token available')
        } catch (error) {
            console.log('Store Accesss Failed')
        }
    }

    const makeCookie = (data) => { 
        const now = new Date();
        let time = now.getTime();
        let withHours = time + 2 * 60 * 60 * 1000
        now.setTime(withHours);
        let expireTime = `expires=${now.toUTCString()}`;
        document.cookie = `cookie=${data};${expireTime}`
      }



    let _key = props.location.search

    if(_key){
        _key = _key.slice(_key.indexOf('=') + 1, _key.indexOf('&'))
    }

    const coinbase_url = 'https://www.coinbase.com/oauth/authorize?'
    const response = 'response_type=code'
    const clientId = `&client_id=${publicKey}`
    const redirect_uri = '&redirect_uri=http://localhost:8080/' //'&redirect_uri=https://fast-brook-16275.herokuapp.com/'
    const secure_code = '&state=4t5e6s7t8'
    const scope = '&scope=wallet:accounts:read'

    const coinbaseOauth = 
    `${coinbase_url}${response}${clientId}${redirect_uri}${secure_code}${scope}`

    //After accessToken aquired
    const access_url = 'https://api.coinbase.com/oauth/token'
    const type = 'grant_type=authorization_code'
    const code = `&code=${_key}`
    const secret = `&client_secret=${secretKey}`

    const accessPost = 
    `${type}${code}${clientId}${secret}${redirect_uri}`

    return(
        <div>
            {_key ? 
            <div>
                <div>
                    Access granted! Proceed to the crypt!
                </div>
                <button onClick={storeAccess}>Enter Crypt</button>
             </div>
            :
            <a href={`${coinbaseOauth}`}>Try me!!</a>}
        </div>
    )
}

export default Auth

