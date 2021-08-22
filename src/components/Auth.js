import axios from 'axios'
import React, { useState, useEffect } from 'react'

//https://dev.to/vinodchauhan7/react-hooks-with-async-await-1n9g
//helpful async useEffect article 

const Auth = () => {
    const [publicKey, setPublicKey] = useState(() => [])

    async function fetchPublicKey() {
        try {
            const {data} = await axios.get('/auth/oauth')
            setPublicKey(data)
        } catch (error) {
            console.log('Fetch Public Key Failed')
        }
    }

    useEffect(() => fetchPublicKey(), [])
    const coinbase_url = 'https://www.coinbase.com/oauth/authorize?'
    const response = 'response_type=code'
    const clientId = `&client_id=${publicKey}`
    const redirect_uri = '&redirect_uri=https://fast-brook-16275.herokuapp.com/'
    const secure_code = '&state=4t5e6s7t8'
    const scope = '&scope=wallet:accounts:read'

    const coinbaseOauth = 
    `${coinbase_url}${response}${clientId}${redirect_uri}${secure_code}${scope}`

    return(
        <div>
            <a href={`${coinbaseOauth}`}>Try me!!</a>
        </div>
    )
}

export default Auth

//What response looks like
//https://fast-brook-16275.herokuapp.com/?
//code=c3253afba36b66070e60c48afe54932d3f768844fe717c269942c82b9b49cb72
//&state=4t5e6s7t8