// import the screens
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';

//import react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


const App = () => {
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
       component={Screen2}
       /> 
     </Stack.Navigator>
   </NavigationContainer>
 );
}




export default App;


