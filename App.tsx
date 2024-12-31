import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { colors } from './src/global/styles';
import RootNavigator from './src/navigation/RootNavigator';
import { CartProvider } from './src/navigation/CartContex'; // Path to your CartContext file


function App(): React.JSX.Element {
  return (
    <CartProvider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.statusbar} />
        <RootNavigator />
      </View>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
