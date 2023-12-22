import { useEffect, useState } from 'react';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { collection, getDocs, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const Screen2 = ({ route, navigation, db}) => {
  const { name, userID } = route.params;
  const { backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);
  
  const onSend = (newMessages) => {
   addDoc(collection(db,"messages"),
   newMessages[0])
  }

   useEffect(() => {
       
       const q = query(collection(db,"messages"), orderBy("createdAt",
       "desc"))
       const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
          newMessages.push({ 
            id: doc.id, ...doc.data(), createdAt: doc.data().createdAt.toDate() })
        });
        setMessages(newMessages);
       });
       //clean up code
       return () => {
       if (unsubMessages) unsubMessages();
       }
     }, []);

     useEffect(() => {
      navigation.setOptions({ title: name })
     },[]);

   const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

return (
 <View style={[styles.container, {backgroundColor:backgroundColor}]}>
      <GiftedChat
     name = { name }
     messages={messages}
     renderBubble={renderBubble}
     onSend={messages => onSend(messages)}
     user={ userID }
    
   />
   { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
  </View>


);
}

const styles = StyleSheet.create({
container: {
  flex: 1,

}
});


export default Screen2;