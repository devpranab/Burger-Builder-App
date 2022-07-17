import React, { Component } from 'react';
import Burger from './Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients: [
            {type: 'salad', amount: 0}, //type == case
            {type: 'cheese', amount: 0},
            {type: 'meat', amount: 0}
        ]
    }
    render(){
        return (
            <div>
                <Burger ingredients={this.state.ingredients}/>
            </div>
        );
    }
};

export default BurgerBuilder;