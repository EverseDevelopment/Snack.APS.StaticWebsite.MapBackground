import ReactPanel from './reactPanel'
const Autodesk = window.Autodesk;

class MiniMapPanelExtension extends Autodesk.Viewing.Extension {

  /////////////////////////////////////////////////////////
  // Class constructor
  //
  /////////////////////////////////////////////////////////
  constructor (viewer, options) {

    super (viewer, options)

    // options.loader.show(false)

    this.panel = new ReactPanel(viewer, { 
      id: 'react-panel-id',
      title: 'Views'
    })
  }

  /////////////////////////////////////////////////////////
  // Load callback
  //
  /////////////////////////////////////////////////////////
  load () {
    this.panel.setVisible(false)

    return true
  }

  /////////////////////////////////////////////////////////
  // Extension Id
  //
  /////////////////////////////////////////////////////////
  static get ExtensionId () {
    return 'Viewing.Extension.MiniMapPanel'
  }

  /////////////////////////////////////////////////////////
  // Unload callback
  //
  /////////////////////////////////////////////////////////
  unload () {
    return true
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension (
  MiniMapPanelExtension.ExtensionId,
  MiniMapPanelExtension)

export default 'Viewing.Extension.MiniMapPanel'