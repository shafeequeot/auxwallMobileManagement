import { View, Text, ScrollView, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import  color  from '../utility/color';
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
          console.log('club:', err.message);
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
    <SafeAreaView  style={styles.safeArea}>
      
     <Text style={styles.greetingText}>Hi {user?.userName?.toString()}</Text>
     <Text style={[styles.titleText, {marginTop: 12}]}>YOUR CLUBS ARE</Text>
     <ScrollView refreshControl={
          <RefreshControl
            onRefresh={()=>setLoadAgain(!loadAgain)}
            refreshing={loading}
          />
        } contentContainerStyle={styles.scrollViewContent}>
          {
            clubs?.map(club=>(
              <TouchableOpacity key={club?.id} onPress={()=>clubHandle(club.id)}>

              <Card >
                <View style={styles.cardContent}>

                <Ionicons name='business' color={color.primary} size={32} />
                <View style={styles.clubInfo}>
                <Text style={styles.clubName}>{club?.companyName}</Text>
                <Text style={styles.clubDetails} numberOfLines={1} > 
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

const styles = StyleSheet.create({
  safeArea: {
    padding: 16,
  },
  greetingText: {
    fontSize: 12,
    color: color.text, 
  },
  titleText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollViewContent: {
    marginTop: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: color.white,
    padding: 8,
    borderRadius: 4,
    height: 80
  },
  clubInfo: {
    width: '75%',
  },
  clubName: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  clubDetails: {
    fontSize: 12,
    color: color.text, 
  },
});
export default Club