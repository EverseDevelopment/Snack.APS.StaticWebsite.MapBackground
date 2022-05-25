import React from "react";
import ExtensionStoreProvider from '../provider';
import ReactDOM from 'react-dom';

class MapContent extends React.Component {
    constructor(props) {
        super(props);
        this.viewer = props;
        this.state = {
            showMap: false
        }

        // this.container.classList.add('react-docking-panel')

        this.DOMContent = document.createElement('div')

        this.DOMContent.className = 'content'

        this.viewer.container.appendChild(
        this.DOMContent) 
    }

    setVisible () {
        this.reactNode = ReactDOM.render(
            <ExtensionStoreProvider status={6} viewer={this.viewer}/>,
            this.DOMContent)
    }

}

export default MapContent