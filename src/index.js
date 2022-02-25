const {TargetListener} = require("./target-listener");
const {UserListener} = require("./user-listener");

module.exports = {
    startServer: (port, targetUrl) => {
        if (!UserListener.getUserWs()) {
            console.log('start server on port', port);
            UserListener.start(port);
            console.log('start listener of target sever, url:', targetUrl);
            TargetListener.start(targetUrl);
        }
        else console.log('server already started!');
    },
    setMediator: newMediator => {
        UserListener.setMediator(newMediator);
        TargetListener.setMediator(newMediator);
    },
    unsetMediator: () => {
        UserListener.setMediator(null);
        TargetListener.setMediator(null);
    }
}
