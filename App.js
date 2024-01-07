//initializing Firestore connection
import { initializeApp } from "firebase/app";
//disable reconnection attempts by firestore db and add to useEffect
import { getFirestore, disableNetwork, enableNetwork  } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// import the screens
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';

//import react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//installed netInfo through the CLI and now importing it
import { useNetInfo }from '@react-native-community/netinfo';

import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';



//initialize cloud firestore and ger a reference to the service
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["Failed prop type", "@firebase/auth:"]);

const App = () => {
   //defines network connectivity status
   const connectionStatus = useNetInfo();
  

 
  //display an alert if status is lost
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  const firebaseConfig = {
    apiKey: "AIzaSyDXDi-F-f9uuj1P3tN0LiMceMg9QpyxVPY",
    authDomain: "chatapp-f2091.firebaseapp.com",
    projectId: "chatapp-f2091",
    storageBucket: "chatapp-f2091.appspot.com",
    messagingSenderId: "1098929749207",
    appId: "1:1098929749207:web:b8bcac04e479fcae290492"
  };
//initialize firebase
  const app = initializeApp(firebaseConfig);
  //initialize cloud firestore and get reference to service
  const db = getFirestore(app);
  const storage = getStorage(app);

 return (
   <NavigationContainer>
     <Stack.Navigator
     initialRouteName="Start"
     >
       <Stack.Screen
         name="Start"
         component={Screen1}
         />
       <Stack.Screen
       name="Chat"
       >
        {props => <Screen2 
        isConnected={connectionStatus.isConnected} 
        db={db} 
        storage={storage}
        {...props}
        />}
       </Stack.Screen>
     </Stack.Navigator>
   </NavigationContainer>
 );
}

export default App;


