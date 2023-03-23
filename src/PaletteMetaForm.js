import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
// import {spacing} from '@material-ui/system';





class PaletteMetaForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            open:true,
            openEmoji:false,
            newPaletteName:'',
            emoji:''
        };

        this.handleClose=this.handleClose.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    
    handleClickOpen = () => {
            // setOpen(true);
            this.setState({
                open:true
            })
    };
    
    handleClose(){
            // setOpen(false);
            this.setState({
                open:false
            })
    };

    componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => 
        this.props.palettes.every((palette)=>(
          // palette.paletteName.toLowerCase()!==this.state.newPaletteName.toLowerCase()
          // OR
          palette.paletteName.toLowerCase()!==value.toLowerCase()
        ))
        )
    };

    handleChange(event){
        // const newName = event.target.value;
        this.setState({ 
          [event.target.name]: event.target.value
         });
      }

    handleEmoji=(event)=>{
        
        this.setState({emoji:event.native},()=>console.log(this.state.emoji))
        
        this.hideEmoji();
    }

    addEmoji=()=>{
      this.setState({openEmoji:true})
    }

    hideEmoji=()=>{
      this.setState({openEmoji:false})
    }

  
    render(){
        const {handleSubmit, classes, hideForm} = this.props;
        const {newPaletteName,emoji}=this.state;

        return (
        <div>
          {/* <Dialog open={this.state.open}> 
              <Picker onClick={(x,y)=>(this.handleEmoji(x))}/>
          </Dialog> */}
          <Dialog 
            open={this.state.open} 
            onClose={hideForm} 
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle  id="form-dialog-title">
                Choose a Palette Name
            </DialogTitle>
            <ValidatorForm onSubmit={()=>handleSubmit(newPaletteName,emoji)}>
            <DialogContent>
              <DialogContentText>
                Please endet a name for your palette. Make sure that it's unique!!
              </DialogContentText>
              <div style={{ width: '100%' }}>
                <TextValidator
                  label='Palette Name'
                  value={newPaletteName}
                  name='newPaletteName'
                  fullWidth
                  // width={"100%"}
                  margin='normal'
                  onChange={this.handleChange}
                  validators={['required','isPaletteNameUnique']}
                  errorMessages={[
                  'Name is required',
                  'Palette Name already used'
                  ]}
                />
                <span >{this.state.emoji}</span>
              </div>
              <Button 
                variant="outlined" 
                color="primary"
                m={0}
                // we pass the handleSubmit function to the form validaror 
                onClick={this.addEmoji} 
                // type='submit'
                className={classes.button}
                >
                Pick Emoji...
              </Button>
              <Dialog open={this.state.openEmoji} onClose={this.hideEmoji}>
                <DialogTitle  id="form-dialog-title">
                  Choose a Your Favourite Emoji...
                </DialogTitle>
                <Picker title='Pick an emoji...' onSelect={(emoji)=>(this.handleEmoji(emoji))}/>
              </Dialog>
            </DialogContent>
            <DialogActions>
                  <Button onClick={hideForm} color="primary">
                    Cancel
              </Button>
              <Button 
                  variant="contained" 
                  color="primary"
                  // we pass the handleSubmit function to the form validaror 
                  // onClick={this.handleSubmit} 
                  type='submit'
                  className={classes.button}
                  >
                  Save Palette
              </Button>
            </DialogActions>
            </ValidatorForm>
          </Dialog>
        </div>
        )
    }
}
export default PaletteMetaForm