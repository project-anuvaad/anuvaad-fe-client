import React from "react";

import TextField from '@material-ui/core/TextField';

 class AppTextField extends React.Component {

    render(){
        const { id,varient, value, style,floatingLabelText,onChange,type} = this.props;

        return(
    
            <div>
                <TextField id={id} label={value} variant={varient} style={style} floatingLabelText={floatingLabelText} onChange={onChange} type={type}/>
            </div>
      
        )
    } 
};

export default AppTextField;