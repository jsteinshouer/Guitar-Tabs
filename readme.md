## Guitar Tabs Library

### Description
This is an application for storing and organizing guitar tabluature and a tool to aid with guitar practice. I created the project as a learning tool for web development. The server is built using CFML and the Coldbox framework. The client is built with Bootstrap and AngularJS.

### Stack

* Server: [Lucee](http://lucee.org/) + [H2 Embedded Database](http://www.h2database.com/html/main.html)
* Client [AngularJS](http://www.angularjs.org/)
* CSS based on [Twitter's bootstrap](http://getbootstrap.com/)

I am running this on the [OpenShift](https://www.openshift.com/) platform from Red Hat with the Tomcat application server.

### Requirements

The following dependencies that should be installed prior to setup

* [Node.js](http://nodejs.org/)
* [GruntJS](http://gruntjs.com/)
```
npm install -g grunt-cli
```
* [Bower](http://bower.io/)
```
npm install -g bower
```
* [CommandBox](https://www.ortussolutions.com/products/commandbox)


### Building and Running

On windows run build.bat. This will install the required npm and bower modules for the client then run grunt build task to build the client application. It then uses CommandBox to install required server modules and copies the required assets from the client distribution directory.

```
build.bat
```