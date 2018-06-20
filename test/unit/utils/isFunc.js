import test from 'ava'

import { isFunc } from '@/utils'
import dataTypes from '_helpers/dataTypes'

const { func, ...rest } = dataTypes
const invalidTypes = Object.values(rest)

test('returns `true` for Function', t => {
  t.true(isFunc(func))
})

test('returns `false` for invalid types', t => {
  invalidTypes.forEach(type => {
    t.false(isFunc(type))
  })
})
