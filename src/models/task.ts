import type { Tasks } from 'feathers-pinia-api'
// import type { ClientApplication } from 'feathers-pinia-api'
import type { TransportConnection } from '@feathersjs/feathers' // TODO: Is this right? is so PR into client lib

export function setupTask(data: TransportConnection<Tasks>): Record<string, any> {
  const defaults = {
    description: '',
    isComplete: false,
  }
  const withDefaults = useInstanceDefaults(defaults, data)

  // add user to each task
  // const User = useUserModel() as any
  // const withUser = associateGet(withDefaults, 'user', {
  //   Model: User,
  //   getId: (data: FeathersInstance<Tasks>) => data.userId as string,
  // })
  return withDefaults
}