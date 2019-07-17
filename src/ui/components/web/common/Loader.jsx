

import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

 class Loader extends React.Component {
    
    render(){
        const { color} = this.props;
    
        return(
        
            <div>
                <CircularProgress color={color} style={{marginLeft:'40%',marginTop:'16%', width:'5%'}}/>
            </div>
        
        )
    } 
 }

;


export default Loader;



