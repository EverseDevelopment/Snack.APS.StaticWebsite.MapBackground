import ReactPanel from './reactPanel'
const Autodesk = window.Autodesk;

class TotalPanelExtension extends Autodesk.Viewing.Extension {

  /////////////////////////////////////////////////////////
  // Class constructor
  //
  /////////////////////////////////////////////////////////
  constructor (viewer, options) {

    super (viewer, options)

    // options.loader.show(false)

    this.panel = new ReactPanel(viewer, { 
      id: 'total-panel',
      title: 'Total'
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

    return 'Viewing.Extension.TotalPanel'
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
  TotalPanelExtension.ExtensionId,
  TotalPanelExtension)

export default 'Viewing.Extension.TotalPanel'