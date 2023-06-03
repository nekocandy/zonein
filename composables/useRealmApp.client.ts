import * as Realm from 'realm-web'

export function useRealmApp() {
  const config = useRuntimeConfig()
  const realmConfig = {
    id: (import.meta.env && import.meta.env.SSR) ? config.realmAppId : config.public.realmAppId,
  }
  return new Realm.App(realmConfig)
}
