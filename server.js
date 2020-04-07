// Declare HMS instance object
const hmshealthapi = require('@hmsconnect/hmshealthapi');
require('dotenv').config();

let tokens = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    client_id: process.env.CLIENT_ID
};
   
let hms = hmshealthapi();
hms.Initial(tokens, (error, response) => {

    if(error) {
        console.log('Initial error : ', error);
    } else {
        console.log('response :', response);

        // Config data source
        hms.SetConfig({
            host: process.env.HOST_DATA_SRC,
            endpoints: {
                get_domain_resource : '/sandbox/api/v2',
                get_version : '/sandbox/version'
            }
        });
    
        try {
    
            const headers = {
                Authorization: `Bearer ${response.access_token ? response.access_token : ''}`
            };
    
            console.log('Header : ', headers)
    
            hms.get('practitioner', headers, 'name.givenName:contain="Silas S9"&sort=-identifier.start')
            .then((response) => { console.log('Searching with request URL:', JSON.stringify(response, null, 2)); })
            .catch((err) => { console.log('Error :', err); });
    
        } catch(err) {
            console.log(err)
        }
    }

});