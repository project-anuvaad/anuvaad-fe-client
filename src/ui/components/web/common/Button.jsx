import React from "react";
import Button from '@material-ui/core/Button';

 class AppButton extends React.Component {
    
    render(){
        const { variant, value, color, onClick, style, dis} = this.props;
        console.log('text',dis)
        return(
        
            <div>
                <Button variant={variant} onClick={onClick} color={color} style={style} disabled={dis}>
                    {value}
                </Button>
            </div>
        
        )
    } 
 }

;


export default AppButton;