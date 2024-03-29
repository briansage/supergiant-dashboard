import { connect } from 'react-redux'
import { getComponentInstances } from '../selectors'
import { fetch } from './instances.actions'
import Instances from './Instances.component'

function mapStateToProps(state, props) {
  const { app, component } = props
  const instances = getComponentInstances(app, component)(state, props)

  return { instances }
}

function mapDispatchToProps(dispatch, props) {
  const { app, component } = props
  const fetchResources = () => {
    dispatch(fetch(app.get('name'), component.get('name'), `current`))
    dispatch(fetch(app.get('name'), component.get('name'), `target`))
  }

  return { fetchResources }
}

export default connect(mapStateToProps, mapDispatchToProps)(Instances)
