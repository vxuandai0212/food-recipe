import React from 'react'
import store from 'app/store'
import RootNavigator from 'app/navigation'
import { Provider as ReduxProvider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { navigationRef } from 'app/helpers/navigation'
import Toast from 'react-native-toast-message'

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
      >
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default () => (
  <ReduxProvider store={store}>
    <App />
    <Toast ref={ref => Toast.setRef(ref)} />
  </ReduxProvider>
)
