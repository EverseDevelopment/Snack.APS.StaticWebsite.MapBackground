import ReactPanel from './reactPanel'
const Autodesk = window.Autodesk;

class VendorPanelExtension extends Autodesk.Viewing.Extension {

  /////////////////////////////////////////////////////////
  // Class constructor
  //
  /////////////////////////////////////////////////////////
  constructor (viewer, options) {

    super (viewer, options)

    // options.loader.show(false)

    this.panel = new ReactPanel(viewer, { 
      id: 'vendor-panel-id',
      title: 'Vendors'
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

    return 'Viewing.Extension.VendorPanel'
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
  VendorPanelExtension.ExtensionId,
  VendorPanelExtension)

export default 'Viewing.Extension.VendorPanel'