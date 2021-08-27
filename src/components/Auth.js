import axios from 'axios'
import React, { useState, useEffect } from 'react'
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
                const { data } = await axios.post(access_url, accessPost)
                console.log('data from fetching api key', data)
                await axios.put(`/auth/set/${_user}`, {key:data.access_token})
                props.history.push('/home')
            } else console.log('no token available')
        } catch (error) {
            console.log(error)
        }
    }


    let _key = props.location.search

    if (_key) {
        _key = _key.slice(_key.indexOf('=') + 1, _key.indexOf('&'))
    }

    const coinbase_url = 'https://www.coinbase.com/oauth/authorize?'
    const response = 'response_type=code'
    const clientId = `&client_id=${publicKey}`
    const redirect_uri = '&redirect_uri=http://localhost:8080/auth' //'&redirect_uri=https://fast-brook-16275.herokuapp.com/' 
    const secure_code = '&state=4t5e6s7t8'
    const scope = '&account_currency=BTC,ETH,ADA&account=all&scope=wallet:transactions:send'
    const limit = '&meta[send_limit_amount]=1&meta[send_limit_currency]=USD&meta[send_limit_period]=day'
    const coinbaseOauth =
        `${coinbase_url}${response}${clientId}${redirect_uri}${secure_code}${scope}${limit}`

    return (
        <div className='authPage'>
        <section class="section">
        <div className='authCard' class="card mt-6">
            <div class="card-content">
                <div>
                <img className='authImg' src="https://mckeeper.s3.us-east-2.amazonaws.com/mckeeper2.png" />
                </div>
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
            <div className='spacerDiv'></div>
            <footer class="card-footer">
                <p class="card-footer-item">
                    {_key ?
                        <button class="button is-success" onClick={storeAccess}>
                            Enter the crypt!
                        </button>
                        :
                        <a href={`${coinbaseOauth}`}>
                            <button class="button is-warning is-large">
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

