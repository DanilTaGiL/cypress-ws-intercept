import WebSocket = require("ws");
import {UserListener} from "./user-listener";
import {debug} from "./utils";

export class TargetListener {
    private static mediator;
    private static wsTarget;

    static start(targetUrl: string) {
        this.wsTarget = new WebSocket(targetUrl);

        this.wsTarget.onmessage = event => {
            debug('message from real back to user:', event.data);

            const proxyClients = UserListener.getClients();
            const wsProxy = UserListener.getUserWs();

            if (wsProxy && proxyClients) {
                try {
                    let result;

                    if (this.mediator) {
                        result = this.mediator(event.data, null);
                    }

                    if (result) {
                        debug('INCOME. value to send, after mediator: ', result.income);
                        proxyClients.forEach(client => client.send(result.income));
                    }
                } catch (e) {
                    console.error('some error with INCOME message. send not modified message. error:', e);
                    proxyClients.forEach(client => client.send(event.data));
                }
            }
        }
    }

    static getTargetWs() {
        return this.wsTarget;
    }

    static setMediator(newMediator) {
        this.mediator = newMediator;
    }
}