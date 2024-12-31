import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { Categories, COLOURS } from '../global/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchComponent from '../components/Search';
import { useCart } from '../navigation/CartContex';

const HomeScreen = ({ navigation }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [currentSelected, setCurrentSelected] = React.useState(0);

  const renderCategories = ({ item, index }) => (
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
            source={item.image}
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

  const renderItems = ({ item, index }) => (
    <TouchableOpacity
      key={index}
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
          {item.isTopOfTheWeek && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="crown" style={{ fontSize: 7, color: COLOURS.purple1 }} />
              <Text
                style={{
                  fontSize: 10,
                  color: COLOURS.text,
                  opacity: 0.8,
                  marginLeft: 5,
                }}
              >
                Top of the week
              </Text>
            </View>
          )}
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.text,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {item.name
              ? item.name.length > 22
                ? `${item.name.substring(0, 20)}...`
                : item.name
              : ''}
          </Text>
        </View>
        <View style={{ width: 90, height: 80, marginVertical: 10 }}>
          <Image
            source={item.image}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
          />
        </View>
        <Text style={{ fontSize: 12, color: COLOURS.text, opacity: 0.5 }}>
          {item.price|| ''}€
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
            onPress={() => addToCart(item)}
          >
            <Entypo name="plus" style={{ fontSize: 18, color: COLOURS.white }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign
              name="star"
              style={{ fontSize: 12, color: COLOURS.text, paddingRight: 5 }}
            />
            <Text style={{ fontSize: 15, color: COLOURS.text, fontWeight: 'bold' }}>
              {item.rating || '0'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.lightGray,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <View style={{ marginTop: 20 }}>
            <SearchComponent />
          </View>
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
            data={Categories}
            renderItem={renderCategories}
            showsHorizontalScrollIndicator={false}
          />
          <Text
            style={{
              paddingHorizontal: 20,
              marginVertical: 20,
              fontSize: 18,
              fontWeight: '700',
              color: COLOURS.text,
            }}
          >
            Popular
          </Text>
          <FlatList
            horizontal
            data={Categories[0]?.items || []} // Replace with actual items
            renderItem={renderItems}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 5,
            }}
            style={{ marginBottom: 10 }}
            keyExtractor={(item) => item.id.toString()}
          />
           <Text
            style={{
              paddingHorizontal: 20,
              marginVertical: 20,
              fontSize: 18,
              fontWeight: '700',
              color: COLOURS.text,
            }}
          >
            Pizza
          </Text>
          <FlatList
            horizontal
            data={Categories[1]?.items || []}
            renderItem={renderItems}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 10,
            }}
            style={{ marginBottom: 70 }}
            keyExtractor={(item) => item.id.toString()}
          />

        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
