import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import Popup from '../Popup'
import CourseList from './CourseList'
import color from '../../utility/color'

const CourseCount = ({ Data }) => {
 

  const [counts, setCounts] = useState({
    allTimeMembers: 0,
    activeMembers: 0,
    currentMonthJoins: 0
  })
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    const counts = Data?.course?.reduce((prv, cur) => {
      return {
        allTimeMembers: parseInt(prv?.allTimeMembers || 0) + parseInt(cur?.allTimeMembers || 0),
        activeMembers: parseInt(prv?.activeMembers || 0) + parseInt(cur?.activeMembers || 0),
        currentMonthJoins: parseInt(prv?.currentMonthJoins || 0) + parseInt(cur?.currentMonthJoins || 0)
      }
    }, {
      allTimeMembers: 0,
      activeMembers: 0,
      currentMonthJoins: 0
    })
    setCounts(counts)
  }, [Data])

  return (
    <View>

    <TouchableOpacity onPress={()=>setPopup(true)}>

      <View style={styles.column}>
        <View style={styles.circleContainer}>
          {/* <View style={{backgroundColor: Color}} className={` p-2 rounded-full h-20 w-20 flex justify-center items-center `}> */}
          <Text style={styles.activeMembersText}>{counts?.activeMembers}</Text>
          <Text style={styles.newMembersText} >{counts?.currentMonthJoins} new</Text>
        </View>
        <Text style={styles.dataName}>{Data?.name}</Text>
      </View>
    </TouchableOpacity>
    {
      popup && <Popup onClose={setPopup} visible={popup} child={<CourseList Data={Data}/>}/>
    }
    </View>
    
  )
}


const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 12, 
  },
  circleContainer: {
    padding: 8, 
    borderRadius: 9999, 
    height: 80, 
    width: 80, 
    flexDirection: 'column',
    borderColor: color.primary, 
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  activeMembersText: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: color.primary, 
  },
  newMembersText: {
    position: 'absolute',
    top: 4, 
    right: -8, 
    backgroundColor: '#FBBF24', 
    color: '#374151', 
    padding: 4, 
    borderRadius: 4, 
    fontSize: 10,
  },
  dataName: {
    fontSize: 12,
  },
});

export default CourseCount