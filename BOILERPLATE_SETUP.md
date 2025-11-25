# BOILERPLATE SETUP

- Replace `LOCAL_STORAGE_KEY : 'boilerplate_local_storage'` with project name in `src/config` so that the local storage key is unique.
- Change version and project name in `package.json`

### Reference to 3rd Party supported libraries by Antd

- [Recommended Libraries](https://ant.design/docs/react/recommendation)
- [Guide to edit Antd theme](https://ant.design/theme-editor)

### On Login

- Store data in redux session except the permission.
- Store list of permission in redux permission.
- Load permission and other sensitive user data from server side on page reload inside the Authenticated Wrapper
-
