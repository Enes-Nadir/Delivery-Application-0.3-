import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { COLOURS } from '../../global/styles';
import Header from '../../components/Header';

const AddressScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [savedAddress, setSavedAddress] = useState(null);

  const handleSaveAddress = () => {
    if (name && street && flatNumber && city && postalCode && phoneNumber) {
      const newAddress = {
        name,
        address: `${street}, No ${flatNumber}, ${city}, ${postalCode}`,
        phone: `+370 ${phoneNumber}`,
      };
      setSavedAddress(newAddress);
      setName('');
      setStreet('');
      setFlatNumber('');
      setCity('');
      setPostalCode('');
      setPhoneNumber('');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Address" icon="arrow-left" />
      <View style={{ padding: 20 }}>
        {savedAddress ? (
          <View style={[styles.savedAddressContainer, { marginVertical: 20 }]}>
            <View style={styles.savedAddressIcon}>
              <Icon name="map-marker" type="material-community" size={50} color={COLOURS.purple} />
            </View>
            <View style={styles.savedAddressDetails}>
              <Text style={styles.savedAddressName}>{savedAddress.name}</Text>
              <Text style={styles.savedAddressText}>{savedAddress.address}</Text>
              <Text style={styles.savedAddressPhone}>{savedAddress.phone}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.headerText}>Add Address</Text>
        )}

        <View style={styles.inputContainer}>
          <Icon name="account-outline" type="material-community" color={COLOURS.text} />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="grey"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.inputContainer, styles.flexContainer]}>
            <Icon name="road" type="font-awesome" color={COLOURS.text} />
            <TextInput
              placeholder="Street Address"
              placeholderTextColor="grey"
              style={styles.input}
              value={street}
              onChangeText={setStreet}
            />
          </View>
          <View style={[styles.inputContainer, styles.flatNumberInput]}>
            <Icon name="door" type="material-community" color={COLOURS.text} />
            <TextInput
              placeholder="Flat No."
              placeholderTextColor="grey"
              style={styles.input}
              value={flatNumber}
              onChangeText={setFlatNumber}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.inputContainer, styles.flexContainer]}>
            <Icon name="city" type="material-community" color={COLOURS.text} />
            <TextInput
              placeholder="City"
              placeholderTextColor="grey"
              style={styles.input}
              value={city}
              onChangeText={setCity}
            />
          </View>
          <View style={[styles.inputContainer, styles.flatNumberInput]}>
            <Icon name="zip-box-outline" type="material-community" color={COLOURS.text} />
            <TextInput
              placeholder="Postal Code"
              placeholderTextColor="grey"
              style={styles.input}
              value={postalCode}
              onChangeText={setPostalCode}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="phone" type="font-awesome" color={COLOURS.text} />
          <Text style={styles.phonePrefix}>   +370 </Text>
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="grey"
            style={styles.inputPhone}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={8} 
          />
        </View>

        <Button
          title="Save Address"
          buttonStyle={styles.saveButton}
          onPress={handleSaveAddress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.lightGray,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLOURS.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  savedAddressContainer: {
    flexDirection: 'row',
    backgroundColor: COLOURS.white,
    borderRadius: 10,
    elevation: 2,
    padding: 15,
    alignItems: 'center',
  },
  savedAddressIcon: {
    marginRight: 15,
  },
  savedAddressDetails: {
    flex: 1,
  },
  savedAddressName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOURS.text,
  },
  savedAddressText: {
    fontSize: 16,
    color: COLOURS.text,
    marginVertical: 5,
  },
  savedAddressPhone: {
    fontSize: 16,
    color: COLOURS.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOURS.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 10,
    color: COLOURS.text,
  },
  inputPhone: {
    flex: 1,
    paddingVertical: 10,
    color: COLOURS.text,
    fontSize: 15,
  },
  phonePrefix: {
    fontSize: 15,
    color: COLOURS.text,
    marginRight: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexContainer: {
    width: '55%',
  },
  flatNumberInput: {
    width: '40%',
  },
  saveButton: {
    backgroundColor: COLOURS.purple,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default AddressScreen;
