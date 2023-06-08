import NetInfo from "@react-native-community/netinfo"

export const isOnline: any = () => NetInfo.fetch().then(state => ({ isConnected: state.isConnected }))
