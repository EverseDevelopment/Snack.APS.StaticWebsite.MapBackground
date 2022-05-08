/* eslint-disable */

import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from "@material-ui/core/styles";
import { updateVendorCheckResult } from '../../../../actions/viewerActions';

const useStyles = makeStyles({
    root: {
        marginLeft: "10px",
        marginBottom: "0",
        marginRight: "0",
        display: "flex",
        justifyContent: "space-between"
    }    
});

const radioStyles = makeStyles({
    label: {
        color: "white",
        '&$checked': {
          color: '#00bfff'
        },
      },
    checked: {}
})

const panelContent = (props) => {
    const classes = useStyles();
    const radioClasses = radioStyles();
    const [value, setValue] = useState(null);
    const [statusIndex, setStatusIndex] = useState(null);

    const handleChange = (event) => {
        const categoryName = event.target.value;
        setValue(categoryName);
        const category = findElement(categoryName);
        props.updateVendorCheckResult(statusIndex, category);
    };

    const findElement = (name) => {
        let category = null
        if(props.vendorList) {
            category = props.vendorList.find(item => item.name === name);
        }
        return category;
    }

    useEffect(() => {
        if(props.vendorList && props.vendorSelectedStatus) {
            const index = props.vendorList[props.vendorList.length - 1].order;
            setStatusIndex(index)
            setValue(props.vendorSelectedStatus[index].name);
        }
    }, [props.vendorList])

    const vendorList = () => {
        return props.vendorList.map((item, index) => {
            if(index < props.vendorList.length - 1) {
                return (
                    <div key={index}>
                        <FormControlLabel
                            value={item.name}
                            control={<Radio classes={{root: radioClasses.label, checked: radioClasses.checked}} />}
                            label={item.name}
                            labelPlacement="start"
                            classes={classes}
                        />
                    </div>
                )
            }
        })
    }
    return (
        <div className="react-content">
            <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange}>
                {props.vendorList && (
                    vendorList()
                )
                }
            </RadioGroup>
        </div>
    )
}

const mapStateToProps = state => {
    const { variant, total, vendorList, vendorSelectedStatus } = state.viewer;
    return { variant, total, vendorList, vendorSelectedStatus };
}
  
export default connect(mapStateToProps, { updateVendorCheckResult })(panelContent);