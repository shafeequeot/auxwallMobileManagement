import { View, Text, TextInput, StyleSheet } from 'react-native'
import color  from '../utility/color'

const InputTextFeild = ({label, onChange, placeHolder, value, password=false, disabled=true}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.inputTextField} 
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

const styles = StyleSheet.create({

inputTextField: {
 
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: color.lightGray,
    marginBottom: 4,
  },
  label: {
    color: color.text,
    fontSize: 14
  }
})

export default InputTextFeild