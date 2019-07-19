const configs = {
    BASE_URL: 'http://localhost:8080/',
    AUTH_ENDPOINT: 'oauth2/authorize',
    LOGOUT_ENDPOINT: 'logout',
    POST_LOGOUT_URL:'returnUrl=http://localhost:3000',
    RETURN_TO:'returnTo=http://localhost:3000/callback',
    RESPONSE_TYPE: 'response_type=token',
    CLIENT_ID: 'client_id=687b1bcf-882a-463b-86c9-3fae03f9b76b',
    REDIRECT_URI: 'redirect_uri=http://localhost:3000/callback'
};

export default configs;