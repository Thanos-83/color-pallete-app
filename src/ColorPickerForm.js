import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const styles = {
    picker: {
        width: "100% !important",
        marginTop: "3rem"
      },
      addColor: {
        width: "100%",
        padding: "1rem",
        marginTop: "1rem",
        fontSize: "2rem"
      },
      colorNameInput: {
        width: "100%",
        height: "70px",
        marginTop:'1rem'
      }
}

class ColorPickerForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentColor: '',//'#1B37BD',
            newColorName:'',
            // colors:[]
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        // const newName = event.target.value;
        this.setState({ 
          [event.target.name]: event.target.value
         });
    }

    handleSubmit=()=>{
        const newColor={
            color:this.state.currentColor,
            name:this.state.newColorName
        }
        this.props.addNewColor(newColor);
        this.setState({
            newColorName:''
        });
    }


    updateCurrentColor = (newColor) => {
        this.setState({ currentColor: newColor.hex });
        console.log(newColor)
      }

    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => 
            this.props.colors.every((name)=>(
              name.name.toLowerCase()!==value.toLowerCase()
            ))
        );
    
        ValidatorForm.addValidationRule('isColorUnique', (value) => 
            this.props.colors.every((color)=>(
              color.color.toLowerCase()!==this.state.currentColor.toLowerCase()
            ))
        );
      }
    
    
    render() {
        const {paletteIsFull, classes} = this.props;
        const {currentColor} = this.state;
        return (
            <div>
                <ChromePicker 
                    color={currentColor }
                    onChangeComplete={ this.updateCurrentColor }
                    className={classes.picker}
                />
                <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
                >
                <TextValidator
                    className={classes.colorNameInput}
                    label="Color Name"
                    onChange={this.handleChange}
                    name="newColorName"
                    variant='filled'
                    value={this.state.newColorName}
                    validators={['required','isColorNameUnique','isColorUnique']}
                    errorMessages={[
                    'this field is required',
                    'Name already exists',
                    'Color must be unique'
                    ]}
                />
                <Button 
                    variant='contained' 
                    color='primary'
                    style={{backgroundColor: paletteIsFull?'gray':currentColor}}
                    // onClick={this.addNewColor}
                    disabled = {paletteIsFull}
                    type='submit'
                    className={classes.addColor}
                >
                    {paletteIsFull?'Palette Full' :'Add Color'}  
                </Button>
                </ValidatorForm>  
            </div>
        )
    }
}
export default withStyles(styles)(ColorPickerForm);