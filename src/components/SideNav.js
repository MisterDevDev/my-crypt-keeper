import React from 'react'

const SideNav = () => {
    return(
        <div class="column is-3">
            <aside class="is-medium menu">
                <ul class="menu-list">
                    <li class="is-right"><a href="#const" class="is-active"><i class="fab fa-css3-alt"></i> Friends List</a></li>
                    <li><a href="#let" class="is-active"><i class="fab fa-js"></i> Your Currencies</a></li>
                    <li><a href="#let" class="is-active"><i class="fab fa-html5"></i> Buy Crypto</a></li>
                </ul>
            </aside>
        </div>
    )
}

export default SideNav