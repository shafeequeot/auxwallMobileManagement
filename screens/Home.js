import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import RevenueCard from '../components/home/RevenueCard'
import WalletCard from '../components/home/WalletCard'
import TodaysIncome from '../components/home/TodaysIncome'
import CourseCount from '../components/home/CourseCount'
import TabelSection from '../components/home/TabelSection'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import { headerApi } from '../utility/headerApi';
import axios from 'axios'

const HomeScreen = ({ navigation }) => {

  const [month, setMonth] = useState(moment().format("MM-YYYY"))
  const [loading, setLoading] = useState(false)
  const [loadAgain, setLoadAgain] = useState(false)
  const [data, setData] = useState({})

  const dateHandle = (action) => {
    if (action == "add") setMonth((prev) => moment(prev, "MM-YYYY").add(1, 'month').format("MM-YYYY"))
    if (action == "less") setMonth((prev) => moment(prev, "MM-YYYY").subtract(1, 'month').format("MM-YYYY"))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const { companyId, endPoint, headers } = await headerApi();
        let response
        if(companyId) response = await axios.get(`${endPoint}/dashboard/${companyId}/${month}`, headers);
        else throw new Error("choose a club from club feild")
        const responseData = response?.data?.data || {};
        setData({ ...responseData });
       
      } catch (error) {
        Alert.alert(
          'Please try again!',
          error.message,
          [
            {
              text: 'Reload',
              onPress: () => setLoadAgain(ld => !ld),
            
            }, {
              text: 'Ok',
              onPress: () => {
                // Handle Cancel button press
              },
              style: 'cancel', // This style makes the button appear as a cancel button on some platforms
            },
          ],
          { cancelable: true }
        );
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();

  }, [loadAgain, month])
  return (

    <ScrollView refreshControl={
      <RefreshControl
        onRefresh={() => setLoadAgain(!loadAgain)}
        refreshing={loading}
      />
    } className="m-3 space-y-2">

      <View className="flex items-center bg-white p-2 rounded">

        {/* Date picker */}
        <View className="flex flex-row items-center gap-2 ">
          <TouchableOpacity onPress={() => dateHandle("less")}><Ionicons size={22} name='arrow-back' /></TouchableOpacity>
          <Text>{moment(month, "MM-YYYY").format("MMM-YYYY")}</Text>
          <TouchableOpacity onPress={() => dateHandle("add")}><Ionicons size={22} name='arrow-forward' /></TouchableOpacity>
        </View>
      </View>


      {/* revenue , expense, PnL */}
      <ScrollView horizontal={true} className="space-x-2">
        <View>
          <RevenueCard Title="Revenue" Amount={data?.currentMonthIncome} />
        </View>
        <View>
          <RevenueCard Title="Expense" Amount={data?.currentMonthExpense} />
        </View>

        <View>
          <RevenueCard Title="Profit / Loss" Amount={data?.currentMonthPnL} />
        </View>
      </ScrollView>




      {/* Cash in hand and bank */}
      <ScrollView horizontal={true} className="space-x-3 bg-white p-2 rounded">
        <View>
          <WalletCard Label="Cash in Hand" Amount={data?.inCash} />
        </View>
        <View>
          <WalletCard Label="Bank" Amount={data?.inBank} />
        </View>
      </ScrollView>

      {/* Current date income and expense */}
      <ScrollView>
        <View className="flex flex-row  space-x-2 text-xs">
          <View className="flex-1">

            <TodaysIncome Title="TODAY'S COLLECTIONS" BgColor='bg-indigo-500' Amount={data?.currentDateIncome} />

          </View>
          <View className="flex-1">

            <TodaysIncome Title="TODAY'S PAYMENTS" BgColor='bg-blue-500' Amount={data?.currentDateExpense} />
          </View>
        </View>
      </ScrollView>

      {/* total nos course joint */}
      <Text className='text-sm font-bold'>ACTIVE MEMBERS</Text>

      <ScrollView horizontal={true} className="bg-white p-2 rounded">
        {
          data?.activeSubscriptions?.map((course, i) => (
            <CourseCount key={i} Data={course} />
          ))
        }
      </ScrollView>

      {/* Tabel Section */}
      <Text className='text-sm font-bold'>NEAR TO EXPIRE</Text>
      <View className="bg-white p-2 rounded">
        <TabelSection />
      </View>


    </ScrollView>
  )
}

export default HomeScreen

