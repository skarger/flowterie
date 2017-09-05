# flowterie
Flow Craftsmanship
=======

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd flowterie`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* By default HTTP requests for data will be handled by Mirage.
* To make actual HTTP requests to a dev API running at port 5000 run as follows:
```
ember serve --proxy http://localhost:5000 --no-transparent-proxy
```
(`--no-transparent-proxy` required to avoid double-proxying error when API at localhost:5000 forwards to backend services)

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

TBD
