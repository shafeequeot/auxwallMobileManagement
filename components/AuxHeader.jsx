import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const AuxHeader = ({title}) => {
  return (
    <View className="bg-white h-24 pt-8 flex flex-col justify-end">
        <SafeAreaView>

      <Text className="font-bold ml-4 text-xl">{title}</Text>
        </SafeAreaView>
    </View>
  )
}

export default AuxHeader