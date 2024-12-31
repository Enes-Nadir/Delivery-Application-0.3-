import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity, Animated, StyleSheet, FlatList } from 'react-native';
import { COLOURS } from '../global/styles';
import Header from '../components/Header';
import { useCart } from '../navigation/CartContex';

const { width } = Dimensions.get('window');

const defaultImages = [
  require('../assets/images/baked-fries.jpg'),
  require('../assets/images/ice-kacang.jpg'),
  require('../assets/images/kek-lapis.jpg'),
];

const Details = ({ route, navigation }) => {
  const { item, initialQuantity = 0 } = route.params;
  const { cartItems, setCartItems } = useCart();
  const [quantity, setQuantity] = useState(initialQuantity);
  const buttonWidth = useRef(new Animated.Value(0.9 * width)).current;
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const buttonColor = useRef(new Animated.Value(0)).current;
  const buttonPosition = useRef(new Animated.Value(0)).current;
  const images = item.images && item.images.length > 0 ? item.images : defaultImages;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [cartItems, item.id]);

  const updateCart = (newQuantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
      );
      if (!updatedItems.find((cartItem) => cartItem.id === item.id)) {
        updatedItems.push({ ...item, quantity: newQuantity });
      }
      return updatedItems.filter((cartItem) => cartItem.quantity > 0);
    });
  };

  const handleAddToCart = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCart(newQuantity);
  };

  const removeFromCart = () => {
    const newQuantity = quantity - 1;
    if (newQuantity <= 0) {
      deleteItemFromCart();
    } else {
      setQuantity(newQuantity);
      updateCart(newQuantity);
    }
  };

  const deleteItemFromCart = () => {
    setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== item.id));
    setQuantity(0);
  };

  const interpolatedButtonColor = buttonColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(106, 27, 154)', 'red'],
  });

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    setActiveIndex(Math.round(scrollPosition / width));
  };

  const renderDotIndicators = () => {
    return images.map((_, index) => (
      <View
        key={index}
        style={{
          backgroundColor: activeIndex === index ? 'purple' : 'grey',
          height: 10,
          width: 10,
          borderRadius: 5,
          marginHorizontal: 6,
        }}
      />
    ));
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLOURS.white }}>
      <Header title="Product Details" icon="arrow-left" />
      <View style={{ width, height: 300 }}>
        <FlatList
          data={images}
          renderItem={({ item }) => <Image source={item} style={{ height: 300, width }} />}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false, listener: handleScroll }
          )}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
          {renderDotIndicators()}
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLOURS.text }}>{item.name}</Text>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: COLOURS.purple, marginBottom: 10 }}>{item.price} €</Text>
      </View>
      <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
        <Text style={{ fontSize: 16, marginVertical: 10, color: COLOURS.text }}>
          Description about the product goes here...
        </Text>
      </View>
      <View style={styles.bottomButtonContainer}>
        {quantity === 0 ? (
          <TouchableOpacity onPress={handleAddToCart}>
            <Animated.View
              style={[
                styles.addButton,
                { width: buttonWidth, backgroundColor: interpolatedButtonColor, transform: [{ translateX: buttonPosition }] },
              ]}
            >
              <Animated.Text style={[styles.addButtonText, { opacity: buttonOpacity }]}>
                Add To Cart
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>
        ) : (
          <View style={styles.cartControls}>
            <TouchableOpacity style={styles.removeButton} onPress={deleteItemFromCart}>
              <Text style={styles.removeButtonText}>Remove Item</Text>
            </TouchableOpacity>
            <View style={styles.quantityControl}>
              <TouchableOpacity onPress={removeFromCart}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={handleAddToCart}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOURS.white,
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  removeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOURS.white,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    paddingHorizontal: 10,
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
  },
  quantityButton: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    color: COLOURS.purple,
  },
  quantityText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLOURS.purple,
    marginHorizontal: 10,
  },
});

export default Details;
