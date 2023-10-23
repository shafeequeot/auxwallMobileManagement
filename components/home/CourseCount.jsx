import { View, Text } from 'react-native'
import React from 'react'

const CourseCount = ({Label="", Count=0, Color="red"}) => {
  return (
    <View className="flex flex-col items-center mr-3">
    <View  className={` p-2 rounded-full h-20 w-20 flex border-2 border-gray-700 justify-center items-center `}>
    {/* <View style={{backgroundColor: Color}} className={` p-2 rounded-full h-20 w-20 flex justify-center items-center `}> */}
      <Text className="text-lg font-bold text-gray-700">{Count}</Text>
      </View>
    <Text className="text-xs">{Label}</Text>
    </View>
  )
}

export default CourseCount