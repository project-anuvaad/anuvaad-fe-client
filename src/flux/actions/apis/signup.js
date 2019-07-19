/**
 * Corpus API
 */
import API from "./api";
import C from "../constants";

export default class Signup extends API {
    constructor(firstname, lastname, email, password, timeout = 2000) {
        super('POST', timeout, false, 'MULTIPART');
        this.type = C.SIGNUP;
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.password = password
        this.response={}
        
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res)
        if (res.data) {
            this.response = res.data;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/corpus/translate-docx`;
    }

    getFormData() {
        
        const formData = new FormData();

            formData.append('firstname', this.firstname);
            formData.append('lastname', this.lastname);
            formData.append('email',this.email);
            formData.append('password',this.password);

        return formData;
    }

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    }

    getPayload() {
        return this.response
    }

}