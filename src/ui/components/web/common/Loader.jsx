

import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

 class Loader extends React.Component {
    
    render(){
        const { color} = this.props;
    
        return(
        
            <div>
                <CircularProgress color={color} />
            </div>
        
        )
    } 
 }

;


export default Loader;



