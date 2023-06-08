import { createNavigationContainerRef } from '@react-navigation/native'

export type RootStackParamList = {
  Login: any
  Register: any
  Dashboard: any
  Error: any
}

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export function navigate(name: any, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}
