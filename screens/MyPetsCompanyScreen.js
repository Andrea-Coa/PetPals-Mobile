import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Image } from 'react-native';
import { fetchMyPets, fetchPetsCompany } from '../api';

export const MyPetsCompanyScreen = ({route}) => {
    const [pets, setPets] = useState([]);
    const [page, setPage] = useState(0);
    const {id} = route.params;

    useState(()=> {
        const fetchPets = async() => {
            try {
                const res = await fetchPetsCompany(id, page);
                console.log(res);
                setPets(res.content);
            } catch(error) {
                console.error('failed to fetch pets', error);
            }
        }
        fetchPets();
    }, [page]);

    return (
        <ImageBackground source={ require("../assets/dog_bg.png")} style={styles.background}>

        <View style={styles.titlebox}>
            <Text style={styles.title}>Mis mascotas</Text>
        </View>
        {pets[0] &&
        <FlatList
            data={pets}
            keyExtractor={(item)=> item.id.toString()}
            renderItem={({item})=> (
            <View style={styles.itemContainer}>
                {item.image && <Image style={styles.itemImage} source={{uri:item.image}}/>}
                <View style={styles.itemTextContainer}>
                <Text style={styles.petname}>{item.name}</Text>
                <Text style={styles.itemText}>Sexo: {item.sex}</Text>
                <Text style={styles.itemText}>Raza: {item.breed}</Text>
                <Text 
                    style={styles.itemText}
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    Descripción: {item.description}</Text>
                </View>
            </View>
            )}>

        </FlatList>}
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    background: {
      flex:1
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
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    itemImage: {
        width: 100,
        height: 100,
    },
    itemTextContainer: {
        padding: 10,
        width:'70%',
    },
    itemText: {
        fontSize: 12,
        color:'gray'
    },
    petname: {
        fontSize:20,
        fontWeight:'bold'
    }
});