
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newPaletteName:'',
            formShowing:false
        }

        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
    } 

    handleChange(event){
        // const newName = event.target.value;
        this.setState({ 
          [event.target.name]: event.target.value
         });
      }

    showForm(){
      this.setState({
        formShowing:true
      })
    }

    hideForm=()=>{
      this.setState({
        formShowing:false
      })
    }
    
    
    render() {
        const {
                classes, 
                open, 
                handleSubmit, 
                palettes
              } = this.props;
        // const {newPaletteName} = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.props.handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create A New Palette...
                    </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                      <Link to='/'>
                          <Button variant="contained" color="secondary" className={classes.button}>
                              Go Back
                          </Button>
                      </Link>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={this.showForm}
                        className={classes.button}
                      >
                          Save Palette
                      </Button>                      
                    </div>
                </AppBar>
                {this.state.formShowing && 
                (<PaletteMetaForm 
                  palettes={palettes} 
                  handleSubmit={handleSubmit} 
                  classes={classes}
                  hideForm={this.hideForm}
                />)
                }
            </div>
        )
    }
}

export default withStyles(styles,{withTheme:true})(PaletteFormNav);
