import React from 'react'

const ButtonGroup = ({ children }) =>
  <div className='button-group'>
    { children }
  </div>

ButtonGroup.propTypes = { children: React.PropTypes.node.isRequired }

export default ButtonGroup
