import React, { useState, Fragment } from "react";
import { connect } from 'react-redux';
import { setTopbarSelection } from "../../actions/viewerActions";

const sections = [
    "Connectivity",
    "Safety & Security", 
    "User Experience", 
    "Health & Wellness",
    "Facility management and operations",
    "Sustainabaility",
    "Mobility & Logistics"
]

const topBar = (props) => {

  const [selected, setSelected] = useState(1);

  const setSelectedValue = (val) => {
    setSelected(val);
  }

  const handleSectionSelect = (index) => {
    setSelectedValue(index);
    props.setTopbarSelection(index - 1);
  }

  const sectionList = () => {
      return sections.map((item, index) => {
          return (
            <div key={index} className={`${selected === index + 1 ? 'topbar-selected' : ''} top-header`} onClick={() => handleSectionSelect(index + 1)}>
                {item}
            </div>
          )
      })
  }


  return (
    <Fragment>
        {sectionList()}
    </Fragment>
  );
}

const mapStateToProps = state => {
    const { variant, total, vendorList, vendorSelectedStatus } = state.viewer;
    return { variant, total, vendorList, vendorSelectedStatus };
}
  
export default connect(mapStateToProps, {setTopbarSelection})(topBar);