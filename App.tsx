import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { colors } from './src/global/styles';
import RootNavigator from './src/navigation/RootNavigator';
import { CartProvider } from './src/navigation/CartContex'; 
import { StripeProvider } from '@stripe/stripe-react-native';

function App(): React.JSX.Element {
  return (
    <StripeProvider publishableKey="pk_test_51QcTXkK7PImQgyIFRjXULolVEGHmRKwz5KqBDP9ZIDsu4G5XDTRFDEoqn9iA7dhzhimBRwnpShjsffVNIbeFeNbx00CSVmVVuE">
      <CartProvider>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor={colors.statusbar} />
          <RootNavigator />
        </View>
      </CartProvider>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
