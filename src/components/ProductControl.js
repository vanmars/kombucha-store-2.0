import React, { Component } from 'react';
import { v4 } from 'uuid'; 
import ProductList from './ProductList';
import NewProductForm from './NewProductForm'
import UpdateProductForm from './UpdateProductForm'
import ProductDetail from './ProductDetail'

class ProductControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      masterProductList: [
        {name: "Gingerberry Goddess", brand: "Vanessa's Kombuchary", price: 3.25, flavor: "Gingerberry", quantity: 1, id: v4()},
        {name: "Mystic Mango", brand: "Booch Boulevard, LLC", price: 3.99, flavor: "Mango", quantity: 10, id: v4()},
        {name: "Symphonic Straberry", brand: "Scarlett's Secret SCOBY", price: 4.99, flavor: "Strawberry", quantity: 50, id: v4()},
        {name: "Regal Raspberry", brand: "Paradise Kombucha Co.", price: 2.99, flavor: "Raspberry", quantity: 124, id: v4()}
      ],
      formVisible: false,
      selectedProduct: null,
      editing: false
    };
  }

  //CUSTOM METHODS
  // Handle Reusable Button Clicks
  handleClick = () => {
    if (this.state.selectedProduct != null){
      this.setState({
        formVisible: false,
        selectedProduct: null,
        editing: false
      })
    } else {
      this.setState(prevState => ({
        formVisible: !prevState.formVisible
      }));
    }
  }

  // Create New Product
  handleCreatingProduct = (newProduct) => {
    const newMasterProductList = this.state.masterProductList.concat(newProduct);
    this.setState({
      masterProductList: newMasterProductList, 
      formVisible: false
    });
  }

  // Read Individual Product Details
  handleSelectingProduct = (id) => {
    const selectedProduct = this.state.masterProductList.filter(product => product.id === id)[0];
    this.setState({selectedProduct: selectedProduct});
  }

  // Update Product
  handleUpdateClick = () => {
    this.setState({editing: true});
  }

  handleUpdatingProduct = (productToUpdate) => {
    const updatedMasterProductList = this.state.masterProductList.filter(product => product.id !== this.state.selectedProduct.id).concat(productToUpdate);
    this.setState({
      masterProductList: updatedMasterProductList, 
      editing: false, 
      selectedProduct: null
    });
  }

  // Sell Product
  handleSellingProduct = (productToSell) => {
    const updatedMasterProductList = this.state.masterProductList.filter(product => product.id !== productToSell.id).concat(productToSell);
    this.setState({
      masterProductList: updatedMasterProductList,
      // selectedProduct: null
    })
  }

  // Restock Product
  handleRestockingProduct = (productToRestock) => {
    const updatedMasterProductList = this.state.masterProductList.filter(product => product.id !== productToRestock.id).concat(productToRestock);
    this.setState({
      masterProductList: updatedMasterProductList,
      selectedProduct: null
    })
  }

  // Delete Individual Product
  handleDeletingProduct = (id) => {
    const newMasterProductList = this.state.masterProductList.filter(product => product.id !== id);
    this.setState({
      masterProductList: newMasterProductList, 
      selectedProduct: null
    });
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    // CONDITIONAL RENDERING
    // Updating a Product
    if (this.state.editing) {
      currentlyVisibleState = 
        <UpdateProductForm
          product={this.state.selectedProduct}
          onProductUpdate={this.handleUpdatingProduct}
        />
      buttonText = "Return to Product List";
    
    // Product Detail
    } else if (this.state.selectedProduct){
      currentlyVisibleState = 
        <ProductDetail
          product={this.state.selectedProduct}
          onClickingDelete={this.handleDeletingProduct}
          onClickingUpdate={this.handleUpdateClick}
        />
      buttonText = "Return to Product List";

    // New Product Form
    } else if (this.state.formVisible){
      currentlyVisibleState = 
        <NewProductForm
          onNewProductCreation={this.handleCreatingProduct}
        />
      buttonText = "Return to Product List";

    // Product List
    } else {
      currentlyVisibleState = 
      <ProductList
        products={this.state.masterProductList}
        onProductSelection={this.handleSelectingProduct}
        onClickingSell={this.handleSellingProduct}
        onClickingRestock={this.handleRestockingProduct}
        />
      buttonText = "Add a New Product";
    }

    return (
      <React.Fragment>
        <br />
        {currentlyVisibleState}
        <hr />
        <button className="btn shadow addProductBtn text-white" onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default ProductControl;