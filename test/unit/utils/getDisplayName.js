import test from 'ava'

import { getDisplayName } from '@/utils'

let displayName = getDisplayName({})

// eslint-disable-next-line max-len
test('returns `Component` for Component without `displayName` and `name`', t => {
  t.is(displayName, 'Component')
})

test('returns component name for component without `displayName`', t => {
  displayName = getDisplayName({
    name: 'ComponentName',
  })

  t.is(displayName, 'ComponentName')
})

test('returns `displayName` for component with `displayName`', t => {
  displayName = getDisplayName({
    displayName: 'DisplayName',
  })

  t.is(displayName, 'DisplayName')
})
