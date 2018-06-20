/* @flow */

export type MapState<
  State: {},
  OutputState: {} = {},
> = (state: $ReadOnly<State>) => OutputState

export type MapActions<
  State: {},
  OutputActions: {} = {},
> = (state: State) => OutputActions
