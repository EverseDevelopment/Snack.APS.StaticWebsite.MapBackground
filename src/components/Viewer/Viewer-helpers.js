/* eslint-disable */
import MiniMapExtension from './extensions/mapExtension/miniMapPanelExtension';
import { BuildingToolbarExtension } from './extensions/toolBarExtension';
import MapBackExtension from './extensions/mapBackgroundExtension/panelExtension';
import Client from '../Client';
const Autodesk = window.Autodesk;
var viewer;
var getToken = { accessToken: Client.getaccesstoken()};
let tileId = '';
let model

function launchViewer(div, urn, id) {
  tileId = id;

  getToken.accessToken.then((token) => {
    
    var options = {
      env: 'AutodeskProduction',
      'accessToken': token.access_token,
    };

    Autodesk.Viewing.Initializer(options, () => {
      var config3d = {
        extensions: [
          'BuildingToolbarExtension',
          'Viewing.Extension.MiniMapPanel',
          'Viewing.Extension.MapBackground'
        ]
      };
    
    var viewerElement = document.getElementById(div);
    viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById(div), config3d);

    viewer.start();
    
    var documentId = 'urn:' + urn;
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
      });
   })
}


function onDocumentLoadSuccess(doc) {
    var viewables = doc.getRoot().getDefaultGeometry();
    viewer.loadDocumentNode(doc, viewables).then((i) => {
      // documented loaded, any action?
    });
  
    viewer.setDisplayEdges(false);
    viewer.setProgressiveRendering(true);
    viewer.setGroundReflection(false);
    viewer.setGroundShadow(false);
    viewer.setQualityLevel(false, false);
    viewer.setGroundReflectionAlpha(0);
    viewer.hideLines(true);
    viewer.setOptimizeNavigation(true);
    
    model = viewer.model;
    // this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, onSelectionChanged);
    // viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, changePosition);
}


function onDocumentLoadFailure(viewerErrorCode) {
  const url = window.location.href;
  if(!url.includes('/shared_viewer/')) {
    if(parseInt(viewerErrorCode) === 9) {
      const msg = "Please try again later, the file is still being converted";
    }
    // setTimeout(() => {
    //   window.location.href = "/dashboard"
    // }, 2000)
  } else {
    const msg = "Please try again later, the file is still being converted";
  }
}

const Helpers = {
  launchViewer
};

export default Helpers;
