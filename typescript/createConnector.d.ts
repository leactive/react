import { Store } from '@leactive/core'

import { MapState, MapActions } from './utilityTypes'

declare function createConnector<State extends {}>(store: Store<State>):
  <OutputState extends {}, OutputActions extends {}>(
    mapState: MapState<State, OutputState>,
    mapActions?: MapActions<State, OutputActions>,
  ) =>
    <OwnProps extends {}>(
      Component: (
        React.ComponentClass<OwnProps & OutputState & OutputActions> |
        React.StatelessComponent<OwnProps & OutputState & OutputActions>
      )
    ) =>
      React.ComponentClass<OwnProps>

export default createConnector
