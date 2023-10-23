import { View, Text, Image, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import InputTextFeild from '../components/InputTextFeild'
import axios from 'axios'
import { getStorage, setStorage } from '../components/Storage'

const Login = ({setConfig, setLogin}) => {
const [endPoint, setEndPoint] = useState()
const [data, setData] = useState({})
const [result, setResult] = useState({loader: false, err: false, msg: ""})
  const inputHandle = (e) => {
    setData({...data, ...e})
  }
  
  useEffect(()=>{
    getStorage('endPoint').then(res=>setEndPoint(res))
  },[])

  

  const formHandle =async (e)=>{
    e?.preventDefault()
    try{
      setResult({...result, loader: true})

    const res = await axios.post(`${endPoint}/api/login`, {...data})
     await setStorage({key: 'userName', value: res?.data?.data?.fullName})
     await setStorage({key: 'accessToken', value: res.data.data.accessToke})
     await setStorage({key: 'userId', value: res?.data?.data?.id?.toString()})
    setLogin(res?.data?.data?.fullName)
     setResult({...result, loader: false, err: false, msg: "Logged in !!!"})
    }catch(err){
      setResult({...result, loader: false, err: true, msg: err.message || err?.toString()})
    }
  }
  return (
    <View className="flex flex-row justify-center items-center h-full p-8">
      <Card>
        <View className="w-full flex flex-col gap-4 items-center">

          <Image source={require('../assets/auxwall/logo-01.png')} className="w-52 h-20" />

          {/* form area */}
          <View className=" w-full flex space-y-4">
            <View>

              <InputTextFeild
                label="User Name / Email / Mobile"
                // value={'2'}
                placeHolder={"Enter User name"}
                onChange={(e)=>inputHandle({userName: e})} />
            </View>

            <View>

              <InputTextFeild
                label="Password"
                // value={'abc'}
                placeHolder={"Enter Password"}
                password = {true}
                onChange={(e)=>inputHandle({password: e})} />

            </View>
            <View>
              <Text className={`${result?.err ? 'text-red-500' : 'text-green-500'} text-xs`}>{result?.msg?.toString()}</Text>
              <Button onPress={formHandle} disabled={result?.loader ? true : false} title={result.loader ? 'Laoding...' : 'Login'} />
            </View>
            <TouchableOpacity>

            <Text className="text-xs text-gray-500 text-right" onPress={()=>setConfig("")}>Config</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </View>
  )
}

export default Login