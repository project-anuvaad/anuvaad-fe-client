import React from "react";
import Typography from '@material-ui/core/Typography';

 class TypographyClass extends React.Component {
    
    render(){
        const { value, variant, gutterBottom, style} = this.props;
    
        return(
        
            <div>
                <Typography variant={variant} gutterBottom={gutterBottom} style={style}>
                    {value}
                </Typography>
            </div>
        
        )
    } 
 }

;


export default TypographyClass;