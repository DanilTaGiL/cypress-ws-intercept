# Cypress WebSocket intercept

## Usage:
```js
cy.interceptWs('/ws', (income, outcome) => {
    if (income) {
        // TODO
    }

    if (outcome) {
        // TODO
    }

    return {income: income, outcome: outcome}
});
```

## Configure:    
```json
// cypress.json
{
  "env": {
    "cypressWsProxy": {
      "serverPort": "4321",
      "targetUrl": "wss://gas-price-api-staging.1inch.io/ws"
    }
  }
}
```

## Install:    
Install package:    
```shell
# for npm
npm install cypress-ws-intercept
# for yarn
yarn add cypress-ws-intercept
```

**required:** load this module from
the [support file](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file)    
```js
// cypress/support/commands.js
import 'cypress-ws-intercept/dist/commands';
```

**required:** load this module from
the [plugin file](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Plugins-file)    
```js
// cypress/plugins/index.js
module.exports = (on, config) => {
    require('cypress-ws-intercept/dist/plugin')(on, config);
    // make sure to return the config object
    // as it might have been modified by the plugin
    return config
}
```

**optional:** add TypeScript types    
```json
{
  "compilerOptions": {
    "types": ["cypress", "cypress-ws-intercept"]
  }
}
```
