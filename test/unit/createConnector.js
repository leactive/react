import test from 'ava'
import { createStore } from '@leactive/core'

import createConnector from '@/createConnector'

let store

test.beforeEach(() => {
  store = createStore({
    state: {
      field: false,
    },
  })
})

test('returns `connect` decorator', t => {
  const connect = createConnector(store)

  t.true(connect instanceof Function)
})
