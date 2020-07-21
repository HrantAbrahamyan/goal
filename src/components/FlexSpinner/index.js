import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const FlexSpinner = () => (
  <View style={styles.container}>
    <ActivityIndicator />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default FlexSpinner;
