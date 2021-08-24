import axios from 'axios'
import React from 'react'
import Navbar from './Navbar'
import SideNav from './SideNav'
import Main from './Main'
import Footer from './Footer'


const Home = () => {
    const cookie = document.cookie
    const [access, refresh] = cookie.slice(cookie.indexOf('=') + 1).split('&')

    // const listAccounts = async(access, refresh) => {
    //     const data = await axios.post(`/auth/list`, {access, refresh})
    //     console.log('i got the data!!!', data)
    // }

    const listAccounts = async (access) => {
        const data = await axios.get(`/auth/list/${access}`, { access, refresh })
        console.log('i got the data!!!', data)
    }

    const listCurrencies = async (access, refresh) => {
        const data = await axios.post(`/auth/currencies`, { access, refresh })
        console.log('i got the data!!!', data)
    }

    return (
        <div className='blushDiv'>
            <Navbar />
            <div>
                <section class="section">
                    <div class="columns">
                        <SideNav />
                        <Main />
                    </div>
                </section>
            </div>
            <Footer />
            <hr />
            <div class="columns is-mobile is-centered">
                <div class="field is-grouped is-grouped-multiline">
                    <div class="control">
                        <div class="tags has-addons"><a class="tag is-link" href="https://github.com/BulmaTemplates/bulma-templates">Bulma Templates</a>
                            <span class="tag is-info">MIT license</span>
                        </div>
                    </div>
                    <div class="control">
                        <div class="tags has-addons">
                            <span class="tag is-dark">based on a pen</span>
                            <span class="tag has-addons is-warning"><a href="https://codepen.io/melanieseltzer/pen/odOXWM"><i class="fab fa-lg fa-codepen"></i></a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home