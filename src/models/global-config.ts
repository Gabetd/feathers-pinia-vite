import  { pinia } from '#src/modules/pinia'

/**
 * Returns a global configuration object for Feathers-Pinia
 */
export const useFeathersPiniaConfig = () => {
  return {
    pinia,
    idField: '_id',
    whitelist: ['$regex'],
  }
}
