import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@/components/Button';

const sizes = ['S', 'M', 'L'];
const levels = ['L', 'M', 'H'];


const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedSpice, setSelectedSpice] = useState('L');

  const product = products.find((p) => p.id.toString() == id);

  const addToCart = () => {
    console.warn('Adding to list, size: ', selectedSize);

  };

  if (!product) {
    return <Text>Product not found</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable onPress={() => {
            setSelectedSize(size);

          }}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize == size ? 'gainsboro' : 'white',
              },
            ]}
            key={size}
          >
            <Text style={[styles.sizeText,
            {
              color: selectedSize == size ? 'black' : 'gray',
            },
            ]}>{size}</Text>
          </Pressable>
        ))}
      </View>



      <Text>Select Spice Levels</Text>
      <View style={styles.levels}>
        {levels.map((level) => (
          <Pressable
            onPress={() => { setSelectedSpice(level);
            }}
            style={[
              styles.level,
              {
                backgroundColor: selectedSpice == level ? 'gainsboro' : 'white',
              }
            ]}
            key={level}
          >
            <Text style={[
              {
                color: selectedSpice == level ? 'black' : 'gray',
              },
            ]}
            >
              {level}
              </Text>
          </Pressable>
        ))}
      </View>


      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text="Add to list:"  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,

  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
  levels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  level: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: 20,
    fontWeight: '500',
  },



});

export default ProductDetailsScreen;
