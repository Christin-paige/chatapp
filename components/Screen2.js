import { useEffect, useState } from 'react';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Screen2 = ({ route, navigation, db, isConnected}) => {
  const { name } = route.params;
  const { userID } = route.params;
  const { backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);
  
  const onSend = (newMessages) => {
   addDoc(collection(db,"messages"),
   newMessages[0])
  }

  
  let unsubMessages;
   useEffect(() => {
     navigation.setOptions({ title: name });

       if (isConnected === true){
       const q = query(collection(db,"messages"), orderBy("createdAt",
       "desc"));
       unsubMessages = onSnapshot(q, async (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({ 
            id: doc.id, 
            ...doc.data(), 
            createdAt: doc.data().createdAt.toDate(),
             })
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
       });
      }else loadCachedMessages();

       //clean up code
       return () => {
       if (unsubMessages) unsubMessages();
       }
     }, [isConnected]);
//adding async storage
const loadCachedMessages = async () => {
  const cachedMessages = await AsyncStorage.getItem("messages") || [];
  setMessages(JSON.parse(cachedMessages));
}
     const cacheMessages = async (messagesToCache) => {
      try {
        await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
      } catch (error) {
        console.log(error.message);
      }
    }

     useEffect(() => {
      navigation.setOptions({ title: name })
     },[]);

     const renderInputToolbar = (props) => {
      if (isConnected) return <InputToolbar {...props} />;
      else return null;
     }

     //sets color of the chat bubbles for each user
   const renderBubble = (props) => {
    return (
    <Bubble
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
    )
  };
  
 
   const renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

return (
 <View style={[styles.container, {backgroundColor:backgroundColor}]}>
      <GiftedChat
     messages={messages}
     renderActions={renderCustomActions}
     renderCustomView={renderCustomView}
     renderBubble={renderBubble}
     renderInputToolbar={renderInputToolbar}
     onSend={messages => onSend(messages)}
     user={{
      _id: userID,
      name
     }}
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