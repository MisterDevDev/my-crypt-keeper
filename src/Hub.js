import React from 'react'
import {connect} from 'react-redux'

const Hub = () => {
    return(
        <div>
        </div>
    )
}

const mapState = state => {
    return {
      state
    }
  }

// const mapDispatch = dispatch => {}

export default connect(mapState)(Hub);