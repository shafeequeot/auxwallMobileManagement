import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../utility/color';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';
import {  getStorage, setStorage } from '../components/Storage';
import axios from 'axios';
import { headerApi } from '../utility/headerApi';
import sessionExpired from '../components/errorHandle';

const Club = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [clubs, setClubs] = useState([])
  const [loadAgain, setLoadAgain] =useState(false)

  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true);
  
      try {
        const userName = await getStorage('userName');
        const { userId, companyId, endPoint, headers } = await headerApi();
        setUser({ userName, companyId });
        let response
        if(userName && userId) response = await axios.get(`${endPoint}/fetchUserCompanies/${userId}`, headers);
        
        if(!response && response == null) throw new Error ("No user data found")
        setClubs(response?.data?.data?.Company_Detials || []);
      } catch (err) {
        if (err.message === 'Request failed with status code 401') {
          sessionExpired();
        } else {
          console.log('Error:', err.message);
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  },[loadAgain])


  const clubHandle = async(e)=>{
    setUser({...user, companyId: e})
    await setStorage({key: "companyId",  value: e})
  }
  return (
    <SafeAreaView  className="p-4 space-y-3">
      
     <Text className="text-xs text-gray-500">Hi {user?.userName?.toString()}</Text>
     <Text className="font-bold text-center">YOUR CLUBS ARE</Text>
     <ScrollView refreshControl={
          <RefreshControl
            onRefresh={()=>setLoadAgain(!loadAgain)}
            refreshing={loading}
          />
        } className="mt-4 flex flex-col gap-3">
          {
            clubs?.map(club=>(
              <TouchableOpacity key={club?.id} onPress={()=>clubHandle(club.id)}>

              <Card >
                <View className="flex flex-row items-center gap-2 ">

                <Ionicons name='business' color={color.primary} size={32} />
                <View className="w-3/4">
                <Text className="font-bold uppercase">{club?.companyName}</Text>
                <Text className="text-xs text-gray-400" numberOfLines={1} > 
                {club?.branchName && <>Branch: {club?.branchName}, </>} 
                {club?.emirate && <>Emirates: {club?.emirate}, </>} 
                {club?.Street && <>Street: {club?.Street}, </>} 
                {club?.city && <>City: {club?.city}, </>} 
                {club?.poBox && <>PO Box: {club?.poBox}, </>} 
                {club?.telephone && <>Tel: {club?.telephone}, </>} 
                {club?.email && <>Email: {club?.email},</>} 
                {club?.website && <>Website: {club?.website}, </>} 
                </Text>
                </View>
                {user?.companyId == club.id && <Ionicons name='checkmark-circle' size={32} color={"green"}/>}
                </View>
              </Card>
              </TouchableOpacity>
            ))
          }
     </ScrollView>
    </SafeAreaView>
  )
}

export default Club