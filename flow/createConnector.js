/* @flow */
import { type ComponentType } from 'react'
import { type Store } from '@leactive/core'

import type { MapState, MapActions } from './'

declare function createConnector<State: {}>(store: Store<State>):
  <OutputState: {}, OutputActions: {}>(
    mapState: MapState<State, OutputState>,
    mapActions?: MapActions<State, OutputActions>,
  ) =>
    <OwnProps: (OutputState & OutputActions)>(
      Component: ComponentType<OwnProps>,
    ) =>
      ComponentType<$Diff<OwnProps, (OutputState & OutputActions)>>

export default createConnector
