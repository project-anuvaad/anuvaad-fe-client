import React from "react";
import Button from '@material-ui/core/Button';

 class AppButton extends React.Component {
    
    render(){
        const { variant, value, color, onClick, style} = this.props;
    
        return(
        
            <div>
                <Button variant={variant} onClick={onClick} color={color} style={style}>
                    {value}
                </Button>
            </div>
        
        )
    } 
 }

;


export default AppButton;