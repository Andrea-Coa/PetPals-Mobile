import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Image, TouchableOpacity } from 'react-native';
import { fetchMySubscriptions } from '../api';
import { FontAwesome } from '@expo/vector-icons';


export const MySubscriptionsFeedScreen = () => {
    const [subscriptions, setSubscriptions] = useState([]);

    useState(()=> {
        const fetchSubscriptions = async() => {
          try {
            const res = await fetchMySubscriptions();
            setSubscriptions(res);
          } catch(error) {
            console.error('Failed to fetch your subscriptions', error);
          }
        }
        fetchSubscriptions();
      }, []);
      console.log(subscriptions);
    return (
        <ImageBackground source={ require("../assets/dog_bg.png")} style={styles.background}>

    <View style={styles.container}>
      <View style={styles.titlebox}>
        <Text style={styles.title}>Mis suscripciones</Text>
      </View>
      {subscriptions[0] &&
      <FlatList
        data={subscriptions}
        keyExtractor={(item)=> item.company.id.toString()}
        renderItem={({item})=> (
          <View style={styles.itemContainer}>
            {item.company.profileImage ? (
                <Image style={styles.image} source={{uri: item.company.profileImage}}/>
            ) : (
                <FontAwesome name="users" size={32} color="white" />
            )}
            <View style={styles.itemTextContainer}>
              <Text style={{ color:'white' }}>{item.company.name}</Text>
            </View>
            <TouchableOpacity style={styles.itemTextContainer}>
                <Text style={styles.cancel}>cancelar</Text>
            </TouchableOpacity>
          </View>
        )}>

      </FlatList>}
    </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
    background: {
      flex:1
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal:8
    },
    titlebox: {
      padding:8
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color:'white',
      
    },
    itemContainer: {
        flexDirection: 'row',
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
      },
    itemTextContainer: {
    padding: 10,
    },
    image: {
        width: 50,
        height: 50,        
        marginRight: 10,
        backgroundColor:'white'
    },
    cancel: {
        color:'#00CED1'
    }
})