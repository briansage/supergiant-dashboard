import React from 'react'
import FeedbackInput from '../shared/FeedbackInput.component'
import { DockerConstellation } from '../visuals/dockerConstellation'

export default class CreateRegistry extends React.Component {
  static propTypes = {
    submit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.shape({
      name: React.PropTypes.object.isRequired,
      password: React.PropTypes.object.isRequired,
      username: React.PropTypes.object.isRequired
    }).isRequired
  }

  componentWillMount() { this.backgroundCanvas = new DockerConstellation() }
  componentDidMount() { this.backgroundCanvas.start() }
  componentWillUnmount() { this.backgroundCanvas.stop() }

  render() {
    const { submit, fields } = this.props
    const { name, username, password, email } = fields
    return(
      <section>
        <header className='context-header'>
          <div className='context-title'>Connect to a Docker Repository</div>
          <div className='context-menu' />
        </header>

        <form onSubmit={ submit(this.props) }>
          <div className='repository-create table-row'>
            <div className='col-2'>
              <aside>
                <p className='text-note'>
                  Connect to any number of private docker repositories by adding
                  repository credentials.
                </p>

                <p className='text-note'>
                  When you add an image to a Component, Supergiant will
                  automatically use the correct credentials.
                </p>
              </aside>
            </div>

            <fieldset className='col-5'>
              <label className='easy'>
                Name your Repository.
                <FeedbackInput type='text'
                               className='easy'
                               prompt='Docker Repository Name'
                               autoFocus='true'
                               value={ name } />
              </label>
            </fieldset>
          </div>

          <div className='table-row'>
            <div className='col-2'>&nbsp;</div>

            <fieldset className='col-4'>
              <label className='easy'>Enter repository credentials.</label>

              <label>
                <FeedbackInput type='email'
                               prompt='email'
                               value={ email } />
              </label>

              <label>
                <FeedbackInput type='text'
                               prompt='username'
                               value={ username } />
              </label>

              <label>
                <FeedbackInput type='password'
                               prompt='password'
                               value={ password } />
              </label>

              <br /><br /><br />

              <button type='submit'
                      className='with-glyph glyph-right-arrow-action-color'>
                Save
              </button>
            </fieldset>
          </div>
        </form>
      </section>
    )
  }
}
