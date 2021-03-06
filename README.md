
poc-angular-frontend
====================

[![WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-4.png)](http://wtfpl.net)

[Demo version available](http://poc-angular-frontend.herokuapp.com/)

What is this ?
--------------
An [AngularJs] (http://angularjs.org/) app built on the top of [poc-play-rest-backend] (https://github.com/MarcLoupias/poc-play-rest-backend)

For what purpose ?
------------------
The main goal is to provide a full dev environment, a skeleton for an Angular app associated with
a [Play!] (http://www.playframework.com/) server, and served on [Heroku](https://www.heroku.com/),
with some good practices for the most common problems encountered in that case.

Dev setup
---------
* You need a working [npm](https://www.npmjs.org/) install.
* You need [Yeoman](http://yeoman.io/), [grunt](http://gruntjs.com/) and [bower](http://bower.io/).
`# npm install -g yo grunt-cli bower`
* I use the [angular generator](https://github.com/yeoman/generator-angular) for yo
`npm install -g generator-angular`

Major frameworks and lib used
-----------------------------
* [AngularJs] (http://www.playframework.com/) version 1.2.6
* [Bootstrap] (http://getbootstrap.com/) version 3.0.3
* [UI Bootstrap] (http://angular-ui.github.io/bootstrap/) version 0.10.0
* [NG-Grid] (http://angular-ui.github.io/ng-grid/) version 2.0.7
* JQuery version 1.10.2 is used as a NG-Grid dependency but never used in the project code.

Running the tests
-----------------
Check karma config first in `karma.conf.js` file then :
`grunt test`

Configuring the backend url
---------------------------
Check `backend-url-service.js` file and change the value.

Running a dev web-server
------------------------
`grunt serve`
The server is run on http://127.0.0.1:9000

Building the app
----------------
`grunt build`
`dist` folder is creating containing the generated app. This is your production files.

A word about generator-angular build config
-------------------------------------------
I have some issues with circular dependency and provider misspelled on the generated files caused by the minification
grunt task so i have deactivated all this stuff. The source code is simply copied in the dist folder for now.

Running a prod web-server
-------------------------
Go to `dist` directory and run `node web.js`.
You can check that your app is working by launching a browser and goin to `http://127.0.0.1:9000`.

Heroku Deployment
-----------------
* [heroku.com] (https://www.heroku.com/)
* We assume that you have installed the [Heroku Toolbelt] (https://toolbelt.heroku.com/).

Notices that heroku needs a git repo to be pushed to him. We don't want to push the whole source code but only the `dist`
folder. So the structure is :
- The main project folder contains the whole source code and dev environment. This repo is pushed to github. For this
repo the `dist` folder is simply ignored.
- The generated project folder (`dist`) with his own repo to be pushed to heroku.

1. Change manually `backend-url-service.js` constant to your prod backend url.
2. Change manually `app-version-service.js` value for frontend version number.
2. run `grunt build`.
3. go to your `dist` directory.
4. commit the new build.
5. run `git push heroku master`.

TODO
----
* need to use grunt to run deployment step 1 & 2.
* need to fix minification issues in regular generator-angular grunt tasks.
* need i18n english
* need real unit test
* ...
