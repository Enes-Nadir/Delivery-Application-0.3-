import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Modal,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOURS, Categories } from '../global/styles';
import RenderItemComponent from '../components/RenderItemComponent';
import { useCart } from '../navigation/CartContex';
import { useNavigation } from '@react-navigation/native';

export default function SearchComponent() {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchAllItems();
  }, []);

  const fetchAllItems = () => {
    const allItems = Categories.reduce((acc, category) => {
      return [...acc, ...category.items];
    }, []);
    setFilteredItems(allItems);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      fetchAllItems();
    } else {
      const matchedItems = Categories.reduce((acc, category) => {
        const items = category.items.filter((item) =>
          item.name.toLowerCase().includes(text.toLowerCase())
        );
        return [...acc, ...items];
      }, []);
      setFilteredItems(matchedItems);
    }
  };

  const handleItemPress = (item) => {
    setModalVisible(false);
    navigation.navigate('details', { item });
  };

  const closeModal = () => {
    setModalVisible(false);
    setSearchQuery(''); // Clear the search text
    fetchAllItems(); // Reset the items list
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
            renderItem={({ item }) => (
              <RenderItemComponent
                item={item}
                addToCart={addToCart}
                onPressItem={handleItemPress}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.grid}
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
    marginRight: 10 
  },
  modalContainer: { 
    flex: 1, 
    backgroundColor: COLOURS.lightGray 
  },
  searchTextInput: { 
    marginLeft: 10, 
    fontSize: 16, 
    flex: 1 
  },
  searchTextInputInModal: { 
    flex: 1, 
    paddingLeft: 3,
    fontSize: 16, 
    color: COLOURS.text 
  },
  grid: { 
    paddingBottom: 10 
  },
});
