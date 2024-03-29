import API from "./api";
import C from "../constants";

export default class UpdatePassword extends API {
    
    constructor(id,new_password, timeout = 2000) {
        super('POST', timeout, false);
        this.type = C.UPDATE_PASSWORD;
        this.user_id = id;
        
        
        this.new_password = new_password;
        this.updatePassword=""   
    }

    toString() {
        
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        
        
        super.processResponse(res)
        if (res) {
            this.updatePassword = res;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/app/update-password-admin`;
    }

    getBody() {
        return {
            user_id : this.user_id,
            new_password : this.new_password
        };
      }
      
      getHeaders() {
    this.headers = {
      headers: {
        'Authorization': 'Bearer '+decodeURI(localStorage.getItem('token')),
        "Content-Type": "application/json"
      }
    };
    return this.headers;
  }

    getPayload() {
        return this.updatePassword;
    }

}