import ExtensionStoreProvider from '../provider';
import ReactDOM from 'react-dom'
import './panel.scss'
import React from 'react'
const Autodesk = window.Autodesk;


export default class ReactPanel extends Autodesk.Viewing.UI.DockingPanel {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor (viewer, options) {

    super (viewer.container, options.id, options.title, {
      addFooter: false,
      viewer
    })

    this.container.classList.add('map-docking-panel')

    this.DOMContent = document.createElement('div')

    this.DOMContent.className = 'content'

    this.container.appendChild(
      this.DOMContent) 
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  initialize () {

    super.initialize()

    this.viewer = this.options.viewer

    this.footer = this.createFooter()

    this.container.appendChild(
        this.footer)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  setVisible (show) {

    super.setVisible(show)

    if (show) {

      this.reactNode = ReactDOM.render(
        <ExtensionStoreProvider status={5} viewer={this.viewer}/>,
        this.DOMContent)

    } else if (this.reactNode) {

      ReactDOM.unmountComponentAtNode(
        this.DOMContent)

      this.reactNode = null  
    }
  }
}