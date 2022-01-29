Cypress.Commands.add("interceptWs",(url, mediator) => {
    const args = { url: url, mediatorStr: mediator.toString() };
    return cy.task('interceptWs', args);
});

Cypress.Commands.add("test",() => {
    cy.task('test');
});