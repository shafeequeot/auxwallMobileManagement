import { View, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import DataTable from '../DataTable'
import { headerApi } from '../../utility/headerApi'
import axios from 'axios'

const TabelSection = ({Data}) => {


  const [data, setData] = useState([])

    const Heading = [
        {label: "No", item: 'idx', width: 40},
        {label: "Name", item: 'fullName', width: 150},
        {label: "Mobile", item: 'mobile', width: 100},
        {label: "Expiry", item: 'membershipExpiry', width: 110, type: 'date'},
    ]

    

    // useEffect(()=>{
    //   try{
    
    //    const a = async ()=>{
     
    //      const { companyId, endPoint, headers } = await headerApi();
    //      const response = await axios.get(`${endPoint}/recent_members_dash/${companyId}`, headers);
    //      setData([...response?.data?.data?.nearExpiry])
    //     }
    
    //     a()
    //   }catch(e){
    //     Alert.alert(
    //       'Something went wrong',
    //         'Unable fertch data. retry again!',
    //         [
    //           {
    //             text: 'OK',
    //             onPress: () => setLoadAgain(ld=>!ld),
    //           },
    //         ],
    //         { cancelable: false }
    //       )
    //   }
    
    // },[])
  return (
    <ScrollView horizontal>
      <View >

      <DataTable Heading={Heading} Data={Data} maxRow={10} />
      </View>
    </ScrollView>
  )
}

export default TabelSection