FuseR - Fuse Starter Kit with RethinkDB API
===

We :purple_heart: building apps with Fuse, because it helps us create high quality, truly native (no hybrid) and blazing fast products for both major mobile platforms quickly and cost-effectively.

Getting started on a new app just takes too damn long, though. Most apps need the same basic building blocks and developer infrastructure, and we are bored of reinventing the wheel time and time again.

This Starter Kit reflects the best practices of Fuse development as we discover them while building real-world applications for our customers.
It might not be a one-size-fits-all solution for everyone, but feel free to customize it for your needs, or just take inspiration from it.

## Contents

:warning: **WORK IN PROGRESS** |
:star: **COMING SOON**

Not all of the below is yet fully implemented

### Application Blueprint

* Always up-to-date scaffolding
* Modular and well-documented structure for application code
* Functional approach favored
* Disk-persisted application state caching for offline support and snappy startup performance
* :warning: Sample app to show how to wire it all together
* :warning: Clean and testable service layer for interacting with RESTful APIs
* :star: JSON Web Token authentication
* :star: Multi-environment configuration (dev, staging, production) for iOS and Android
* :star: Built-in error handling and customizable error screens

### Testing Setup

TBD.

### Development & Deployment Infrastructure

* Basic local token authentication / facebook / github / twitter for ready-to-use login and signup screens, user authentication and identity management
TBC...

### Roadmap

* Basic (Local Storage) Token Authentication is being finalized, then facebook/github/tweeter
* **TODO** Crash reporting
* **TODO** Android and iOS UI Testing with Calaba.sh?
* **TODO** Feature flags?

## Getting started

Please make sure you have rethinkDB installed. The easiest way is to use brew:
`brew update && brew upgrade && brew install rethinkdb`

`git clone git@github.com:Bartekus/FuseR.git && cd FuseR`

##### Installing Server NPM modules:
`npm install`

##### Start RethinkDB:
`npm run start:db`

If you have RethinkDB already running you can skip `npm run start:db`.
Next, in browser go to `http://localhost:8080` address to access the rethinkDB Admin Dashboard.
Once there, go to `Tables` tab and using `+Add Database` button create 'FuseR' database.
Afterwards create 'users' table using `+Add Table` button.

##### Create Demo Admin account
`npm run createDemoAdmin`

##### Test Demo Admin account
`npm run testDemoAdminToken`

##### Start the API server:
`npm run start:server`

##### Start the Fuse desktop preview:
`npm run dev:app`

##### Start the application on iOS hardware:
`npm run dev:ios`

##### Start the application on Android hardware:
`npm run dev:android`

### Troubleshooting
#### Installation
Please ensure that you have python installed and are able to execute:

`npm install -g node-gyp@latest`

To install python:

  * On Unix:
    * `python` (`v2.7` recommended, `v3.x.x` is __*not*__ supported)
    * `make`
    * A proper C/C++ compiler toolchain, like [GCC](https://gcc.gnu.org)
  * On Mac OS X:
    * `python` (`v2.7` recommended, `v3.x.x` is __*not*__ supported) (already installed on Mac OS X)
    * [Xcode](https://developer.apple.com/xcode/download/)
      * You also need to install the `Command Line Tools` via Xcode. You can find this under the menu `Xcode -> Preferences -> Downloads`
      * This step will install `gcc` and the related toolchain containing `make`
  * On Windows:
    * Visual C++ Build Environment:
      * Option 1: Install [Visual C++ Build Tools](http://go.microsoft.com/fwlink/?LinkId=691126) using the **Default Install** option.

      * Option 2: Install [Visual Studio 2015](https://www.visualstudio.com/products/visual-studio-community-vs) (or modify an existing installation) and select *Common Tools for Visual C++* during setup. This also works with the free Community and Express for Desktop editions.

      > :bulb: [Windows Vista / 7 only] requires [.NET Framework 4.5.1](http://www.microsoft.com/en-us/download/details.aspx?id=40773)

    * Install [Python 2.7](https://www.python.org/downloads/) (`v3.x.x` is not supported), and run `npm config set python python2.7` (or see below for further instructions on specifying the proper Python version and path.)
    * Launch cmd, `npm config set msvs_version 2015`

    If the above steps didn't work for you, please visit [Microsoft's Node.js Guidelines for Windows](https://github.com/Microsoft/nodejs-guidelines/blob/master/windows-environment.md#compiling-native-addon-modules) for additional tips.

If you have multiple Python versions installed, you can identify which Python
version `node-gyp` uses by setting the '--python' variable:

``` bash
$ node-gyp --python /path/to/python2.7
```

If `node-gyp` is called by way of `npm` *and* you have multiple versions of
Python installed, then you can set `npm`'s 'python' config key to the appropriate
value:

``` bash
$ npm config set python /path/to/executable/python2.7
```

Note that OS X is just a flavour of Unix and so needs `python`, `make`, and C/C++.
An easy way to obtain these is to install XCode from Apple,
and then use it to install the command line tools (under Preferences -> Downloads).

#### iOS/Android server connectivity problems
Given that the external devices such as Android or iPhone won't be able to connect to server running on localhost;
In `FuseR/app/components/LoginPage.js` modify `http://localhost:3333/signup` and `http://localhost:3333/login` to reflect your server's local network IP address.

## Contributing

If you find any problems, please [open an issue](https://github.com/Bartekus/FuseR/issues/new) or submit a fix as a pull request.

We welcome new features, but for large changes let's discuss first to make sure the changes can be accepted and integrated smoothly.

## License

[MIT License](LICENSE)

## Credits

This project aims to utilizes everything Fusetools available and as such, huge thank you go to anyone and everyone contributing or being involved with it.
