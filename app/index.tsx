import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const WEBVIEW_URL = 'https://1300gloveman.com.au/';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: WEBVIEW_URL }} style={styles.webview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
