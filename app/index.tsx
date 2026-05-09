import { useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Image, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const WEBVIEW_URL = 'https://1300gloveman.com.au/';

export default function HomeScreen() {
  const [isWebReady, setIsWebReady] = useState(false);
  const overlayOpacity = useRef(new Animated.Value(1)).current;

  const hideOverlay = useMemo(
    () => () => {
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }).start();
    },
    [overlayOpacity]
  );

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: WEBVIEW_URL }}
        style={styles.webview}
        onLoadEnd={() => {
          if (!isWebReady) {
            setIsWebReady(true);
            hideOverlay();
          }
        }}
      />
      {!isWebReady && (
        <Animated.View style={[styles.loadingOverlay, { opacity: overlayOpacity }]}>
          <Image
            source={require('@/assets/images/store-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <ActivityIndicator size="small" color="#4A6FB3" style={styles.spinner} />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 280,
    height: 88,
  },
  spinner: {
    marginTop: 20,
  },
});
