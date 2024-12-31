import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Avatar, Button, Icon } from 'react-native-elements';
import { colors, COLOURS } from '../global/styles';
import SignInScreen from './authScreens/SignInScreen';

const ProfileScreen = ({ navigation }) => {
//   const { dispatchSignedIn } = useContext(SignInContext);

  // Function to handle sign out
//   const signOut = async () => {
//     try {
//       await auth().signOut();
//       dispatchSignedIn({ type: 'UPDATE_SIGN_IN', payload: { userToken: null } });
//     } catch (error) {
//       Alert.alert(error.code);
//     }
//   };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <Avatar
        rounded
        size="large"
        source={require('../assets/images/avatar-1.jpg')}
        containerStyle={styles.avatar}
      />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>John Mark</Text>
          <Text style={styles.userEmail}>john@xpressfood.com</Text>
        </View>
      </View>

      {/* User Stats */}
      {/* <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Cart</Text>
        </View>
      </View> */}

      {/* Settings Options */}
      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => navigation.navigate('AddressScreen')}
      >
        <Icon name="map-marker-outline" type="material-community" color={COLOURS.text} />
        <Text style={styles.menuText}>Address</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('PaymentScreen')}
      >
        <Icon name="credit-card-outline" type="material-community" color={COLOURS.text} />
        <Text style={styles.menuText}>Payment</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => navigation.navigate('PrivacyPolicyScreen')}
      >
      <Icon name="shield-check-outline" type="material-community" color={COLOURS.text} />
      <Text style={styles.menuText}>Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => navigation.navigate('TermsOfServiceScreen')}
      >
        <Icon name="file-document-outline" type="material-community" color={COLOURS.text} />
        <Text style={styles.menuText}>Terms of Service</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.menuItem}>
        <Icon name="lifebuoy" type="material-community" color={COLOURS.text} />
        <Text style={styles.menuText}>Help</Text>
      </TouchableOpacity>

      {/* Sign Out Button */}
      <Button
        title="Sign Out"
        icon={{ name: 'logout-variant', type: 'material-community', color: 'white' }}
        buttonStyle={styles.signOutButton}
        onPress={SignInScreen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.lightGray,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  avatar: {
    borderWidth: 3,
    borderColor: colors.pagebackground,
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: COLOURS.text,
  },
  userEmail: {
    fontSize: 14,
    color: COLOURS.text,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOURS.text,
  },
  statLabel: {
    fontSize: 14,
    color: COLOURS.text,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey5,
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
    color: COLOURS.text,
  },
  preferences: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  darkThemeText: {
    fontSize: 16,
    color: colors.grey2,
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: colors.buttons,
    marginTop: 20,
  },
});

export default ProfileScreen;
