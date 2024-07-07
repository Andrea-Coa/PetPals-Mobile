import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Image } from 'react-native';
import { fetchMyPets } from '../api';

const MyPetsFeedScreen = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [page, setPage] = useState(0);

  useState(()=> {
    const fetchAdoptions = async() => {
      try {
        const res = await fetchMyPets(page);
        setAdoptions(res.content);
      } catch(error) {
        console.error('Failed to fetch your pets', error);
      }
    }
    fetchAdoptions();
  }, [page]);
  console.log('xxd', adoptions);
  return (
    <ImageBackground source={ require("../assets/dog_bg.png")} style={styles.background}>

    <View style={styles.container}>
      <View style={styles.titlebox}>
        <Text style={styles.title}>Mis mascotas</Text>
      </View>
      {adoptions[0] &&
      <FlatList
        data={adoptions}
        keyExtractor={(item)=> item.petDto.id.toString()}
        renderItem={({item})=> (
          <View style={styles.itemContainer}>
            {item.petDto.image && <Image style={styles.itemImage} source={{uri:item.petDto.image}}/>}
            <View style={styles.itemTextContainer}>
              <Text style={styles.petname}>{item.petDto.name}</Text>
              <Text style={styles.itemText}>Adoptaste en {item.adoptionDate}</Text>
            </View>
          </View>
        )}>

      </FlatList>}
    </View>
    </ImageBackground>
  );
};

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
  },
  itemText: {
    fontSize: 16,
  },
  petname: {
    fontSize:20,
    fontWeight:'bold'
  }
});

export default MyPetsFeedScreen;
