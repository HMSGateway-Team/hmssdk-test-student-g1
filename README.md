# **FirstApp.js**

This project will show you how to get data from our data source(HMS v2) via `npm`.

## **Requirement**

We require some dependencies below :

 - [**@hmsconnect/hmshealthapi**](https://www.npmjs.com/package/@hmsconnect/hmshealthapi) - 
 The library makes you easy to get the data. To see more detail of the repository on `Github`, please refer to [here](https://github.com/HMSConnect/hmshealthapi/tree/feature/oauth2-ias).
 - **IAS token** - The token is JSON data object that contains `username`, `password` and `client_id`.
 You can get the token [here](http://ehie-dev.bdms.co.th/). It using for authentication to **IAS**.
 - [**dotenv**](https://www.npmjs.com/package/dotenv) - It using for declare/reference system environment variable.

## **Usage**

### **1. Install Dependencies**

At the root directory of your project :

```bash
$ npm install @hmsconnect/hmshealthapi dotenv --save
```

### **2. Import the library**

```js
const hmshealthapi = require('@hmsconnect/hmshealthapi');
require('dotenv').config();
```

Don't forget declare system environment variable into `.env` file :

```bash
# Example .env

USERNAME=admin
PASSWORD=admin
CLIENT_ID=1234567890
HOST_DATA_SRC=127.0.0.1
```

### **3. Declare IAS token**

```js
let tokens = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    client_id: process.env.CLIENT_ID
};
```

### **4. Create HMS object instance**

```js
let hms = hmshealthapi();
```

### **5. Initial the object instance**

```js
hms.Initial(tokens, (error, response) => {
    
    // 1. Point to specific server

    // 2. Get data

});
```

#### **5.1 Config server**
In case you would like to point to specific server, you can calling `setConfig` to config the object insstance :

```js
hms.Initial(tokens, (error, response) => {

    // ...

    hms.SetConfig({
        host: process.env.HOST_DATA_SRC,
        endpoints: {
            get_domain_resource : '/sandbox/api/v2',
            get_version : '/sandbox/version'
        }
    });

    // ...

});
```

For `DATA_SOURCE_IP_OR_HOSTNAME`, you can request IP/DNS of the data source instance via HMS's `admin`

#### **5.2 Get data**

```js

    // ...

        try {
            // Set header for authentication
            const headers = {
                Authorization: `Bearer ${response.access_token ? response.access_token : ''}`
            };

            // Test get some practitioner
            hms.get('practitioner', headers, 'name.givenName:contain="Rozelle 105418"&sort=-identifier.start')
            .then((response) => { console.log('Searching with request URL:', JSON.stringify(response, null, 2)); })
            .catch((err) => { console.log('Error :', err); });
        } catch(err) {
            console.log(err)
        }
    
    // ...

```

#### **Full code**

```js
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
    
            hms.get('practitioner', headers, 'name.givenName:contain="Rozelle"&sort=-identifier.start')
            .then((response) => { console.log('Searching with request URL:', JSON.stringify(response, null, 2)); })
            .catch((err) => { console.log('Error :', err); });
    
        } catch(err) {
            console.log(err)
        }
    }

});
```

## **License**

ISC