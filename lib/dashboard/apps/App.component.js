import React, { Component } from 'react'

const App = ({ app, components, follow }) =>
  <div className='dashboard-app'>
    <div className='dashboard-app-star'>
      <figure className='star' onClick={ follow } />
    </div>
    <div className='dashboard-app-detail'>
      <header className='app-detail-header'>
        <menu className='app-context-menu'>
          {/*<NewComponent app={ app }/>*/}
        </menu>
        {/*<AppInstanceStats app={ app } components={ components } />*/}
      </header>
      {/*<Components app={ app } components={ components } />*/}
    </div>
  </div>

App.propTypes = {
  app: React.PropTypes.object.isRequired,
  components: React.PropTypes.object,
  follow: React.PropTypes.func.isRequired
}

export default App
