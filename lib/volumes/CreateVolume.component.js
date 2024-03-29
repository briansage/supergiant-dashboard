import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'
import NotFound from '../shared/NotFound.component'
import { OrbitingSatellite } from '../visuals/orbitingSatellite'

export default class CreateVolume extends React.Component {
  static propTypes = {
    app: React.PropTypes.object,
    component: React.PropTypes.object,
    fetchResources: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.shape({
      name: React.PropTypes.object.isRequired,
      size: React.PropTypes.object.isRequired,
      type: React.PropTypes.object.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props)

    this.state = { color: '#ff0000' }
  }

  componentWillMount() {
    this.props.fetchResources()

    if (this.props.component) {
      this.setState({ color: this.props.component.get('color') })
    }

    this.backgroundCanvas = new OrbitingSatellite(this.state.color)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.component !== newProps.component) {
      let color = newProps.component.get('color')

      this.setState({ color })

      this.backgroundCanvas.stop()
      this.backgroundCanvas = new OrbitingSatellite(color)
      this.backgroundCanvas.start()
    }
  }

  componentDidMount() { this.backgroundCanvas.start() }
  componentWillUnmount() { this.backgroundCanvas.stop() }

  resourcesFound() {
    const { submit, fields: { name, size, type } } = this.props
    const container_dfn = "A Container holds a Docker image with RAM and CPU " +
                          "allocations, ports, and environment variables. "    +
                          "\n\nA Component requires at least one Container "   +
                          "to run."

    return(
      <section>
        <header className='context-header'>
          <div className='context-title'>Create New Volume</div>
          <div className='context-menu' />
        </header>

        <form onSubmit={ submit(this.props) }>
          <div className='image-create-form row'>
            <aside className='col-2'>
              <p className='text-note'>
                A Volume is disk storage that can be mounted on
                a <dfn title={ container_dfn }>Container</dfn>.
              </p>

              <p className='text-note'>
                Volumes can be shared between Containers.
              </p>
            </aside>

            <fieldset className='component-create-form-fields col-5'>
              <label className='easy'>
                Create a new volume for qbox-provisioner
                <FeedbackInput type='text'
                               className='easy'
                               prompt='Volume name'
                               value={ name }
                               autoFocus='true' />
              </label>

              <div className='button-group'>
                <label>
                  <input type='radio'
                         { ...type }
                         checked={ type.value === 'gp2' }
                         value='gp2' />
                  <span className='button'>SSD</span>
                </label>
                <label>
                  <input type='radio'
                         { ...type }
                         checked={ type.value === 'st1' }
                         value='st1' />
                  <span className='button'>Magnetic</span>
                </label>
                <label>
                  <input type='radio'
                         { ...type }
                         checked={ type.value === 'io1' }
                         value='io1' />
                  <span className='button'>IOPS</span>
                </label>
              </div>

              <br/>

              <label className='easy'>
                How big is the volume?
                <input type='text'
                       { ...size }
                       className='easy inline' />
                &nbsp;GB
              </label>

              <br />

              <label>
                <button type='submit' className='easy with-glyph glyph-right-arrow-action-color'>
                  Create Volume
                </button>
              </label>
            </fieldset>
          </div>
        </form>
      </section>
    )
  }

  render() {
    const { component } = this.props

    return component ? this.resourcesFound() : <NotFound />
  }
}
