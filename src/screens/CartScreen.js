import React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { COLOURS } from '../global/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/Header';
import { useCart } from '../navigation/CartContex';

const CartScreen = () => {
  const { cartItems, setCartItems } = useCart();

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const updateCart = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleAddToCart = (itemId, currentQuantity) => {
    updateCart(itemId, currentQuantity + 1);
  };

  const removeFromCart = (itemId, currentQuantity) => {
    updateCart(itemId, Math.max(0, currentQuantity - 1));
  };

  const renderItem = ({ item }) => {
    const imageUrl = Array.isArray(item.image_url)
    ? item.image_url[0] // Use the first image in the array
    : item.image_url || 'https://via.placeholder.com/150'; // Fallback to a placeholder image
  return (  
    <View style={styles.cartItem}>
      {/* Use firstImage for the image */}
      <Image source={{ uri: imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.price}>{`€${item.price * item.quantity}`}</Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity onPress={() => removeFromCart(item.id, item.quantity)}>
          <AntDesign name="minus" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleAddToCart(item.id, item.quantity)}>
          <AntDesign name="plus" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
    )
  };
  
  
  return (
    <View style={styles.screen}>
      <Header title="Cart" />
      <View style={styles.cartList}>
        {cartItems && cartItems.length > 0 ? (
          <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 150 }} // Add padding for the fixed bottom section
        />
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>No items added to the cart!</Text>
          </View>
        )}
      </View>

      {/* Fixed Bottom Section */}
      {cartItems && cartItems.length > 0 && (
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <View style={styles.priceContainer}>
            <Text style={styles.oldPrice}>€{(calculateTotalPrice() * 1.2).toFixed(2)}</Text>
            <Text style={styles.newPrice}>€{calculateTotalPrice().toFixed(2)}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLOURS.lightGray,
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: COLOURS.white,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOURS.text,
  },
  price: {
    fontSize: 14,
    color: COLOURS.text,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: COLOURS.text,
  },
  quantity: {
    fontSize: 16,
    color: COLOURS.text,
    marginHorizontal: 10,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100, // Fixed height for the bottom section
    position: 'absolute', // Fix the bottom section to the bottom
    bottom: 45, // Place it at the bottom of the screen
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: COLOURS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    zIndex: 10, // Ensure it appears above other content
  },
  continueButton: {
    flex: 1,
    backgroundColor: COLOURS.purple,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    color: COLOURS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceContainer: {
    marginLeft: 10,
    alignItems: 'center',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: 'grey',
    fontSize: 14,
  },
  newPrice: {
    color: COLOURS.purple,
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: COLOURS.text,
    fontWeight: 'bold',
  },
});

export default CartScreen;
