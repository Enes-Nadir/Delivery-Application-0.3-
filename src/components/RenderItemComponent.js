import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { COLOURS } from '../global/styles';

const RenderItemComponent = ({ item, addToCart, onPressItem }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={styles.itemContainer}
    onPress={() => onPressItem(item)}
  >
    <View style={styles.itemCard}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.itemTitle}>
          {item.name.length > 22 ? `${item.name.substring(0, 20)}...` : item.name}
        </Text>
      </View>
      <View style={styles.itemImageContainer}>
        <Image source={item.image} style={styles.itemImage} />
      </View>
      <Text style={styles.itemWeight}>{item.price} €</Text>
      <View style={styles.itemFooter}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addToCart(item)}
        >
          <Entypo name="plus" style={styles.addIcon} />
        </TouchableOpacity>
        <View style={styles.ratingContainer}>
          <AntDesign name="star" style={styles.starIcon} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemContainer: {
    width: '45%',
    marginHorizontal: '2.5%',
    marginBottom: 20,
  },
  itemCard: {
    width: '100%',
    height: 190,
    backgroundColor: COLOURS.white,
    borderRadius: 20,
    elevation: 4,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: { fontSize: 14, fontWeight: 'bold', color: COLOURS.text, textAlign: 'center' },
  itemImageContainer: { width: 90, height: 80, marginVertical: 10 },
  itemImage: { width: '100%', height: '100%', resizeMode: 'contain' },
  itemWeight: { fontSize: 12, color: COLOURS.text, opacity: 0.5 },
  itemFooter: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  addButton: {
    width: 40,
    height: 30,
    backgroundColor: COLOURS.purple3,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  addIcon: { fontSize: 18, color: COLOURS.white },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  starIcon: { fontSize: 12, color: COLOURS.text, marginRight: 5 },
  ratingText: { fontSize: 15, fontWeight: 'bold', color: COLOURS.text },
});

export default RenderItemComponent;
