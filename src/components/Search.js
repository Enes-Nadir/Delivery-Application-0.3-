import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Modal,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOURS } from '../global/styles';
import axios from 'axios';

export default function SearchComponent({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchAllItems();
  }, []);

  const fetchAllItems = async () => {
    try {
      const response = await axios.get('http://10.0.1.40/api/fetch_products.php'); // Replace with your server IP or domain
      setFilteredItems(response.data); // Assuming the API returns all products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      fetchAllItems();
    } else {
      const matchedItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredItems(matchedItems);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSearchQuery(''); // Clear the search text
    fetchAllItems(); // Reset the items list
  };

  const handleItemPress = (item) => {
    closeModal(); // Close the modal
    navigation.push('details', {
      item,
      initialQuantity: item.quantity || 0,
    });
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="search" style={{ fontSize: 20, color: '#888', opacity: 0.8 }} />
        <TextInput
          editable={false}
          placeholder="Search..."
          placeholderTextColor="#888"
          style={styles.searchTextInput}
        />
      </TouchableOpacity>

      <Modal visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalSearchBarContainer}>
            <View style={styles.searchBar}>
              <TouchableOpacity onPress={closeModal} style={styles.backButton}>
                <Ionicons name="arrow-back" style={styles.backIcon} />
              </TouchableOpacity>
              <Ionicons name="search" style={{ fontSize: 20, color: '#888', opacity: 0.8 }} />
              <TextInput
                placeholder="Search..."
                placeholderTextColor="#888"
                style={styles.searchTextInputInModal}
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus={true}
              />
            </View>
          </View>
          <FlatList
          data={filteredItems}
          renderItem={({ item }) => {
            const imageUrl = Array.isArray(item.image_url)
              ? item.image_url[0] // Use the first image in the array
              : item.image_url || 'https://via.placeholder.com/150'; // Fallback to a placeholder image

            return (
              <TouchableOpacity
                onPress={() => handleItemPress(item)}
                style={styles.itemContainer}
              >
                {/* Image Section */}
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.itemImage}
                  onError={() => console.error('Failed to load image:', imageUrl)}
                />
                <View style={styles.textContainer}>
                  {/* Item Name */}
                  <Text style={styles.itemText}>{item.name}</Text>
                  {/* Item Price */}
                  <Text style={styles.itemPrice}>€{item.price}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOURS.purple2,
    borderRadius: 20,
    paddingHorizontal: 20,
    width: '85%',
    height: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  backIcon: {
    fontSize: 25,
    color: '#888',
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLOURS.lightGray,
  },
  searchTextInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  searchTextInputInModal: {
    flex: 1,
    paddingLeft: 3,
    fontSize: 16,
    color: COLOURS.text,
  },
  listContainer: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row', // Horizontal layout
    alignItems: 'flex-start',
    padding: 15,
    backgroundColor: COLOURS.white,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
  },
  itemImage: {
    width: 50, // Adjust size as needed
    height: 50,
    borderRadius: 10,
    marginRight: 10, // Spacing between image and text
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between', // Push price to the bottom
    flexDirection: 'column', // Stack name and price vertically
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOURS.text,
  },
  itemPrice: {
    fontSize: 14,
    color: COLOURS.text,
    opacity: 0.7,
    alignSelf: 'flex-end', // Align price to the bottom-right
  },
});

