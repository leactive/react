export type Subscription = {
  unsubscribe: () => void
}

export type MapState<
  State extends {},
  OutputState extends {} = {},
> = (state: Readonly<State>) => OutputState

export type MapActions<
  State extends {},
  OutputActions extends {} = {},
> = (state: State) => OutputActions
