/* @flow */

function isFunc(arg: mixed): boolean %checks {
  return typeof arg === 'function'
}

function getDisplayName(Component: React$ComponentType<*>) {
  return Component.displayName || Component.name || 'Component'
}

function wrapDisplayName(
  WrapperName: string,
  Component: React$ComponentType<*>,
) {
  const displayName = getDisplayName(Component)

  return `${WrapperName}(${displayName})`
}

export { isFunc, getDisplayName, wrapDisplayName }
