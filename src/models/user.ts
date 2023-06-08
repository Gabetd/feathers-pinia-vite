import { useInstanceDefaults } from 'feathers-pinia'
import type { User as Users } from 'feathers-pinia-api'
import type { TransportConnection } from '@feathersjs/feathers' // TODO: Is this right? is so PR into client lib


export const setupUser = (data: TransportConnection<Users>) => {
  const defaults = {
    email: '',
    password: '',
  }
  const withDefaults = useInstanceDefaults(defaults, data)

  return withDefaults
}
