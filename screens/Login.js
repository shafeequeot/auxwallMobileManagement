import { View, Text, Image, Button, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import InputTextFeild from '../components/InputTextFeild'
import axios from 'axios'
import { getStorage, setStorage } from '../components/Storage'
import  color  from '../utility/color'
const screenWidth = Dimensions.get('window').width;

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
    if(res?.data?.data){
      await setStorage({key: 'userName', value: res?.data?.data?.fullName})
      await setStorage({key: 'accessToken', value: res.data.data.accessToke})
      await setStorage({key: 'userId', value: res?.data?.data?.id?.toString()})
      setLogin(res?.data?.data?.fullName)
      setResult({...result, loader: false, err: false, msg: "Logged in !!!"})
    }else throw new Error("Unable to fetch data..")
    }catch(err){
      setResult({...result, loader: false, err: true, msg: String(err.message).includes('status code 400') ? 'Invalid credentials. try again' :  err.message || err?.toString()})
    }
  }
  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.cardContent}>
          <Image source={require('../assets/auxwall/logo-01.png')} style={styles.logo} />

          {/* form area */}
          <View style={styles.formArea}>
            <View style={styles.formItem}>
              <InputTextFeild
              style={styles.inputTextField}
                label="User Name / Email / Mobile"
                placeHolder="Enter User name"
                onChange={(e) => inputHandle({ userName: e })}
              />
            </View>
            <View style={styles.formItem}>
              <InputTextFeild
                label="Password"
                placeHolder="Enter Password"
                password={true}
                onChange={(e) => inputHandle({ password: e })}
              />
            </View>
            <View style={styles.formItem}>
              <Text style={[styles.message, result?.err ? styles.errorText : styles.successText]}>
                {result?.msg?.toString()}
              </Text>
              <Button onPress={formHandle} disabled={result?.loader} title={result.loader ? 'Loading...' : 'Login'} />
            </View>
            <TouchableOpacity onPress={() => setConfig("")}>
              <Text style={styles.configText}>Config</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    margin: 8,

  },
  cardContent: {
    width: screenWidth - 60,
    alignItems: 'center',
    backgroundColor: color.white,
    padding: 12

  },
  logo: {
    width: 208, // 52 * 4
    height: 80, // 20 * 4
  },
  
  formArea: {
    width: '100%',
    marginTop: 16,
  },
  formItem: {
    marginBottom: 16,
  },
  message: {
    fontSize: 12,
  },
  errorText: {
    color: color.error,
    textAlign: 'center'
  },
  successText: {
    color: color.success,
  },
  configText: {
    fontSize: 12,
    color: color.text,
    textAlign: 'right',
  },
});

export default Login