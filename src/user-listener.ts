import express = require("express");
import express_ws from "express-ws";
import {debug} from "./utils";
import {TargetListener} from "./target-listener";

export class UserListener {
    private static mediator;
    private static app;
    private static expressWs;
    private static wsUser;

    static start(port: string | number) {
        this.app = express();
        this.expressWs = express_ws(this.app);

        this.app.ws('/ws', (ws, req) => {
            console.log("New connection has opened!");
            ws.on('message', msg => {
                debug('message from user to real back:', msg);
                const wsTarget = TargetListener.getTargetWs();

                if (wsTarget) {
                    try {
                        let result;

                        if (this.mediator) {
                            result = this.mediator(null, msg);
                        }

                        if (result) {
                            debug('OUTCOME. value to send, after mediator: ', result.outcome);
                            wsTarget.send(result.outcome);
                        }
                    } catch (e) {
                        console.error('some error with OUTCOME message. send not modified message. error:', e);
                        wsTarget.send(msg);
                    }
                }
            });
        });

        this.wsUser = this.app.listen(port);
    }

    static getUserWs() {
        return this.wsUser;
    }

    static getClients() {
        return this.expressWs?.getWss().clients;
    }

    static setMediator(newMediator) {
        this.mediator = newMediator;
    }
}