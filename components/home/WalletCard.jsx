import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Currency from '../Currency'
import { Ionicons } from '@expo/vector-icons'

const WalletCard = ({Label="", Amount=0}) => {
  return (
    <View style={styles.container}>
    <View style={styles.iconContainer}><Ionicons color="white" name='wallet-outline' size={30}/></View>
    <View>
      <Text style={styles.label}>{Label}</Text>
      <Currency ClassName={{fontWeight: 'bold'}} Amount={Amount} Symbol={false}/>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 14
  },
  iconContainer: {
    backgroundColor: '#F43F5E', // bg-rose-500
    borderRadius: 9999, // rounded-full
    padding: 8,
  },
  label: {
    color: '#4B5563', // text-gray-600
    fontSize: 12, // text-xs
  },
  currency: {
    fontWeight: 'bold', // font-bold
  },
});

export default WalletCard