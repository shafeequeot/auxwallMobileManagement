import { View, Text } from 'react-native'
import React from 'react'

const Card = ({children, dark=false}) => {
  return (
    <View className={`${dark ? "bg-gray-700 text-white" : "bg-white"} rounded-md shadow w-full flex items-center p-4`}>
      {children}
    </View>
  )
}

export default Card