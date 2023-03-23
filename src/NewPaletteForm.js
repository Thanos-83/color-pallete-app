import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
import DraggableColorList from './DraggableColorList';
import {arrayMove} from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import styles from './styles/NewPaletteFormStyles';



class NewPaletteForm extends Component {

static defaultProps = {
  maxNumColors :20
}

constructor(props){
    super(props);
    this.state=({
        open:false,
        // currentColor:'#1B37BD',
        // colors:['red','#e23345']
        // newColorName:'',
        colors:[],
        // newPaletteName:''
    })

    // this.handleDrawerClose = this.handleDrawerClose.bind(this);
    // this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearPalette = this.clearPalette.bind(this);
}
  
//   const [open, setOpen] = React.useState(false);

  handleDrawerOpen = () => {
    this.setState({
        open:true
    })
  };

  handleDrawerClose = () => {
    this.setState({
        open:false
    })
  };

  // updateCurrentColor = (newColor) => {
  //   this.setState({ currentColor: newColor.hex });
  //   console.log(newColor)
  // }

  addNewColor=(newColor)=>{
    const addNewColor={
      color:newColor.color,
      name:newColor.name
    }
    this.setState({
        colors: [...this.state.colors, addNewColor]
    },()=>this.setState({newColorName:''}))
  }


  handleSubmit=(newPaletteName,emoji)=>{
    let newName = newPaletteName
    const newPalette={
      paletteName :newName,
      id: newName.toLowerCase().replace(/ /g,"-"),
      emoji:emoji,
      colors: this.state.colors
    }
    this.props.savePalette(newPalette)
    console.log(this.props)
    // this.props.history.goBack();
    //  OR
    this.props.history.push('/')
  }

  removeColor(colorName){
    this.setState({
      colors:this.state.colors.filter(color=> color.name !== colorName )
    })
    // alert('message')
  }

  clearPalette(){
    this.setState({
      colors:[]
    })
  }

  addRandomColor = ()=>{

    // pick random color from the color picker
    // const randomColor = chroma.random();
    // this.setState({ currentColor: chroma(randomColor._rgb.slice(0,3)).hex() });
    // console.log(chroma(randomColor._rgb.slice(0,3)).hex());
    // console.log(this.state.colors)

    // pick random color from existing palettes
    const allColors = this.props.palettes.map(palette=>palette.colors).flat();
    var randomNumber = Math.floor(Math.random()*allColors.length);
    const randomColor = allColors[randomNumber];
    this.setState({
      colors:[...this.state.colors, randomColor]
    });
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };


  render(){
  const {classes, maxNumColors,palettes} = this.props;
  const {open, colors} =this.state;
  const paletteIsFull = colors.length>=maxNumColors;

  return (
    <div className={classes.root}>
      <PaletteFormNav 
        open={open} 
        // classes={classes}
        palettes={palettes} 
        handleDrawerOpen={this.handleDrawerOpen}
        handleSubmit = {this.handleSubmit}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant='h4' >
              Create Your Palette
          </Typography>
          <div className={classes.buttons}>
            {/* <ButtonGroup color="primary" aria-label="outlined primary button group"> */}
              <Button 
                variant="contained" 
                color="secondary" 
                className={classes.button} 
                onClick={this.clearPalette}
              >
                  Clear Palette
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                className={classes.button}
                onClick={this.addRandomColor}
                disabled={paletteIsFull}
              >
                  Random Color
              </Button>
            {/* </ButtonGroup> */}
          </div>
          <ColorPickerForm 
            paletteIsFull={paletteIsFull} 
            addNewColor={this.addNewColor} 
            colors={this.state.colors}
          />
        </div>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          onSortEnd={this.onSortEnd}
          axis='xy'
          colors={colors}
          removeColor={this.removeColor}
        />
      </main>
    </div>
  );
}
}

export default withStyles(styles, {withTheme:true})(NewPaletteForm);