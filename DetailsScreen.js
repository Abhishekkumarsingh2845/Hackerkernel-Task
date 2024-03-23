

import React, { useState } from 'react';
import { Button, Image, View, TextInput, ScrollView, Text, StyleSheet, Modal, TouchableOpacity,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import { ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';


const DetailsScreen = ({navigation}) => {
  const [productName, setProductName] = useState('');
  const [productAmount, setProductAmount] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleChooseImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          if (uri) {
            setImageUri(uri);
            try {
              await AsyncStorage.setItem('imageUri', uri);
              console.log('Image saved to local data');
            } catch (error) {
              console.error('Error saving image to local data:', error);
            }
          }
        }
      }
    });
  };

  const handleSaveProduct = async () => {
    try {
      
        if (!imageUri || !productName || !productAmount) {
          Alert.alert("Enter all fields");
          console.log('Please enter all required fields.');
          return;
        }
  
      // Combine image URI, product name, and amount into an object
      const productData = {
        imageUri,
        productName,
        productAmount,
      };
      // Add the product data to the list of products
      setProducts(prevProducts => [...prevProducts, productData]);
      // Clear the input fields
      setProductName('');
      setProductAmount('');
      setImageUri(null);
      // Save the product data to local storage (optional)
      await AsyncStorage.setItem('products', JSON.stringify(products));
      console.log('Product data saved to local data');
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving product data to local data:', error);
    }
  };
  const handleDeleteProduct = (index) => {
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts.splice(index, 1);
      return updatedProducts;
    });
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Enter product name"
              value={productName}
              onChangeText={setProductName}
              placeholderTextColor="gray"
              style={styles.input}
            />
            <TextInput
              placeholder="Enter product amount"
              value={productAmount}
              keyboardType="numeric"
              placeholderTextColor="gray"
              onChangeText={setProductAmount}
              style={styles.input}
            />
            <Button title="Choose Image" onPress={handleChooseImage}  />
            {imageUri && <Image source={{ uri: imageUri }} style={styles.selectedImage} />}
            <Button title="Save Product" onPress={handleSaveProduct} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      {products.length > 0 && (
        <View style={styles.productsGrid}>
          {products.map((product, index) => (
            <View key={index} style={styles.productContainer}>
              <Image source={{ uri: product.imageUri }} style={styles.productImage} />
              <TouchableOpacity onPress={() => handleDeleteProduct(index)} style={styles.deleteButton}>
              <Image source={require('./Screen/delete.png')} style={styles. deleteIcon} />
              </TouchableOpacity>

              <Text style={styles.productName}>PRODUCT-{product.productName}</Text>
              <Text style={styles.productAmount}>AMOUNT-${product.productAmount}</Text>
            </View>
          ))}
        </View>
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent:'center',
    alignContent:'flex-start'
    
  },
  productContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',

  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
 
  },
  productAmount: {
    fontSize: 14,
    color: 'black',
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: '80%',
    borderWidth: 1,
    padding: 10,
    color:'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 4,
  },
   addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
});

export default DetailsScreen;