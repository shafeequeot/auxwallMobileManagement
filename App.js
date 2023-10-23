import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import Login from './screens/Login';
import Config from './screens/Config';
import { getStorage, setStorage } from './components/Storage';
import { Ionicons } from '@expo/vector-icons';
import { color } from './utility/color';
import Club from './screens/Clubs';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(false);
  const [endPoint, setEndPoint] = useState(false);

  useEffect(() => {
    getStorage('endPoint').then((res) => {
      if (res && !endPoint) setEndPoint(res);
      else if (!res && endPoint) setStorage({ key: 'endPoint', value: endPoint });
      else if (res && endPoint && res !== endPoint) setStorage({ key: 'endPoint', value: endPoint });
    });

    Promise.all([getStorage('accessToken'), getStorage('userName')]).then((res) => {
      if (res[0]) setUser(res[1]);
    });
  }, []);

  const setEndPointCallback = useCallback((value) => {
    setEndPoint(value);
  }, []);

  const setLoginCallBack = useCallback((value) => {
    setUser(value);
  }, []);

  return (
    <NavigationContainer >
      <StatusBar barStyle={'dark-content'} backgroundColor="white"/>
      {endPoint ? (
        <>
        {user ? (
          <Tab.Navigator  initialRouteName='Home'  screenOptions={{
            tabBarActiveTintColor: color.primary, 
            tabBarInactiveTintColor: color.gray, 
            tabBarLabelStyle: { fontSize: 10, paddingBottom: 8 },
            tabBarStyle: {height: 62, paddingTop: 8,},
          
             
          }} 

        >
                <Tab.Screen name="Club" component={Club} options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name='apps' size={size-4} color={color} />
                    ),
                    title: `Club`,
                  }} />
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: `Dashboard`, 
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name='home' size={size} color={color} />
                  )}}
              />
                  <Tab.Screen 
                    name="Settings"
                    component={Config}
                    options={{ title: `Setting`, 
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name='settings' size={size-4} color={color} />
                    )}}
                  />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator>

            <Stack.Screen
            name="Login"
            options={{ title: "Login" }}
            >
              {
                (props)=><Login {...props} setConfig={setEndPointCallback} setLogin={setLoginCallBack}/>
              }
            </Stack.Screen>
            </Stack.Navigator>

            )}
            </>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name='Config'
            options={{ title: "Configurations" }}
          >
            {(props) => <Config {...props} setConfig={setEndPointCallback} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
