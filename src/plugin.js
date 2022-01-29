/** @type {Cypress.PluginConfig} */
const {startServer, setMediator, unsetMediator} = require("./ws-server");

module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config

    on('before:browser:launch', (browser, arguments) => {
        const port = 3228;
        startServer(port);
    });

    on('after:spec', () => {
        unsetMediator();
    });

    on('task', {
        interceptWs: async (args) => {
            // console.log("interceptWs url:", url);
            const mediator = new Function('return ' + args.mediatorStr)();
            setMediator(mediator);
            return null;
        },
        test: async () => {
            console.log("test!!!!");
            return null;
        }
    });

    return config;
};