import React from "react";
import CONFIG from '../../../configs/apigw'

class Home extends React.Component {

    componentDidMount(){
        window.location.href = CONFIG.BASE_URL+CONFIG.AUTH_ENDPOINT+'?'+CONFIG.RESPONSE_TYPE+'&'+CONFIG.CLIENT_ID+'&'+CONFIG.REDIRECT_URI+'&'+CONFIG.RETURN_TO
    }

  render() {
    return (
      <div></div>
    );
  }
}


export default Home;
