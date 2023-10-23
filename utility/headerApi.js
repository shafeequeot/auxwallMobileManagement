import { Alert } from "react-native"
import { getStorage } from "../components/Storage"
import sessionExpired from "../components/errorHandle"

export const headerApi = async (callback) => {
  try {
    
    const res = await Promise.all([
      getStorage('accessToken'),
      getStorage('endPoint'),
      getStorage('userId'),
      getStorage('companyId'),
    ])
 
    if(!res[0] || !res[1] || !res[2]) throw new Error('Invalid basic data')
    if(!res[3])  Alert.alert(
      "Club not selected",
        "Please select a club from club tab",
        [
          {
            text: 'OK',
            // onPress: () => BackHandler.exitApp(),
          },
        ],
        { cancelable: false }
      )
    
    return {
      userId: res[2], companyId: res[3], endPoint: `${res[1]}/api`, headers: {
        "headers": {
          'Content-Type': 'application/json',
          'authorization': `bearer ${res[0]}`,
        }
      }
    }
  } catch (err) {
    if(err.message == 'Invalid basic data') await sessionExpired({})
     throw err
  }
}