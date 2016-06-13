FuseR - Fuse Starter Kit with RethinkDB API
===

We :green_heart: building apps with Fuse, because it helps us create high quality, truly native (no hybrid) and blazing fast products for both major mobile platforms quickly and cost-effectively.

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

##### Start the database:
`npm run start:db`

##### Start the API server:
`npm run start:server`

##### Start the Fuse desktop preview:
`npm run dev:app`

##### Start the application on iOS hardware:
`npm run dev:ios`

##### Start the application on Android hardware:
`npm run dev:android`


## Contributing

If you find any problems, please [open an issue](https://github.com/Bartekus/FuseR/issues/new) or submit a fix as a pull request.

We welcome new features, but for large changes let's discuss first to make sure the changes can be accepted and integrated smoothly.

## License

[MIT License](LICENSE)

## Credits

This project aims to utilizes everything Fusetools available and as such, huge thank you go to anyone and everyone contributing or being involved with it.
