import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Currency from '../Currency'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import color from '../../utility/color'

const TodaysIncome = ({Title="", Amount=0, BgColor ="bg-indigo-500"}) => {
  return (
    <View style={[styles.container, { backgroundColor: BgColor }]} >
    <Text style={styles.title}>{Title.toString()}</Text>
    <Currency Amount={Amount} ClassName={{color: color.white, fontSize: 16, fontWeight: 'bold'}} Symbol={false}/>
    <Text style={styles.date}>{moment().format("dddd")}</Text>
    <View style={styles.iconContainer}>

    <Ionicons name='analytics-outline' color="white" size={90} />
    </View>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    borderRadius: 4,
    height: 112, // 28 * 4
    justifyContent: 'space-between',
    position: 'relative',
    borderRadius: color.borderRadios
  },
  title: {
    color: 'white',
    fontSize: 12,
  },
  amount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  date: {
    color: 'white',
    fontSize: 12,
    textAlign: 'right',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    opacity: 0.1,
  },
});
export default TodaysIncome