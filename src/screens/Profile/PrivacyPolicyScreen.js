import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { COLOURS } from '../../global/styles';

const PrivacyPolicyScreen = () => (
  <View style={styles.container}>
    <Header title="Privacy Policy" icon="arrow-left" />
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.text}>
        {/* Add your privacy policy content here */}
        This is where your app's Privacy Policy will be displayed. 
        It explains how user data is collected, used, and stored.
      </Text>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOURS.white },
  content: { padding: 20 },
  text: { fontSize: 16, color: COLOURS.text, lineHeight: 22 },
});

export default PrivacyPolicyScreen;
