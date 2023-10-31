import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SearchScreen from './screens/SearchScreen/SearchScreen';
import MypageScreen from './screens/MypageScreen/MypageScreen';

// type RootStackParamList = {
//   Home: undefined;
//   Search: {
//     id: number;
//   };
//   Mypage: undefined;
// };

// firebase
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[Background Remote Message]', remoteMessage);
});

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('[FCM Token] ', fcmToken);
  };

  useEffect(() => {
    getFcmToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('[Remote Message] ', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'home',
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: 'search' }}
        />
        <Tab.Screen
          name="Mypage"
          component={MypageScreen}
          options={{ title: 'mypage' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
