import { View, Text } from 'react-native'
import React from 'react'
import Currency from '../Currency'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'

const TodaysIncome = ({Title="", Amount=0, BgColor ="bg-indigo-500"}) => {
  return (
    <View className={`${BgColor} p-2 flex-1 rounded h-28  justify-between relative`} >
    <Text className="text-white text-xs">{Title.toString()}</Text>
    <Currency Amount={Amount} ClassName="text-white text-lg font-bold" Symbol={false}/>
    <Text className="text-white text-right text-xs">{moment().format("dddd")}</Text>
    <View className="absolute bottom-0 right-0 opacity-10">

    <Ionicons name='analytics-outline' color="white" size={90} />
    </View>
  </View>
  )
}

export default TodaysIncome