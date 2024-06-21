import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Card from '../Card'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import Currency from '../Currency'
import color from '../../utility/color'

const RevenueCard = ({Title, Amount, Month}) => {
  return (
    <Card dark={true} >
      <View style={styles.container}>
        <View style={{flexDirection: 'column', display: 'flex', height: 110, justifyContent: 'space-between'}}>
          <Text style={styles.title}>{Title}</Text>
          <Text ><Currency ClassName={styles.currency} Negative={false} Amount={Amount}/></Text>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>on {moment(Month).format("MMMM")} </Text>
          </View>
        </View>
        <View style={[
          styles.iconContainer,
          { backgroundColor: Amount > 0 ? "#D1FAE5" : "#FEE2E2" }
        ]}>
          <Ionicons name={Amount > 0 ? 'arrow-up' : 'arrow-down'} size={32} color={Amount > 0 ? "green" : "red"} />
        </View>
      </View>
      <Ionicons name='sunny-outline' style={styles.backgroundIcon} size={200}/>
    </Card>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    alignItems: 'center',
    gap: 16,
    position: 'relative',
    backgroundColor: color.primary,
    borderRadius: color.borderRadios,
    padding: 8,
    marginRight: 8
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 16,
    
  },
  title: {
    color: color.gray, // text-gray-300
  },
  currency: {
    fontSize: 18, // text-lg
    fontWeight: 'bold', // font-bold
    color: color.white, // text-white
  },
  dateContainer: {
    flexDirection: 'row',
  },
  dateText: {
    fontSize: 12, // text-xs
    color: color.gray, // text-gray-300
  },
  iconContainer: {
    borderRadius: 9999, // rounded-full
    padding: 8,
  },
  backgroundIcon: {
    position: 'absolute',
    top: -20,
    right: -20,
    color: color.white,
    opacity: 0.1,
  },
});
export default RevenueCard