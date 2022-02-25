/** @type {Cypress.PluginConfig} */
const {startServer, unsetMediator, setMediator} = require("./index");
const debug = require('debug')('cypress-ws-intercept');

module.exports = (on, config) => {
    if (!config || !config.env) {
        return config
    }

    const proxySettings = config.env.cypressWsProxy;
    if (!proxySettings) {
        console.log('cypress-ws: PLEASE, setup WS proxy settings!')
    }

    // TODO: replace on hooks
    on('before:browser:launch', () => {
        startServer(proxySettings.serverPort, proxySettings.targetUrl);
    });

    // TODO: replace on hooks
    on('after:spec', () => {
        unsetMediator();
    });

    on('task', {
        interceptWs: async (args) => {
            debug("interceptWs url:", args.url);
            const mediator = new Function('return ' + args.mediatorStr)();
            setMediator(mediator);
            return null;
        }
    });

    return config;
};