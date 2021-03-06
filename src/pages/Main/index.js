import React, {Component} from 'react';

import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import api from '../../services/api';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  list: {
    padding: 20,
  },
  productcontainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#da552f',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  productButtonText: {
    fontSize: 16,
    color: '#da552f',
    fontWeight: 'bold',
  },
});

export default class Main extends Component {
  static navigationOptions = {
    title: 'Product Hunt',
  };

  state = {
    products: [],
    productInfo: {},
    page: 1,
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const {docs, ...productInfo} = response.data;

    this.setState({
      products: [...this.state.products, ...docs],
      productInfo,
      page,
    });
  };

  renderItem = ({item}) => (
    <View style={style.productcontainer}>
      <Text style={style.productTitle}>{item.title}</Text>
      <Text style={style.productDescription}>{item.description}</Text>
      <TouchableOpacity
        style={style.productButton}
        onPress={() => {
          this.props.navigation.navigate('Product', {Product: item});
        }}>
        <Text style={style.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  loadMore = () => {
    const {page, productInfo} = this.state;

    if (page === productInfo.pages) {
      return;
    }

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };

  render() {
    const {products} = this.state;
    return (
      <View style={style.container}>
        <FlatList
          contentContainerStyle={style.list}
          data={products}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}
