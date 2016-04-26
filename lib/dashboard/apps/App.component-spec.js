import App from './App.component'

describe("App", () => {
  it("binds follow to the star figure", () => {
    let follow = () => {}
    let target = getOutput(<App follow={ follow } />)
    let [wrapper] = target.props.children
    let figure = wrapper.props.children

    expect(figure.type).to.equal('figure')
    expect(figure.props.onClick).to.equal(follow)
  })
})
