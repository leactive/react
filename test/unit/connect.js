import test from 'ava'
import React from 'react'
import renderer from 'react-test-renderer'
import { createStore } from '@leactive/core'

import createConnector from '@/createConnector'

let store, connect, component

test.beforeEach(() => {
  component = props => <div {...props} />
  store = createStore({
    state: {
      field: false,
    },
  })
  connect = createConnector(store)
})

test('works when arguments are omitted or undefined', t => {
  t.notThrows(() => connect(undefined, undefined))
  t.notThrows(() => connect())
})

test(`
  throws an error when mapState argument
  presents and it is not a function
`, t => {
  t.throws(() => connect(new Object(), undefined))
})

test(`
  throws an error when mapActions argument
  presents and it is not a function
`, t => {
  t.throws(() => connect(undefined, new Object()))
})

test('returns decorator', t => {
  const decorator = connect()

  t.true(decorator instanceof Function)
})

test('decorator function returns component', t => {
  const Component = connect()(component)

  t.notThrows(() => renderer.create(<Component />))
})
