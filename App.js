import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import NativeStackNav from './src/Navigation/NativeStackNav';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { Colors } from './src/Utilities/GlobalStyles/Colors';
import Store from './src/Utilities/Store/Store';
import Loader from './src/Utilities/UI/Loader';
import { observer } from 'mobx-react';

const App = () => {

  return (
    <AlertNotificationRoot>
      <View style={styles.container} >
        <StatusBar style="dark" />
        <Loader visible={Store?.mainLoader} />
        <NativeStackNav />
      </View>
    </AlertNotificationRoot>
  );
}

export default observer(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 0,
  },
});
