/* @flow */

import React, { PureComponent, type ComponentType } from 'react'
import { type Store, type Subscription } from '@leactive/core'

import { isFunc, wrapDisplayName } from './utils'
import { type MapState, type MapActions } from './'

const defaultMapper = (): {} => ({})

function createConnector<State: {}>(store: Store<State>) {
  return function connect(
    mapState: MapState<State> = defaultMapper,
    mapActions?: MapActions<State> = defaultMapper,
  ) {
    if (!isFunc(mapState)) {
      throw new TypeError(
        '[@leactive/react]: mapState should be a function. ' +
          'To omit mapState you can pass undefined as an argument',
      )
    }

    if (!isFunc(mapActions)) {
      throw new TypeError(
        '[@leactive/react]: mapActions should be a function. ' +
          'To omit mapActions you can pass undefined as an argument',
      )
    }

    const { getState } = store
    let state
    let lastState = getState()
    let actions = mapActions(lastState)
    const dependencies = store.recordDependencies(() => {
      state = mapState(lastState)
    })

    return function wrapComponent<Props: {}>(Comp: ComponentType<Props>) {
      return class extends PureComponent<Props, {}> {
        static displayName = wrapDisplayName('Connect', Comp)

        state: {}
        subscription: Subscription | null = null

        constructor(props: Props) {
          super(props)

          const newestState = getState()

          if (lastState !== newestState) {
            lastState = newestState
            actions = mapActions(newestState)
          }

          this.subscription = store.subscribe(nextState => {
            state = mapState(nextState)
            this.forceUpdate()
          }, dependencies)
        }

        componentWillUnmount() {
          const { subscription } = this

          if (subscription === null) return

          subscription.unsubscribe()

          this.subscription = null
        }

        render() {
          return React.createElement(
            Comp,
            Object.assign({}, this.props, state, actions),
          )
        }
      }
    }
  }
}

export default createConnector
