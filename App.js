import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MainNavigator from './navigation/MainNavigator';



export default function App() {
  return (
    <SafeAreaProvider>
          {/* <StatusBar style="auto" /> */}
          <MainNavigator/>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
