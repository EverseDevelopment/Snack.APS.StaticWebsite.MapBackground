/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { setCategoryItem, setModelNodes, setSelectedCategory } from '../../../../actions/viewerActions';
import { connect } from 'react-redux';

function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min) + min);
}

const panelContent = (props) => {

    const [highlighted, setHighLighted] = useState(0);
    const categories = [
        "Door Access Control",
        "Smart Windows", 
        "Occupancy Sensors",
        "Internet Service Provider",
        "Data Transfer Equipment",
        "IoT Device Hub",
        "Cameras",
        "Indoor People & Motion Tracking",
        "Asset Tracking",
        "Video Analytics",
        "Video Intercom",
        "Remote Monitoring",
        "Building/Lobby Access Control",
        "Lighting",
    ];

    useEffect(() => {
        onGeometryLoaded();
    }, []);

    useEffect(() => {
        if(props.nodeList && !props.selectedCategory) {
            handleCategory(0);
        }
    }, [props.nodeList]);

    useEffect(() => {
        const index = props.topBar;
        if(index === 0) {
            handleCategory(3)
        } else if(index === 1) {
            handleCategory(0)
        } else if(index === 2) {
            handleCategory(13)
        } else {
            
        }
    }, [props.topBar]);

    const handleCategory = (index) => {
        setHighLighted(index + 1);
        props.setCategoryItem(index + 1, 50 * (index + 1));
        switch(index + 1) {
            case 1: {
                const door = findElement('Doors');
                // console.log("Doors ===", door);
                if(door) {
                    props.setSelectedCategory(door)
                    props.viewer.isolate(door.id);
                }
                break;
            }
            case 2: {
                const window = findElement('Windows');
                // console.log("window ===", window);
                if(window) {
                    props.viewer.isolate(window.id);
                    props.setSelectedCategory(window);
                } else {
                    const curtainWall = findElement('Curtain Wall');
                    // console.log("curtainWall ===", curtainWall);
                    if(curtainWall) {
                        props.viewer.isolate(curtainWall.id);
                        props.setSelectedCategory(curtainWall);
                    }
                }
                break;
            }
            case 3: {
                const wall = findElement('Basic Wall');
                const floor = findElement('Floors');
                // console.log("wall and floor ===", wall, floor);
                if(wall && floor) {
                    props.setSelectedCategory({id: 0, count: wall.count + floor.count, Name: "totalWall"});
                    props.viewer.isolate([wall.id, floor.id]);
                } else if(wall && !floor) {
                    props.setSelectedCategory(wall);
                    props.viewer.isolate(wall.id);
                } else if(!wall && floor) {
                    props.setSelectedCategory(floor);
                    props.viewer.isolate(floor.id);
                } else {
                    break;
                }
                break;
            }
            default: {
                const randVal = {
                    id: 0,
                    count: getRandomInt(20, 50),
                    Name: "Rand"
                }
                props.setSelectedCategory(randVal);
                break;
            }
        }
    }

    const findElement = (name) => {
        let node = null
        if(props.nodeList) {
            node = props.nodeList.find(item => item.Name === name);
        }
        return node;
    }

    function onGeometryLoaded(){ 
        getAllLeafComponents(props.viewer, 1, function (jsonData) {
            let nodes = jsonData;
            let wall = jsonData.find(item => item.Name === "Walls");
            if(wall) {
                getAllLeafComponents(props.viewer, wall.id, function (wallNode) {
                    nodes = jsonData.concat(wallNode)
                })
            }
            props.setModelNodes(nodes);
        })
    }
      

    function getAllLeafComponents(viewer,rootNode, callback) {
        var cbCount = 0; 
        var interncount = 0; 
        var tree;  
        var jsData = []
        var countChildren;
       
        function getLeafComponentsRec(current) {
        cbCount++;
         if (tree.getNodeParentId(current) == rootNode || current == rootNode){
            tree.enumNodeChildren(current, function (children) {
                    getLeafComponentsRec(children,current);      
            }, false);
         } 
        
        if (tree.getNodeParentId(current) == rootNode)
        {
          var nodeName = viewer.model.getInstanceTree().getNodeName(current)
          CountAllLeafComponents(viewer,current ,function (jsonData) {
            countChildren = jsonData
          });
       
        jsData.push({id:current, count:countChildren, Name:nodeName})  
        }
        if (--cbCount == 0) callback(jsData);
        }
       
        viewer.getObjectTree(function (objectTree) {
        tree = objectTree;
       
        var allLeafComponents = getLeafComponentsRec(rootNode,'#');
        });
      }

    function CountAllLeafComponents(viewer, rootId, callback) {
        var cbCount = 0; 
        var interncount = 0; 
        var tree;  
        var jsData = []
        
        function getLeafComponentsRec(current, parent) {
            cbCount++;
            if (tree.getChildCount(current) != 0){
                tree.enumNodeChildren(current, function (children) {
                    getLeafComponentsRec(children, current);      
                }, false);
            } 
        
            var nodeName = viewer.model.getInstanceTree().getNodeName(current)
            var countChildren = tree.getChildCount(current)
            jsData.push(current)  
            
            if (--cbCount == 0) callback(jsData.length);
        }
        
        viewer.getObjectTree(function (objectTree) {
            tree = objectTree;
            var allLeafComponents = getLeafComponentsRec(rootId,'#');
        });
    }

    const categoryTrs = () => {
        return categories.map((item, index) => {
            if(props.topBar === 0) {
                if(index >= 3 && index < 6) {
                    return (
                        <tr key={index} className={`${highlighted === index + 1 ? 'hightlighed' : ''}`}>
                            <td onClick={() => handleCategory(index)}>{item}</td>
                        </tr>
                    )
                }
            } else if(props.topBar === 1) {
                if(index === 0 || (index > 5 && index < 13)) {
                    return (
                        <tr key={index} className={`${highlighted === index + 1 ? 'hightlighed' : ''}`}>
                            <td onClick={() => handleCategory(index)}>{item}</td>
                        </tr>
                    )
                }
            } else if(props.topBar === 2) {
                if(index === 13) {
                    return (
                        <tr key={index} className={`${highlighted === index + 1 ? 'hightlighed' : ''}`}>
                            <td onClick={() => handleCategory(index)}>{item}</td>
                        </tr>
                    )
                }
            } else {
                return (
                    <tr key={index} className={`${highlighted === index + 1 ? 'hightlighed' : ''}`}>
                        <td onClick={() => handleCategory(index)}>{item}</td>
                    </tr>
                )
            }
        })
    }

    return (
        <div className="react-content">
            <table>
                <tbody>
                    {categoryTrs()}
                </tbody>
            </table>
        </div>
    )
      
}

const mapStateToProps = state => {
    const { variant, total, vendorList, nodeList, topBar } = state.viewer;
    return { variant, total, vendorList, nodeList, topBar };
}
  
export default connect(mapStateToProps, { setCategoryItem, setModelNodes, setSelectedCategory })(panelContent);