import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { COLOURS } from '../global/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchComponent from '../components/Search';
import { useCart } from '../navigation/CartContex';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://10.0.1.40/api/fetch_products.php'); // Replace with your server IP
      const data = response.data;
  
      if (!Array.isArray(data)) {
        console.error('Invalid data format:', data);
        return;
      }
  
      const groupedCategories = data.reduce((acc, product) => {
        const category = product.category || 'Uncategorized';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      }, {});
  
      const formattedCategories = Object.keys(groupedCategories).map((category) => ({
        name: category,
        items: groupedCategories[category],
      }));
  
      setCategories(formattedCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const renderCategories = ({ item, index }) => {
    const imageUrl = (() => {
      if (Array.isArray(item.items[0].image_url)) {
        return item.items[0].image_url[0]; // Use the first image in the array
      }
      try {
        const parsed = JSON.parse(item.items[0].image_url);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : 'https://via.placeholder.com/150';
      } catch {
        return 'https://via.placeholder.com/150'; // Fallback to a placeholder image
      }
    })();
    
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => setCurrentSelected(index)}>
        <View
          style={{
            width: 120,
            height: 180,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: currentSelected === index ? COLOURS.purple2 : COLOURS.white,
            borderRadius: 20,
            margin: 10,
            elevation: 5,
          }}
        >
          <View style={{ width: 60, height: 60 }}>
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'center',
              }}
            />
          </View>
          <Text style={{ fontSize: 16, color: COLOURS.text1, fontWeight: '600' }}>
            {item.name || ''}
          </Text>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
              backgroundColor: currentSelected === index ? COLOURS.white : COLOURS.purple3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesome
              name="angle-right"
              style={{
                fontSize: 12,
                color: currentSelected === index ? COLOURS.black : COLOURS.white,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderItems = ({ item }) => {
    const imageUrl = Array.isArray(item.image_url)
      ? item.image_url[0] // Use the first image in the array
      : item.image_url || 'https://via.placeholder.com/150'; // Fallback to a placeholder image
  
    const thumbnailUrl = item.thumbnail_url || 'https://via.placeholder.com/50'; // Default thumbnail
  
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          width: 180,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
          marginBottom: 20,
        }}
        onPress={() => {
          navigation.push('details', {
            item,
            initialQuantity: item.quantity || 0,
          });
        }}
      >
        <View
          style={{
            width: '100%',
            height: 200,
            backgroundColor: COLOURS.white,
            borderRadius: 20,
            elevation: 4,
            position: 'relative',
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.text,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {item.name.length > 22 ? `${item.name.substring(0, 20)}...` : item.name}
            </Text>
          </View>
          <View style={{ width: 90, height: 80, marginVertical: 10 }}>
            <Image
              source={{ uri: imageUrl }}
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            />
          </View>
          <Text style={{ fontSize: 12, color: COLOURS.text, opacity: 0.5 }}>
            €{item.price}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: 40,
                height: 30,
                backgroundColor: COLOURS.purple3,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                addToCart({
                  ...item,
                  thumbnail_url: thumbnailUrl, // Add thumbnail to cart
                })
              }
            >
              <Entypo name="plus" style={{ fontSize: 18, color: COLOURS.white }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name="star" style={{ fontSize: 12, color: COLOURS.text, paddingRight: 5 }} />
              <Text style={{ fontSize: 15, color: COLOURS.text, fontWeight: 'bold' }}>
                {item.rating || '0'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
      
  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: COLOURS.lightGray }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%', height: '100%', marginBottom: 60  }}>
          <View style={{ marginTop: 20}}>
          <SearchComponent navigation={navigation} />
          
          <Text
            style={{
              paddingTop: 20,
              paddingHorizontal: 20,
              fontSize: 18,
              fontWeight: '700',
              color: COLOURS.text,
              letterSpacing: 1,
            }}
          >
            Categories
          </Text>
          <FlatList
            horizontal
            data={categories}
            renderItem={renderCategories}
            showsHorizontalScrollIndicator={false}
          />
          {categories.map((category, index) => (
            <View 
            key={index} 
            >
              <Text
                style={{
                  paddingHorizontal: 20,
                  marginVertical: 20,
                  fontSize: 18,
                  fontWeight: '700',
                  color: COLOURS.text,
                }}
              >
                {category.name}
              </Text>
              <FlatList
                horizontal
                data={category.items}
                renderItem={renderItems}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 5 }}
                style={{ marginBottom: 10 }}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          ))}
        </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
