// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Alert } from 'react-native';
// import { Button } from 'react-native-elements';
// import { CardField, useStripe } from '@stripe/stripe-react-native';

// const PaymentScreen = ({ navigation }) => {
//   const { confirmPayment } = useStripe();
//   const [cardDetails, setCardDetails] = useState(null);

//   const handlePayment = async () => {
//     if (!cardDetails?.complete) {
//       Alert.alert('Error', 'Please enter complete card details.');
//       return;
//     }

//     // Call your backend to create a PaymentIntent
//     const response = await fetch('https://your-backend.com/create-payment-intent', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ amount: 5000, currency: 'eur' }), // Amount in cents
//     });

//     const { clientSecret } = await response.json();

//     // Confirm payment
//     const { error, paymentIntent } = await confirmPayment(clientSecret, {
//       paymentMethodType: 'Card',
//       card: cardDetails,
//     });

//     if (error) {
//       Alert.alert('Payment Failed', error.message);
//     } else {
//       Alert.alert('Success', 'Payment Successful!');
//       navigation.goBack();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Enter Card Details</Text>
//       <CardField
//         postalCodeEnabled={true}
//         placeholders={{ number: '4242 4242 4242 4242' }}
//         cardStyle={styles.cardStyle}
//         style={styles.cardContainer}
//         onCardChange={(card) => setCardDetails(card)}
//       />
//       <Button title="Pay €50" onPress={handlePayment} buttonStyle={styles.payButton} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
//   headerText: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   cardContainer: { height: 50, marginVertical: 30 },
//   cardStyle: { backgroundColor: '#efefef', borderRadius: 10 },
//   payButton: { backgroundColor: '#635bff', borderRadius: 10 },
// });

// export default PaymentScreen;
