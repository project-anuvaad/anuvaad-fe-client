const configs = {
    BASE_URL: (process.env.REACT_APP_APIGW_BASE_URL ? process.env.REACT_APP_APIGW_BASE_URL : 'http://nlp-nmt-160078446.us-west-2.elb.amazonaws.com')+ '/app/',
    AUTH_ENDPOINT: 'oauth2/authorize',
    LOGOUT_ENDPOINT: 'logout',
    POST_LOGOUT_URL:'returnTo='+window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : ''),
    RETURN_TO:'returnTo='+window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '')+'/callback',
    RESPONSE_TYPE: 'response_type=token',
    //Test
    // CLIENT_ID: 'client_id='+(process.env.REACT_APP_CLIENT_ID ? process.env.REACT_APP_CLIENT_ID:'ef79a009-444e-4de4-90c4-52a17ec783f9'),
    //Dev
    CLIENT_ID: 'client_id=55952c35-8387-4c56-8cf4-a3c1c63714eb',
    //Prod
    // CLIENT_ID: 'client_id=fc7ed37f-546a-41d3-b0f4-96e6ab8274bf',
    REDIRECT_URI: 'redirect_uri='+window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '')+'/callback',
    
};

export default configs;