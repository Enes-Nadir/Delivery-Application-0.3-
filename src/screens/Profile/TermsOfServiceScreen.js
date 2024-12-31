import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { COLOURS } from '../../global/styles';

const TermsOfServiceScreen = () => (
  <View style={styles.container}>
    <Header title="Terms of Service" icon="arrow-left" />
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.text}>
        {/* Add your terms of service content here */}
        These are the Terms of Service for using our app.
        It outlines the rules and conditions that govern usage.
      </Text>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOURS.white },
  content: { padding: 20 },
  text: { fontSize: 16, color: COLOURS.text, lineHeight: 22 },
});

export default TermsOfServiceScreen;
