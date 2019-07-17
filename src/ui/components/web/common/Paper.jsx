import React from "react";

import Paper from '@material-ui/core/Paper';

 class PaperClass extends React.Component {
    
    render(){
        const { value , style} = this.props;
    
        return(
        
            <div>
                <Paper style={style}>
                    {value}
                </Paper>
            </div>
        
        )
    } 
 }

;


export default PaperClass;