import { View, Button, Text, BackHandler, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputTextFeild from '../components/InputTextFeild'
import Card from '../components/Card'
import { getStorage, removeStorage, setStorage } from '../components/Storage'
import sessionExpired from '../components/errorHandle'

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
    <View className="flex flex-row justify-center items-center h-full p-8">
      <Card>
        <View className="w-full flex flex-col gap-4 items-center">


          {/* form area */}
          <View className=" w-full space-y-3">

            <InputTextFeild
              label="End point"
              placeHolder={"End point URI"}
              onChange={(e) => setData(e)}
              value={data}
              disabled={!setConfig ? false : true}
            />

            <View>
              {formResult.err && <Text className={`${formResult.err ? "text-red-500" : "text-green-500"} text-sm`}>{formResult?.msg?.toString()}</Text>}
              <Button onPress={handleSubmit} title={setConfig ? 'Save' : 'Remove'} />
            </View>
            <TouchableOpacity onPress={logoutHandle}>
              <Text className="text-xs text-gray-500 mt-3 text-right">Logout?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </View>
  )
}

export default Config