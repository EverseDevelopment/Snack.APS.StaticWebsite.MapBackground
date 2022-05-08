import ReactPanel from './reactPanel'
const Autodesk = window.Autodesk;

class CategoryStatsPanelExtension extends Autodesk.Viewing.Extension {

  /////////////////////////////////////////////////////////
  // Class constructor
  //
  /////////////////////////////////////////////////////////
  constructor (viewer, options) {

    super (viewer, options)

    // options.loader.show(false)

    this.panel = new ReactPanel(viewer, { 
      id: 'category-status-panel',
      title: 'Category Stats'
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

    return 'Viewing.Extension.CategoryStatsPanel'
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
  CategoryStatsPanelExtension.ExtensionId,
  CategoryStatsPanelExtension)

export default 'Viewing.Extension.CategoryStatsPanel'