import MapContent from './addMap';
const Autodesk = window.Autodesk;

class MapBackExtension extends Autodesk.Viewing.Extension {

  /////////////////////////////////////////////////////////
  // Class constructor
  //
  /////////////////////////////////////////////////////////
  constructor (viewer, options) {

    super (viewer, options)

    // options.loader.show(false)

    this.map = new MapContent(viewer)
  }

  /////////////////////////////////////////////////////////
  // Load callback
  //
  /////////////////////////////////////////////////////////
  load () {
    this.map.setVisible()

    return true
  }

  /////////////////////////////////////////////////////////
  // Extension Id
  //
  /////////////////////////////////////////////////////////
  static get ExtensionId () {
    return 'Viewing.Extension.MapBackground'
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
  MapBackExtension.ExtensionId,
  MapBackExtension)

export default 'Viewing.Extension.MapBackground'