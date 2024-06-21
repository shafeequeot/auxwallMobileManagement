import { View, Button, Text, BackHandler, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputTextFeild from '../components/InputTextFeild'
import Card from '../components/Card'
import { getStorage, removeStorage, setStorage } from '../components/Storage'
import sessionExpired from '../components/errorHandle'
import color from '../utility/color'

const Config = ({ setConfig = false }) => {
  const [data, setData] = useState("")
  const [formResult, setFormResult] = useState({ err: false, msg: "" })

  const handleSubmit = async (e) => {
    try {

      if (!setConfig) {

        await removeStorage('endPoint')
        await sessionExpired()

      }

      if (!data || data == "") throw new Error("Invalid data")
      setConfig(data)
      setStorage({ key: 'endPoint', value: data })
      setFormResult({ err: false, msg: 'Data has been saved!' })

    } catch (err) {
      setFormResult({ err: true, msg: err.message || err?.toString() })
    }
  }

  const logoutHandle = async () => {
    await sessionExpired({ title: "Logged out", description: "Close application" })
  }


  useEffect(() => {
    getStorage('endPoint').then(res => setData(res))
  }, [])

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.cardContent}>
          {/* Form area */}
          <View style={styles.formArea}>
          <InputTextFeild
              label="End point"
              placeHolder={"End point URI"}
              onChange={(e) => setData(e)}
              value={data}
              disabled={!setConfig ? false : true}
            />
            {formResult.err && <Text style={[styles.errorMessage, { color: formResult.err ? 'red' : 'green' }]}>{formResult.msg}</Text>}
            <Button onPress={handleSubmit} title={setConfig ? 'Save' : 'Remove'} />
            <TouchableOpacity onPress={logoutHandle}>
              <Text style={[styles.logoutText, {marginTop: 22}]}>Logout?</Text>
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
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formArea: {
    width: 300,
    marginTop: 8,
    backgroundColor: color.white,
    marginBottom: 8,
    padding: 8,
  },
 
  errorMessage: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  logoutText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 10,
    textAlign: 'right',
  },
});
export default Config