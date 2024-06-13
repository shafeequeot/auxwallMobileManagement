import { View, Text, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import Popup from '../Popup'
import CourseList from './CourseList'

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

      <View className="flex flex-col items-center mr-3">
        <View className={` p-2 rounded-full h-20 w-20 flex border-2 border-gray-700 justify-center items-center `}>
          {/* <View style={{backgroundColor: Color}} className={` p-2 rounded-full h-20 w-20 flex justify-center items-center `}> */}
          <Text className="text-lg font-bold text-gray-700">{counts?.activeMembers}</Text>
          <Text className="absolute top-1 -right-2 bg-yellow-400 text-gray-700 p-1 rounded" style={{ fontSize: 10 }}>{counts?.currentMonthJoins} new</Text>
        </View>
        <Text className="text-xs">{Data?.name}</Text>
      </View>
    </TouchableOpacity>
    {
      popup && <Popup onClose={setPopup} visible={popup} child={<CourseList Data={Data}/>}/>
    }
    </View>
    
  )
}

export default CourseCount