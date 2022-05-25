import MapPanel from '../mapExtension/reactPanel';
const Autodesk = window.Autodesk;

function BuildingToolbarExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
    this.panel = null;
}
  
BuildingToolbarExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
BuildingToolbarExtension.prototype.constructor = BuildingToolbarExtension;

BuildingToolbarExtension.prototype.load = function () {
    // Set background environment to "Infinity Pool"
    // and make sure the environment background texture is visible
    this.viewer.setLightPreset(17);
    //this.viewer.setEnvMapBackground(true);

    // Ensure the model is centered
    //this.viewer.fitToView();

    return true;
};

BuildingToolbarExtension.prototype.unload = function () {
    // nothing yet
    if (this.subToolbar) {
        this.viewer.toolbar.removeControl(this.subToolbar);
        this.subToolbar = null;
    }
};

BuildingToolbarExtension.prototype.onToolbarCreated = function (toolbar) {
    var viewer = this.viewer;
    let mapPanel = null;

    // Button 1
    var button1 = new Autodesk.Viewing.UI.Button('show-env-bg-button');
    let mapButton = new Autodesk.Viewing.UI.Button('map-button');
    button1.onClick = function (e) {
        if(viewer.getIsolatedNodes().length>0) {
            viewer.clearThemingColors();
            viewer.showAll();
        } else {
            viewer.clearThemingColors();
            const selSet = viewer.getSelection();
            viewer.isolate(selSet);
        }
    };
    // Mini Map For Geolocation
    mapButton.onClick = function (e) {
        if (!mapPanel) {
            mapPanel = new MapPanel(viewer, {
                id: 'map-panel',
                title: 'Geolocation'
            });
        }
        // show/hide docking panel
        mapPanel.setVisible(!mapPanel.isVisible());
    };
    // button1.addClass('adsk-icon-structure');
    // button1.setToolTip('Show All');
    mapButton.setToolTip('Show Geolocation');

    this.floors = new Autodesk.Viewing.UI.ControlGroup('my-custom-toolbar1');
    // this.floors.addControl(button1);
    this.floors.addControl(mapButton);


    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('my-custom-toolbar');
    // this.subToolbar.addControl(button1);
    this.subToolbar.addControl(mapButton);
    toolbar.addControl(this.subToolbar);
};
  
Autodesk.Viewing.theExtensionManager.registerExtension('BuildingToolbarExtension', BuildingToolbarExtension);

export default BuildingToolbarExtension