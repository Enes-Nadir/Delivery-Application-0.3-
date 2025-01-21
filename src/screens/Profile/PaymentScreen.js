import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { CardField, useConfirmSetupIntent } from '@stripe/stripe-react-native';

const PaymentScreen = ({ route }) => {
  const { onSave } = route.params;

  const handleSaveCard = () => {
    // Simulate saving card details (replace with real API call)
    const savedCard = { last4: '1234' };
    onSave(savedCard);
  };

  return (
    <View style={styles.container}>
      <CardField
        postalCodeEnabled={true}
        placeholder={{ number: '4242 4242 4242 4242' }}
        style={styles.cardField}
      />
      <Button title="Save Card" onPress={handleSaveCard} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  cardField: {
    height: 50,
    marginVertical: 30,
  },
});

export default PaymentScreen;
