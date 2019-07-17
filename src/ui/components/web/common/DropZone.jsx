import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
 
class DropZone extends Component{
  
 
  render(){
    const { handleChange, style} = this.props;
    return (
      <div style={{textAlign:'center'}}>
      <input type="file" accept=".docx" onChange={handleChange} />
      </div>
      // <DropzoneArea 
      //   onDrop={handleChange} style={{width:'50%'}} accept=".docx"
      //   ></DropzoneArea>
    )  
  }
} 
 
export default DropZone;
