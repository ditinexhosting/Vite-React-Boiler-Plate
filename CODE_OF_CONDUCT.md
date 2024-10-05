# CODE OF CONDUCT

## TODO Checklist

- Install eslint and prettier extensions in vs code and use the default settings defined in .vscode
- Use Ant Design for designing component.
- Create custom components with tailwind
- Use Ag Grid for tables
- Use react-hot-toast to show toast messages
- Use lucid icons for icons

## Folder Structure

- Add all image, assets, json files to _assets_ folder.
- Add all re-usable components to _components_ folder.
- Add non-reusable components to that specific folde. i.e - pages/Login/components.
- Each component or pages folder should be in camelcase and starts with Capital letter.
- Export all re-usable components from index so that it can be imported with non-relative url.
- _config_ folder contains all the ENV and other config.
- _hooks_ folder contains all custom hooks.
- _lib_ folder contain all custom or 3rd party library.
- _navigation_ folder contain react router
- _pages_ folder contain all the web page UI component.
- _redux_ folder contains all redux action,reducer,store.
- _services_ folder contain all API services and other 3rd party service.
- _styles_ folder contains global css and module css.
- _util_ folder contain constants and common functions.

```
.
├── ...
├── assets
│   ├── images
│   ├── json
├── components
│   ├── index
│   ├── Loader
├── config
├── hooks
│   ├── index
│   ├── useErrorLog
├── lib
│   ├── index
│   ├── Wrapper
├── navigation
├── pages
│   ├── index
│   ├── Login
├── redux
├── services
├── styles
│   ├── global.css
│   ├── loader.css
├── utils
├── App.jsx
├── main.jsx
└── ...
```

## Code structure to follow

- Any reusable constant and common function should go to _utils_
- Any global styles should go to global.css and any module based css goes to file like moduleName.css
- Any module based css should have a container to isolate css code and prevent overwrite
- All page should contain a description at top like :

```js
/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * This is a wrapper element on the root component.
 * It handles all additional work and states needed before initializing root component.
 */
```

- Maintain standard code structure with comment. Declare all states and variables first and the the UseEffect and then all other method.

```js
//-------------- State & Variables --------------//

//-------------- Use Effects --------------//

//-------------- Other Methods --------------//
```

- Each method should contain description, parameter and return type comment such as :

```js
/**
 * Console the error in PM2 log
 * @param {*} error
 */
```

- Each component should use handleError hook :

```js
const handleError = useErrorLog('lib/Wrapper');
```

- Each method should use try catch and pass catch error to handleError :

```js
try{
    throw Exception "error message";
}
catch(e){
    handleError(e);
}
```

- Break big page UI into small section and components.

## Contributing

Pull requests (PRs) are welcome.

- Create a branch with your name from dev branch.
- Do changes in that branch.
- Push changes to your branch and create PR to staging branch.
- Get PR reviewed for sanity check and merge it to staging.
- Then finally merge all changes from staging to main to deploy in prod.

## License

[MIT](https://choosealicense.com/licenses/mit/)
