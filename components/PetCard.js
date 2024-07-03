import React from 'react'
import { 
    View,
    Text,
    Image, 
    StyleSheet} from 'react-native'

export const PetCard = ({pet}) => {
    console.log("from petcard:", pet.image);
  return (
    <View style={styles.whitebox}>
        <Image 
        // Imagen por default si es que el pet no tiene imagen. 
        source={{uri: pet.image ? pet.image : 'https://res.cloudinary.com/dp7zuvv8c/image/upload/v1/PetPals/yrxupk4b8uyivwz8fsu3?_a=DATAdtAAZAA0'}}
        style={styles.image} 
        />
        <View>
            <Text style={styles.name}>{pet.name}</Text>
            <Text style={styles.attributes}>{pet.breed}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    whitebox:{
        backgroundColor:'#fff',
        margin:10,
        padding:10,
        height:200,
        borderRadius:8
    },
    name:{
        fontSize:20,
        fontWeight:'bold'
    },
    attributes:{
        color:"#808080"
    },
    image:{
        height:'60%',
        width:'100%',
        borderRadius:4,
        marginBottom:4
    }
});
