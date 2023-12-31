import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import background from '../components/pigeons-color.jpg';
import { getAuth, signInAnonymously } from 'firebase/auth';



const Screen1 = ({ navigation }) => {
   const [name, setName] = useState('');
   const [backgroundColor, setBackgroundColor] = useState('');

   //logging in user anonymously
   const auth = getAuth();

   const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", { 
          userID: result.user.uid,
          name,
          backgroundColor: backgroundColor
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      })
  }
  //imported ImageBackground and nested it inside the container
return (
  <View style={styles.container}>
   <ImageBackground
   style={styles.container}
   source={background}
   >
    
    <Text style={styles.textTitle}>Homing</Text>


 <View style={styles.box}>
   <View style={styles.textInput}>
    <TextInput
    value={name}
    onChangeText={setName}
    placeholder="Your Name"
    />
   
   </View>
  
   <Text
   style={styles.colorText}>Choose background color:</Text>
  
 <View style={styles.threeCircles}>
  <TouchableOpacity style={[ styles.circle, styles.circleColor1]}
 onPress={() =>  { setBackgroundColor('#090C08');
}}
/>
  <TouchableOpacity style={[ styles.circle, styles.circleColor2]}
  onPress={() =>{ setBackgroundColor('#4A3E80');
 }}
  />
  <TouchableOpacity style={[ styles.circle, styles.circleColor3]}
   onPress={() =>{ setBackgroundColor('#8250AF');
  }}
   />
  <TouchableOpacity style={[ styles.circle, styles.circleColor4]}
    onPress={() =>{ setBackgroundColor('#FFA0FF');
   }}
     
  />
  </View>

  <TouchableOpacity
  accessible={true}
  accessibilityLabel="More options"
  accessibilityHint="Lets you choose to send an image or your geolocation."
  accessibilityRole="button"
  >
<View style={styles.button}>
    <Button
      style={styles.button}
      title="Send a Message"
      color="#684995"
      onPress={ signInUser }
    />
    </View>
    </TouchableOpacity>
    </View>
    
   </ImageBackground>
   {Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
  </View>
);
}


const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
},


textTitle: {
 marginTop: 16,
 fontSize: 55,
 fontWeight: '600',
 color: '#FFFFFF',
 paddingBottom: 150,
},


textInput: {
  width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15
   
},


colorText: {
 fontSize: 16,
 fontWeight: '300',
 color: '#757083',
 paddingTop: 10,
},


circle: {
 width: 50,
 height: 50,
 margin: 15,
 borderRadius: 50,
},
threeCircles: {
 flexDirection: 'row',
},
circleColor1: {
 backgroundColor: '#090C08',
},


circleColor2: {
 backgroundColor: '#4A3E80',
},


circleColor3: {
 backgroundColor: '#8250AF',
},


circleColor4: {
 backgroundColor: '#FFA0FF',
},


box: {
 justifyContent: 'center',
 alignItems: 'center',
 width: 400,
 height: 300,
 backgroundColor: 'white',
},


button: {
justifyContent: 'center',
fontSize: 16,
fontWeight: '600',
color: '#FFFFFF',
backgroundColor: '#757083',
width: 352,
height: 50,


},


});


export default Screen1;
