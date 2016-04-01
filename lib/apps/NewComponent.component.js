import React from 'react'

const NewComponent = ({ click }) =>
  <button className='dashboard-new' onClick={ click }>
    New
  </button>

NewComponent.propTypes = {
  appId: React.PropTypes.string.isRequired,
  click: React.PropTypes.func.isRequired
}

export default NewComponent