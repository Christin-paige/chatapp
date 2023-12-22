//initializing Firestore connection
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import the screens
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';

//import react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//initialize cloud firestore and ger a reference to the service


const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDXDi-F-f9uuj1P3tN0LiMceMg9QpyxVPY",
    authDomain: "chatapp-f2091.firebaseapp.com",
    projectId: "chatapp-f2091",
    storageBucket: "chatapp-f2091.appspot.com",
    messagingSenderId: "1098929749207",
    appId: "1:1098929749207:web:b8bcac04e479fcae290492"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

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
        {props => <Screen2 db={db} {...props}/>}
      
       </Stack.Screen>
     </Stack.Navigator>
   </NavigationContainer>
 );
}




export default App;


