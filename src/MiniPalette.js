import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';


class MiniPalette extends Component{

  constructor(props) {
    super(props)
  
    // this.state = {
       
    // }

    this.deletePalette = this.deletePalette.bind(this);
  }
  
  deletePalette(event){
    event.stopPropagation();
    // alert('clicked')
    // console.log(this.props)
    this.props.handlePalette(this.props.id)
  }
    
    render(){
    const {classes,paletteName, emoji,colors} = this.props;
    const miniColorBoxes = colors.map(color=>(
        <div
            className={classes.miniColor}
            style={{backgroundColor : color.color}}
            key={color.name}
        />
    ))
    return (
        <div className={classes.root} onClick={this.props.handleClick}>
          <DeleteIcon 
            className={classes.deleteIcon} 
            onClick={this.deletePalette}
            style={{transition:"all 0.5s ease-in-out"}}
          />
          <div className={classes.colors}>
              {miniColorBoxes}
          </div>
          <h5 className={classes.title}>
              {paletteName} <span className={emoji}>{emoji}</span>
          </h5>
          {/* <h2 className={classes.main}> {props.paletteName}</h2> */}
        </div>
    )
  }
}

export default withStyles(styles)(MiniPalette); 