import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import Summery from './Summery/Summery';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 40,
    meat: 90
}

class BurgerBuilder extends Component {
    state = {
        ingredients: [
            {type: 'salad', amount: 0}, //type == case
            {type: 'cheese', amount: 0},
            {type: 'meat', amount: 0}
        ],
        totalPrice: 80,
        modalOpen: false,
        purchasable: false
    }

updatePurchasable = ingredients => {
    const sum = ingredients.reduce((sum, element) => {
        return sum + element.amount
    }, 0);
    this.setState({purchasable: sum>0})
}

    //add function
    addIngredientHandle = type => {
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    const ingredients = [...this.state.ingredients];
    for (let item of ingredients){
        if(item.type === type) item.amount++
     }
     this.setState({ingredients: ingredients, totalPrice: newPrice});
     this.updatePurchasable(ingredients);
    }

    //remove function
    removeIngredientHandle = type => {
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    const ingredients = [...this.state.ingredients];
    for (let item of ingredients){
        if(item.type === type) {
           if(item.amount <= 0) return;
           item.amount--
       }
     }
     this.setState({ingredients: ingredients, totalPrice: newPrice});
     this.updatePurchasable(ingredients);
    }

    //toggleModal function
    toggleModal = () => {
        this.setState({
            modalOpen : !this.state.modalOpen
        })
    }
    render(){
        return (
            <div>
            <div className='d-flex flex-md-row flex-column'>
                <Burger ingredients={this.state.ingredients}/>
                <Controls 
                ingredientAdded={this.addIngredientHandle}
                ingredientRemoved={this.removeIngredientHandle}
                price={this.state.totalPrice}
                toggleModal={this.toggleModal}
                purchasable={this.state.purchasable}
                />
            </div>
            <Modal isOpen={this.state.modalOpen}>
                <ModalHeader>Your Order Summery</ModalHeader>
                <ModalBody> 
                    <h5>{this.state.totalPrice.toFixed(0)} INR</h5>
                    <Summery ingredients={this.state.ingredients}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="sucess" onClick={this.toggleModal}>Continue to checkout</Button>
                    <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
            </div>
        );
    }
};

export default BurgerBuilder;