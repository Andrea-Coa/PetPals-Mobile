import { useEffect, useState } from 'react'
import {fetchSingleActivity} from '../api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Image} from 'react-native';
import {cld} from '../Cloudinary'




export const ActivityScreen = (props) => {
  const [activity,  setActivity] = useState(null);

  
  useEffect(()=> {
    const getActivity = async() => {
      try {
        const res = await fetchSingleActivity(props.route.params.id);
        console.log("IIIII", res);
        setActivity(res);

      }
      catch(error) {
        console.error('Error fetching activity', error);
      }
    }
    getActivity();
  }, [props.route.params.id]);

  console.log("Maria");


  return (
    <SafeAreaView >
      {activity && 
        <View>
          <Image 
          source={{uri:"https://res.cloudinary.com/dp7zuvv8c/image/upload/v1/PetPals/nbgzcrq0gafkkiafmkeq?_a=DATAdtAAZAA0"}}
          style={{width:300, height:300}}
          resizeMode='cover'
          />
          <Text> {activity.name}</Text>
              <Text>{activity.activityType}</Text>
              <Text>{activity.companyDto.name}</Text>
              <Text>{activity.startDate}</Text>
              <Text>{activity.endDate}</Text>
              <Text>{activity.locations && activity.locations.length > 0 ? activity.locations[0].address : 'No location available'}</Text>
        </View>}
    </SafeAreaView>
  );
}
