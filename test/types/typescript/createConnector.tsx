import React from 'react'
import renderer from 'react-test-renderer'
import { Store, createStore } from '@leactive/core'

import { createConnector } from 'package'

const initialState = {
  number: 1,
  string: 'string',
  boolean: true,
  array: [],
  object: {},
}

type State = typeof initialState

type MappedState = {
  number: number,
}

type MappedActions = {
  increase: () => void,
  decrease: () => void,
}

type OwnProps = {
  ownProp: string,
}

type Props = OwnProps & MappedState & MappedActions

let store: Store<State> = createStore({ state: initialState })

class Button extends React.Component<Props, {}> {
  state = {}

  render() {
    const { ownProp } = this.props

    return <span>{ ownProp }</span>
  }
}

const connect = createConnector(store)

const ConnectedButton = connect(
  state => ({
    number: state.number,
  }),
  state => ({
    increase() {
      state.number++
    },
    decrease() {
      state.number--
    },
  }),
)(Button)

renderer.create(<ConnectedButton ownProp="own prop" />)

export { connect }
