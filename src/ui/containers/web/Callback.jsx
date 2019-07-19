import React from "react";
import { withRouter } from "react-router-dom";
import history from "../../../web.history";

class Callback extends React.Component {

    componentDidMount() {
        let hash = this.props.location.hash.split('&')
        hash.map((h) => {
            if (h.indexOf('access_token') > 0) {
                localStorage.setItem('token', h.split('access_token=')[1])
                history.push("/viewtranslate")
            }
        })
    }

    render() {
        return (
            <div>Redirecting Please wait..</div>
        );
    }
}


export default withRouter(Callback);
