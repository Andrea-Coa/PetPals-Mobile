import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { ActivityFeedScreen } from '../screens/ActivityFeedScreen';
import { ActivityScreen } from '../screens/ActivityScreen';

import { Ionicons } from '@expo/vector-icons';
import { ActivityMap } from '../screens/ActivityMap';

const Tab = createBottomTabNavigator();
const StackActivity = createNativeStackNavigator();

const ActivityStack = () => {
    return (
        <StackActivity.Navigator initialRouteName='Eventos'>
            <StackActivity.Screen name='Eventos' component={ActivityFeedScreen}/>
            <StackActivity.Screen name='Evento' component={ActivityScreen}/>
            <StackActivity.Screen name='Mapa' component={ActivityMap}/>
        </StackActivity.Navigator>

    )
}


const Navigation = () => {

    // mover esto luego afuera. 
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Eventos'>
            <Tab.Screen 
                name='ActivityStack' component={ActivityStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                    <Ionicons 
                        name='grid-outline' 
                        size={size} 
                        color={color}/>
                    ),
                }}/>            
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;