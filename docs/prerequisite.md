# Before We Begin
We need to do the following first
- Install the required tools
- sample API endpoint

## Install the required tools

> If you've already install `node`, `yarn` and `vue-cli`, you can skip to the next section. Nothing more fancy here!

If you haven't already known, we need Node.js, yarn, and vue-cli to compile and run our Vue.js project. So, click the link below to visit the corresponding websites to install them in your development environment.

  - [Node.js](https://nodejs.org/en/)
  - [Yarn](https://yarnpkg.com/) -- _if you prefer a slower workflow, you can also use `npm`_.
  - [vue-cli](https://github.com/vuejs/vue-cli)


## Create a tutorial project with Vue CLI

### Create a new project using vue-cli

Vue-cli is an excellent tool to help scaffold Vue.js project. We will use it to create our tutorial project as well. Just type or copy this to your command line.
```shell
  $ vue init webpack vuetable-2-tutorial
```

Once you press Enter, vue-cli will download the [webpack template](https://github.com/vuejs-templates/webpack) and start asking some questions to setup the project for us.

- `Project name`
  Enter the project name you like or just accept the default by pressing Enter.

- `Project description
  Enter project description or pressing Enter to accept the default.

- `Author`
  Enter your name as the author of the project.

- `Vue build`
  Select which build of Vue.js you would like to use in this project. In this case, we'll select the first option which is a "standalone" version (Runtime + Compiler). Please see the difference between these versions [here](https://vuejs.org/v2/guide/installation.html#Standalone-vs-Runtime-only-Build).

- `Install vue-router? (Y/n)
  Press `N` to answer `No` here as we do not need to use vue-router in our tutorial.

- `Use ESLint to lint your code?`
  Please select `No` for this option as it gives you less headache to start with. If you want to keep your mind busy or want to learn more about it, go read it [here](http://eslint.org/).

- `Setup unit tests with Karma + Mocha?`
  Just select `No` for the moment. We won't need to test anything in our tutorial. But when the time comes, just answer `Yes` and be grateful to the tool's author that make your life a lot easier.

- `Setup e2e tests with Nightwatch?`
  Just select `No` for the same reason as above.

Here is the example.

  > Project name: **_vuetable-2-tutorial_**
  > Project description: **_Vuetable tutorial project_**
  > Author: **_your name_**
  > Vue build: **_standalone (Runtime + Compiler)_**
  > Install vue-router? **_No_**
  > Use ESLint to lint your code? **_No_**
  > Setup unit tests with Karma + Mocha? **_No_**
  > Setup e2e tests with Nightwatch? **_No_**

  ![image](https://raw.githubusercontent.com/ratiw/images/master/vuetable-2-tutorial/00-1.png)

Once the installation is done, you have to `cd` into the project directory to install all the dependcies of the project.

```shell
  $ cd vuetable-2-tutorial
  $ yarn install
```

This might take awhile as `yarn` trying to install and link all the depencies specify in the `package.json` for you. Once it is finished, you can run the project like this.

```shell
  $ yarn run dev
```

You should now see the project running in the web browser like this.
  ![image](https://raw.githubusercontent.com/ratiw/images/master/vuetable-2-tutorial/00-2.png)

The project is now running in watch mode with Hot Reload. Which means you can continue to edit the source code and once you save it, the browser will automatically be upadted to reflect the changes you've made.

For now, close the page and type `Ctrl+C` in the command line to exit the watch mode.

## Sample API endpoint

Vuetable is designed to be a **presentation layer** of the data on the client side, so it needs to work with API endpoint. For the purpose of this tutorial and the example projects, we alredy have set up an API endpoint for it.

Currently, the API endpoint is at https://vuetable.ratiw.net/api/users

> If you are interested, the source code of the project is located [here](https://github.com/ratiw/vuetable-sample-api-endpoint)

Basically, this API endpoint returns a collection of fake users and it supports the following features:

- Pagination (`page`)
    You can specify which "page" of data you're interested by using `page` in the query string.

        page=<page number>

    The returned data will also contain pagination information. See [JSON result](http://vuetable.ratiw.net/api/users) from the sample API endpoint.

- Result limit (`per_page`)
    You can specify how many records you would like for a page by using `per_page in the query string.

        per_page=<number of records>

- Sorting (`sort`)
    You can request the sorted result from the API endpoint using `sort` in the query string.

        sort=<field>|<direction>

    All of the columns directly in the User are sortable, but not those that are in the embedded data like `group` and `address`.

    > If you would like your API to support sorting in the embedded data, you'll have to use SQL's `JOIN` to expose it.

- filtering (`filter`)
    You can request the filtered result from the API endpoint using `filter` in the query string.

        filter=<text>

    The `<text>` is a string to be searched for in `name`, `nickname`, and `email` fields.

The values for `page`, `per_page`, `sort`, and `filter` in the query string will be populated automatically by Vuetable before sending the request to the server.

If you would like to use other terms or the API you're working with use different terms, you can use `query-params` prop change them accordingly and Vuetable will use those terms instead.
