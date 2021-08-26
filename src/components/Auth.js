import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";


//https://dev.to/vinodchauhan7/react-hooks-with-async-await-1n9g
//helpful async useEffect article 

const Auth = (props) => {
    const [publicKey, setPublicKey] = useState(() => [])

    useEffect(() => fetchPublicKey(), [])


    async function fetchPublicKey() {
        try {
            const { data } = await axios.get('/auth/oauth')
            setPublicKey(data)
        } catch (error) {
            console.log('Fetch Public Key Failed')
        }
    }


    const storeAccess = async () => {
        const _user = props.state.auth.id
        console.log('_user is: ~~', _user)
        try {
            if (_key) {
                console.log('my _key~~', _key)
                console.log('my accessPost var~~~', accessPost)
                const { data } = await axios.post(access_url, accessPost)
                console.log('data from fetching api key', data)
                await axios.put(`/auth/set/${_user}`, {key:data.access_token})
                props.history.push('/home')
            } else console.log('no token available')
        } catch (error) {
            console.log(error)
        }
    }
    console.log('Auths props!!!',props)
    // const makeCookie = (access, refresh) => {
    //     const now = new Date();
    //     let time = now.getTime();
    //     let withHours = time + 2 * 60 * 60 * 1000
    //     now.setTime(withHours);
    //     let expireTime = `expires=${now.toUTCString()}`;
    //     document.cookie = `cookie=${access}&${refresh};${expireTime}`
    // }



    let _key = props.location.search

    if (_key) {
        _key = _key.slice(_key.indexOf('=') + 1, _key.indexOf('&'))
    }

    const coinbase_url = 'https://www.coinbase.com/oauth/authorize?'
    const response = 'response_type=code'
    const clientId = `&client_id=${publicKey}`
    const redirect_uri = '&redirect_uri=http://localhost:8080/auth' //'&redirect_uri=https://fast-brook-16275.herokuapp.com/' 
    const secure_code = '&state=4t5e6s7t8'
    const scope = '&scope=wallet:accounts:read'

    const coinbaseOauth =
        `${coinbase_url}${response}${clientId}${redirect_uri}${secure_code}${scope}`

    //After accessToken aquired
    const access_url = 'https://api.coinbase.com/oauth/token'
    const type = 'grant_type=authorization_code'
    const code = `&code=${_key}`

    const accessPost =
        `${type}${code}${clientId}${redirect_uri}`

    return (
        <div className='authPage'>
        <section class="section">
        <div className='authCard' class="card mt-6">
            <div class="card-content">
                
                    {_key ?
                    <p class="title has-text-centered">
                        'Authentication Successful!'
                    </p>
                        :
                    <p class="title has-text-centered">
                        Welcome to Crypt Keeper<br/>
                        Please Begin By Authenticating through Coinbase
                    </p>
                    }
                
            </div>
            <footer class="card-footer">
                <p class="card-footer-item">
                    {_key ?
                        <button class="button is-success" onClick={storeAccess}>
                            Enter the crypt!
                        </button>
                        :
                        <a href={`${coinbaseOauth}`}>
                            <button class="button is-light">
                                Login
                            </button>
                        </a>

                    }
                </p>
            </footer>
        </div>
        </section>
        </div>
    )
}

const mapState = (state) => {
    return {
        state
    };
  };

  export default connect(mapState)(Auth)

