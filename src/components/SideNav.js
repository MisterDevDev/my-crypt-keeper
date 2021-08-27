import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";


const SideNav = (props) => {
    return(
        <div class="column is-3">
            <div class="buttons">
                    <button class="button is-medium is-fullwidth is-info is-rounded">
                        <Link className='linkText' to={`/friends/${props.state.auth.id}`}>
                            Friends List
                        </Link>
                    </button>
                <button class="button is-medium is-fullwidth is-info is-rounded">Charity Cases</button>
                <button class="button is-medium is-fullwidth is-info is-rounded">Buy New Crypto</button>
            </div>

        </div>
    )
}

const mapState = (state) => {
    return {
        state
    };
  };

export default connect(mapState)(SideNav)