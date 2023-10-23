import { View, Text } from 'react-native'
import React from 'react'
import Currency from '../Currency'
import { Ionicons } from '@expo/vector-icons'

const WalletCard = ({Label="", Amount=0}) => {
  return (
    <View className="flex flex-row gap-2 items-center">
    <View className="bg-rose-500 rounded-full p-2"><Ionicons color="white" name='wallet-outline' size={30}/></View>
    <View>
      <Text className="text-gray-600 text-xs">{Label}</Text>
      <Currency ClassName="font-bold" Amount={Amount} Symbol={false}/>
    </View>
  </View>
  )
}

export default WalletCard