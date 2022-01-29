/// <reference types="Cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        interceptWs<ReturnType = any>(
            url: string,
            mediator: (incoming: string, outcoming: string) => void
        ): Chainable<null>
        test<ReturnType = any>(): Chainable<null>
    }
}
