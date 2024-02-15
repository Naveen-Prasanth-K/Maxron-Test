import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NativeStackNav from './src/Navigation/NativeStackNav';

export default function App() {
  return (
    <View style={styles.container} >
      <StatusBar style="auto" />
      <NativeStackNav />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 0,
  },
});
