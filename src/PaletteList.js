import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
    
    // we define a function that leads us the Palette page when we click the MiniPalette icon
    goToPalette(id){
      this.props.history.push(`/palette/${id}`)
    } 
    render() {
        console.log(this.props.hist)
        const {palettes, classes, deletePalette} = this.props;
        // const palettes= seedColors.map(colors=>colors.colors)
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to='/palette/new'>
                          New Palette
                        </Link>
                    </nav>
                    <div className={classes.palettes}> 
                        {palettes.map(palette=>(
                        // we can use the Link component to link avery MiniPalette
                        // <Link to={`/palette/${palette.id}`}>
                        //     <MiniPalette {...palette}/>
                        // </Link>

                        // BUT it is better to use the history prop from the Route Props
                        <MiniPalette
                          {...palette}
                          handleClick={()=>this.goToPalette(palette.id)}
                          handlePalette={deletePalette}
                          key={palette.id}
                        />
                        ))}
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList)