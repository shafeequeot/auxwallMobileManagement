import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert, StyleSheet } from 'react-native'
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
import color from '../utility/color'

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
        if (companyId) response = await axios.get(`${endPoint}/dashboard/${companyId}/${month}`, headers);
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
    } contentContainerStyle={styles.scrollViewContainer}>

      <View style={styles.datePickerContainer}>

        {/* Date picker */}
        <View style={styles.datePicker}>
          <TouchableOpacity onPress={() => dateHandle("less")}><Ionicons size={22} name='arrow-back' /></TouchableOpacity>
          <Text>{moment(month, "MM-YYYY").format("MMM-YYYY")}</Text>
          <TouchableOpacity onPress={() => dateHandle("add")}><Ionicons size={22} name='arrow-forward' /></TouchableOpacity>
        </View>
      </View>


      {/* revenue , expense, PnL */}
      <ScrollView horizontal={true} contentContainerStyle={styles.horizontalScrollView}>
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
      <ScrollView horizontal={true} contentContainerStyle={styles.cashInHandScrollView}>
        <View>
          <WalletCard Label="Cash in Hand" Amount={data?.inCash} />
        </View>
        <View>
          <WalletCard Label="Bank" Amount={data?.inBank} />
        </View>
      </ScrollView>

      {/* Current date income and expense */}
      <ScrollView>
        <View style={styles.todaysIncomeContainer}>
          <View style={styles.flexItem}>

            <TodaysIncome Title="TODAY'S COLLECTIONS" BgColor='#6366F1' Amount={data?.currentDateIncome} />

          </View>
          <View style={styles.flexItem}>

            <TodaysIncome Title="TODAY'S PAYMENTS" BgColor='#3B82F6' Amount={data?.currentDateExpense} />
          </View>
        </View>
      </ScrollView>

      {/* total nos course joint */}
      <Text style={styles.activeMembersText}>ACTIVE MEMBERS</Text>

      <ScrollView horizontal={true} contentContainerStyle={styles.activeMembersScrollView}>
        {
          data?.activeSubscriptions?.map((course, i) => (
            <CourseCount key={i} Data={course} />
          ))
        }
      </ScrollView>

      {/* Tabel Section */}
      <Text style={styles.nearToExpireText}>NEAR TO EXPIRE</Text>
      <View style={styles.tableSectionContainer}>
        <TabelSection />
      </View>


    </ScrollView>
  )
}


const styles = StyleSheet.create({
  scrollViewContainer: {
    margin: 12,
  },
  datePickerContainer: {
    backgroundColor: color.white,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  horizontalScrollView: {
    marginVertical: 8,
    paddingHorizontal: 4,
  },
  cashInHandScrollView: {
    backgroundColor: color.white,
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%'
  },
  todaysIncomeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  flexItem: {
    flex: 1,
  },
  activeMembersText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  activeMembersScrollView: {
    backgroundColor: color.white,
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
  },
  nearToExpireText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  tableSectionContainer: {
    backgroundColor: color.white,
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
  },
});

export default HomeScreen

