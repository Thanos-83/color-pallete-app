import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './NavBar.css';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
// import { hexToRgb } from '@material-ui/core';
import styles from './styles/NavBarStyles';
import { withStyles } from '@material-ui/styles';

 class NavBar extends Component {
    constructor(props){
        super(props);
        this.state=({
            format:'hex',
            open:false
        });
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleFormatChange(event){
        this.setState({
            format:event.target.value,
            open:true
        },()=>{
            this.props.handleChange(this.state.format)
        });
        // we can pass the current format to the palette component using the event object
        // this.props.handleChange(event.target.value);
        // console.log(event.target)
    }

    // handleChange(event){
    //     this.setState({
    //         format:event.target.value
    //     }, ()=>{this.props.handleChange(this.state.format)});
    //     // we can pass the current format using the event object
    //     // this.props.handleChange(event.target.value); 
    // }

    handleClose (){
        this.setState({open:false});
      };

    render() {
        const {level, changeLevel, showingAllColors, classes}=this.props;
        const {format, open} = this.state;
        
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to='/'>
                        LOGO
                    </Link>
                </div>
                {showingAllColors ?(
                    <div>
                        <span>Level: {level}</span>
                        <div className={classes.slider}>
                            <Slider 
                                defaultValue={level} 
                                min={100} 
                                max={900}
                                step={100}
                                onAfterChange={changeLevel}
                            /> 
                        </div>
                    </div>)
                    :
                    ''
                }
                <div className={classes.selectContainer}>
                    <Select 
                        value={format} 
                        onClick={this.handleFormatChange}  
                        // onChange={this.handleChange}
                    >
                        <MenuItem value={'hex'} >Hex - #ffffff</MenuItem>
                        <MenuItem value={'rgb'}>RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value={'rgba'}>RGBA - rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                    
                    <Snackbar
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                        open={open}
                        autoHideDuration={3000}
                        onClose={this.handleClose}
                        message={<span id='message-id'>Format Changed To {format.toUpperCase()} </span>}
                        ContentProps={{
                            'aria-describedly':'message-id'
                        }}
                        action={[
                            <IconButton 
                                size="small" 
                                aria-label="close" 
                                key='close'
                                color="inherit" 
                                onClick={this.handleClose}
                            >
                                <CloseIcon fontSize="small" />
                             </IconButton>
                        ]}
                    />
                </div>
            </header>
        )
    }
}

export default withStyles(styles)(NavBar);