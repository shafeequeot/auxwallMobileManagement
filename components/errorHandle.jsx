import { Alert, BackHandler } from 'react-native'
import { removeStorage } from './Storage'

async function sessionExpired ({Title='Session Expired', description='Close the app and login again.'}) {
try{

  await Promise.all([
      removeStorage('accessToken'),
      removeStorage('userName'),
      removeStorage('companyId'),  
  ])
}catch(er){console.log(er)}


    Alert.alert(
      Title,
        description,
        [
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        { cancelable: false }
      )
}

export default sessionExpired


