module.exports = {
    port: 8080,
    sessionSecret: 'secretString',
    ad: {
        realm: 'http://mysite.com',
        logoutUrl: 'http://mysite.com',
        identityProviderUrl: 'https://login.windows.net/my-tenant-id/wsfed',
        identityMetadata: 'https://login.windows.net/my-tenant-id/federationmetadata/2007-06/federationmetadata.xml'
    },
    mongoDB: 'mongodb://localhost:27017/improvingu',
    secure: false
};
