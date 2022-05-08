/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Jaime Rosales 2016 - Forge Developer Partner Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////
/* eslint-disable */

import Axios from 'axios';
import {toastr} from 'react-redux-toastr';
import CatetoryPanelExtension from './extensions/categoryExtension/catetoryPanelExtension';
import VendorPandelExtension from './extensions/vendorExtension/vendorPanelExtension';
import CategoryStatePanelExtension from './extensions/categoryStateExtension/categoryStatsExtension';
import TotalPanelExtension from './extensions/totalExtension/totalExtension';
import MiniMapExtension from './extensions/mapExtension/miniMapPanelExtension';
import { BuildingToolbarExtension } from './extensions/toolBarExtension';
import CategoryPanel from './extensions/categoryExtension/reactPanel';
import CategoryStatsPanel from './extensions/categoryStateExtension/reactPanel';
import TotalPanel from './extensions/totalExtension/reactPanel';
import VendorPanel from './extensions/vendorExtension/reactPanel';
import MapBackExtension from './extensions/mapBackgroundExtension/panelExtension';
import Client from '../Client';
const Autodesk = window.Autodesk;
var viewer;
var getToken = { accessToken: Client.getaccesstoken()};
var explodeScale = 0;
var startExplosion = null;
var explosionReq;
var isExploding = false;
var outwardExplosion = true;
var startRotation = null;
var rotationReq;
var isRotating = false;
var tileId = '';
var hostDomain;
let model;
export var properties = {};

hostDomain =  "/token";

function launchViewer(div, urn, id) {
  tileId = id;

  getToken.accessToken.then((token) => {
    
    
    var options = {
      env: 'MD20ProdUS',
      'accessToken': token.access_token,
      api: 'streamingV2'
    };

    Autodesk.Viewing.Initializer(options, () => {
      var config3d = {
        extensions: ['Viewing.Extension.CatetoryPanel',
         'Viewing.Extension.VendorPanel',
         'Viewing.Extension.CategoryStatsPanel',
         'Viewing.Extension.TotalPanel',
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
  
    //View config
    viewer.setDisplayEdges(false);
    viewer.setProgressiveRendering(true);
    viewer.setGroundReflection(false);
    viewer.setGroundShadow(false);
    viewer.setQualityLevel(false, false);
    viewer.setGroundReflectionAlpha(0);
    viewer.hideLines(true);
    viewer.setOptimizeNavigation(true);
    viewer.setGhosting(true);
    viewer.setEnvMapBackground(false);
    
    model = viewer.model;
    // this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, onSelectionChanged);
    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, onGeometryLoaded);
    // viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, changePosition);
}

function changePosition() {
  let meshes = getAllDbIds();
  const model = NOP_VIEWER.model;
  meshes.forEach(dbid => {
    model.getData().instanceTree.enumNodeFragments(
      dbid, fragId => {
        const fragProxy = NOP_VIEWER.impl.getFragmentProxy(model, fragId);
        fragProxy.scale = new THREE.Vector3(1,1,1);
        // fragProxy.position = new THREE.Vector3(0,0,0);
        fragProxy.quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1), Math.PI/2);
        fragProxy.updateAnimTransform()
    });
    NOP_VIEWER.impl.invalidate(true)
  })
}

function getAllDbIds(viewer) {
  var instanceTree = NOP_VIEWER.model.getData().instanceTree;

  var allDbIdsStr = Object.keys(instanceTree.nodeAccess.dbIdToIndex);

  return allDbIdsStr.map(function(id) { return parseInt(id)});
}

function onGeometryLoaded() {
  var categoryPanlel = this.panel;
  var categoryStatsPanel = this.panel;
  var vendorPanel = this.panel;
  var totalPanel = this.panel;
  if (categoryPanlel == null) {
    categoryPanlel = new CategoryPanel(viewer, {
        id: 'category-panel-id',
        title: 'Categories'
      });
    }
  if(categoryStatsPanel == null) {
    categoryStatsPanel = new CategoryStatsPanel(viewer, {
      id: 'category-status-panel',
      title: 'Category Stats'
    });
  }
  if(vendorPanel == null) {
    vendorPanel = new VendorPanel(viewer, {
      id: 'vendor-panel-id',
      title: 'Vendors'
    });
  }
  if(totalPanel == null) {
    totalPanel = new TotalPanel(viewer, {
      id: 'total-panel',
      title: 'Total'
    });
  }
  categoryPanlel.setVisible(!categoryPanlel.isVisible());
  categoryStatsPanel.setVisible(!categoryStatsPanel.isVisible());
  vendorPanel.setVisible(!vendorPanel.isVisible());
  totalPanel.setVisible(!totalPanel.isVisible());
}


function onDocumentLoadFailure(viewerErrorCode) {
  const url = window.location.href;
  if(!url.includes('/shared_viewer/')) {
    if(parseInt(viewerErrorCode) === 9) {
      const msg = "Please try again later, the file is still being converted";
      toastr.error(msg)
    }
    // setTimeout(() => {
    //   window.location.href = "/dashboard"
    // }, 2000)
  } else {
    const msg = "Please try again later, the file is still being converted";
    toastr.error(msg)
  }
}




//Get token from server
function getTokenDF(_callback) {
  Axios.get(hostDomain, function(data, status){
  var response = JSON.parse(data);
  _callback(response.access_token, response.expires_in);
});
}

const Helpers = {
  launchViewer
};

export default Helpers;
