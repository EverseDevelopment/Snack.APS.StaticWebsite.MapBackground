import ReactPanel from './reactPanel'
const Autodesk = window.Autodesk;

class CategoryPanelExtension extends Autodesk.Viewing.Extension {

  /////////////////////////////////////////////////////////
  // Class constructor
  //
  /////////////////////////////////////////////////////////
  constructor (viewer, options) {

    super (viewer, options)

    // options.loader.show(false)

    this.panel = new ReactPanel(viewer, { 
      id: 'react-panel-id',
      title: 'Categories'
    })
  }

  /////////////////////////////////////////////////////////
  // Load callback
  //
  /////////////////////////////////////////////////////////
  load () {

    const btn = document.getElementById("upload-btn");
    if(btn) {
      btn.style.display = 'none';
    }
    this.panel.setVisible(false)

    return true
  }

  /////////////////////////////////////////////////////////
  // Extension Id
  //
  /////////////////////////////////////////////////////////
  static get ExtensionId () {

    return 'Viewing.Extension.CatetoryPanel'
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
  CategoryPanelExtension.ExtensionId,
  CategoryPanelExtension)

export default 'Viewing.Extension.CatetoryPanel'