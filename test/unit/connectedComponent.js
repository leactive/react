import test from 'ava'
import React from 'react'
import sinon from 'sinon'
import renderer from 'react-test-renderer'
import { createStore } from '@leactive/core'

import createConnector from '@/createConnector'

let store, connect, component

function getState() {
  return {
    field: false,
  }
}

test.beforeEach(() => {
  component = props => <div {...props} />
  store = createStore({ state: getState() })
  connect = createConnector(store)
})

test('has correct display name', t => {
  component.displayName = 'Component'
  const Component = connect(undefined, undefined)(component)

  t.is(Component.displayName, 'Connect(Component)')
})

test('has valid subscription', t => {
  const Component = connect(undefined, undefined)(component)
  const instance = new Component()
  const { subscription } = instance

  t.true(subscription instanceof Object)
  t.true(subscription.unsubscribe instanceof Function)
})

test('subscription is null after componentWillUnmount', t => {
  const Component = connect(undefined, undefined)(component)
  const render = renderer.create(<Component />)
  const instance = render.getInstance()

  render.unmount()

  t.is(instance.subscription, null)
})

test('componentWillUnmount not throws error when subscription is null', t => {
  const Component = connect(undefined, undefined)(component)
  const render = renderer.create(<Component />)
  const instance = render.getInstance()

  instance.subscription = null

  t.notThrows(render.unmount)
})

test('updates when changes related store value', t => {
  const mapState = state => ({
    field: state.field,
  })
  const Component = connect(mapState, undefined)(component)
  const render = renderer.create(<Component />)
  const instance = render.getInstance()

  instance.componentDidUpdate = () => t.pass()
  store.getState().field = true
})

test('receives props mapped from mapState', t => {
  const mapState = state => ({
    propFromState: state.field,
  })
  const Component = connect(mapState, undefined)(component)
  const json = renderer.create(<Component />).toJSON()
  
  t.deepEqual(json.props, { propFromState: store.getState().field })
})

test('receives props mapped from mapActions', t => {
  const action = sinon.stub()
  const mapActions = () => ({ action })
  const Component = connect(undefined, mapActions)(component)
  const json = renderer.create(<Component />).toJSON()
  
  t.deepEqual(json.props, { action })
})

test('receives props from parent', t => {
  const Component = connect()(component)
  const render = renderer.create(<Component propFromParent={1} />)
  const json = render.toJSON()
  
  t.deepEqual(json.props, { propFromParent: 1 })
})

test('receives all passed props together', t => {
  const propFromParent = 1
  const propFromState = store.getState().field
  const action = sinon.stub()

  const mapState = () => ({ propFromState })
  const mapActions = () => ({ action })

  const Component = connect(mapState, mapActions)(component)
  const render = renderer.create(<Component propFromParent={propFromParent} />)
  const json = render.toJSON()
  
  t.deepEqual(json.props, { action, propFromState, propFromParent })
})

test('updates mapped state and actions when state is replaced', t => {
  const mapState = state => ({ propFromState: state.field })
  const mapActions = () => ({ action: sinon.spy() })

  const connectedDecorator = connect(mapState, mapActions)
  const FirstComponent = connectedDecorator(component)
  const firstRender = renderer.create(<FirstComponent />)
  const firstProps = firstRender.toJSON().props

  store.replaceState({ ...getState(), field: 'another value' })

  const SecondComponent = connectedDecorator(component)
  const secondRender = renderer.create(<SecondComponent />)
  const secondProps = secondRender.toJSON().props

  t.false(firstProps.propFromState == secondProps.propFromState)
  t.false(firstProps.action == secondProps.action)
})
