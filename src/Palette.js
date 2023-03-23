import React, { Component } from 'react'
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import './Palette.css';
import PaletteFooter from './PaletteFooter';
import { withStyles } from "@material-ui/styles";
import styles from './styles/PaletteStyles';



 class Palette extends Component {
        constructor(props){
            super(props);
            this.state=({
                level:500,
                format:'hex'
            });
            this.changeLevel=this.changeLevel.bind(this);
            this.changeFormat = this.changeFormat.bind(this);
        }
        changeLevel(level){
            this.setState({
                level:level
            });
            // alert(level)
        }

        changeFormat(val){
            this.setState({format:val})
        }
        render(){
        // console.log(this.props.palette)
        const {colors,paletteName, emoji, id} =this.props.palette;
        const {level, format} = this.state;
        const {classes} = this.props;
        const colorBoxes= colors[level].map(color=>(
            <ColorBox 
                background={color[format]} 
                name={color.name} 
                key={color.id} 
                // colorId={color.id}
                // paletteId={id}
                // we pass from here as prop the url into the colorbox component
                moreUrl={`/palette/${id}/${color.id}`}
                // showLink
                showingFullPalette
            />
        ))
        return (
            // <div className='Palette'>
            //     <NavBar 
            //         level={level}  
            //         changeLevel={this.changeLevel}
            //         handleChange={this.changeFormat}
            //         showLevelBar={true}
            //     />
            //     <div className='Palette-colors'>
            //         {colorBoxes}
            //     </div>
            //     <PaletteFooter 
            //         paletteName={paletteName} 
            //         emoji={emoji}
            //     />
            // </div>
            <div className={classes.Palette}>
                <NavBar 
                    level={level}  
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                    showLevelBar={true}
                    showingAllColors
                />
                <div className={classes.colors}>
                    {colorBoxes}
                </div>
                <PaletteFooter 
                    paletteName={paletteName} 
                    emoji={emoji}
                />
            </div>
        );
    }
}

export default withStyles(styles)(Palette);