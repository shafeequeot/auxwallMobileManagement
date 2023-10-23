import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const InputTextFeild = ({label, onChange, placeHolder, value, password=false, disabled=true}) => {
  return (
    <View>
      <Text className="text-gray-400 text-xs">{label}</Text>
      <TextInput className="border border-gray-200 p-1 rounded focus:border-blue-200 text-xs w-full" 
      onChangeText={onChange} 
      placeholder={placeHolder} 
      value={value}
      secureTextEntry={password}
      placeholderTextColor="#CCCCCC"
      editable={disabled}
      />
    </View>
  )
}



export default InputTextFeild