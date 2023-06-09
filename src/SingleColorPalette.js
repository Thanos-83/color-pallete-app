
import React, { Component } from 'react';
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import {Link} from 'react-router-dom';



class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this.state=({
            format:'hex'
        });
        this._shades = this.gatherShades(this.props.palette, this.props.colorId); 
        this.changeFormat = this.changeFormat.bind(this);
    }

    gatherShades(palette, colorToFilterBy){
        let shades=[];
        let allColors=palette.colors;
        for(let key in allColors){
            let x=allColors[key].filter(color=>color.id===colorToFilterBy)
            shades = shades.concat(x);
            // shades.push(x);
            
        }
        console.log(shades.slice(1)[1])

        return shades.slice(1)
    }

    changeFormat(val){
        this.setState({format:val})
    }
    render() {
        console.log(this.props.palette.id) 
        const {format} = this.state; 
        const {paletteName, emoji, id} = this.props.palette;
        const colorBoxes = this._shades.map(color=>(
            <ColorBox 
                key={color.name} 
                name={color.name} 
                background={color[format]}
                showLink={false}
            />
        ))      
        return (
            // <div className='Palette'>
            //     <h1>Single color palette...</h1>
            //     <div className='Palette-colors'>
            //         {colorBoxes}
            //     </div>
            // </div>
            <div className='SingleColorPalette Palette'>
                <NavBar 
                    // level={level}  
                    // changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                    showLevelBar = {false}
                />
                <div className='Palette-colors'>
                    {colorBoxes}
                    <div className='go-back ColorBox'>
                        <Link className='back-button' to={`/palette/${id}`}>
                            Go Back
                        </Link>
                        {/* <a className='back-button'></a> */}
                    </div>
                </div>
                <PaletteFooter 
                    paletteName={paletteName} 
                    emoji={emoji}
                />
            </div>
        )
    }
}

export default SingleColorPalette; 