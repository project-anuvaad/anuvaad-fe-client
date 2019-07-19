const configs = {
    // BASE_URL: 'http://localhost:8080/',
    BASE_URL: 'http://nlp-nmt-160078446.us-west-2.elb.amazonaws.com/app/',
    AUTH_ENDPOINT: 'oauth2/authorize',
    LOGOUT_ENDPOINT: 'logout',
    // POST_LOGOUT_URL:'returnTo=http://localhost:3000',
    POST_LOGOUT_URL:'returnTo=http://nlp-nmt-160078446.us-west-2.elb.amazonaws.com',
    // RETURN_TO:'returnTo=http://localhost:3000/callback',
    RETURN_TO:'returnTo=http://nlp-nmt-160078446.us-west-2.elb.amazonaws.com/callback',
    RESPONSE_TYPE: 'response_type=token',
    // CLIENT_ID: 'client_id=687b1bcf-882a-463b-86c9-3fae03f9b76b',
    CLIENT_ID: 'client_id=fc7ed37f-546a-41d3-b0f4-96e6ab8274bf',
    // REDIRECT_URI: 'redirect_uri=http://localhost:3000/callback',
    REDIRECT_URI: 'redirect_uri=http://nlp-nmt-160078446.us-west-2.elb.amazonaws.com/callback',
    
};

export default configs;