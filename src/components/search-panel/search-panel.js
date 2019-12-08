import React, {Component} from "react";
import './search-panel.css';
export default class SearchPanel extends Component{

    constructor() {
        super();
        this.state= {
            term: ''
        }
        this.placeHolderText = 'Search fielda';
    }
    onChangeFunction = (e) => {
        const term = e.target.value;
        this.setState({
            term
        });
        const {searchItem} = this.props;
        searchItem(term)
    }

    render() {
        return (
            <input onChange={this.onChangeFunction} type='text' className='form-control search-input' placeholder={this.placeHolderText}
                value={this.state.term}/>
        )
    }

}



