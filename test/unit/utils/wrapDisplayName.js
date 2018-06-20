import test from 'ava'

import { wrapDisplayName } from '@/utils'

test('properly wraps display name', t => {
  const wrappedName = wrapDisplayName('Wrapped', {
    displayName: 'Component',
  })

  t.is(wrappedName, 'Wrapped(Component)')
})
