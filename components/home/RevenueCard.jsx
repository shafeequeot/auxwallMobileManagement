import { View, Text } from 'react-native'
import React from 'react'
import Card from '../Card'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import Currency from '../Currency'

const RevenueCard = ({Title, Amount, Month}) => {
  return (
    <Card dark={true} >
      <View className="flex flex-row justify-between  items-center space-x-4 relative ">
        <View className="flex flex-col justify-between gap-4">
          <Text className="text-gray-300">{Title}</Text>
          <Text ><Currency ClassName="text-lg font-bold text-white" Negative={false} Amount={Amount}/></Text>
          <View className="flex flex-row">
            <Text className="text-xs text-gray-300">on {moment(Month).format("MMMM")} </Text>
          </View>
        </View>
        <View className={`rounded-full ${Amount > 0 ? "bg-green-100": "bg-red-100"}  p-2`}>
          <Ionicons name={Amount > 0 ? 'arrow-up' : 'arrow-down'} size={32} color={Amount > 0 ? "green" : "red"} />
        </View>
      </View>
      <Ionicons name='sunny-outline' style={{position: 'absolute', top: -20, right: -20, color: 'white', opacity: 0.15}} size={200}/>
    </Card>
  )
}

export default RevenueCard