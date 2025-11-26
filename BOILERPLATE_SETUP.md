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

### Authorized Wrapper

- Use this wrapper for all authenticated page / routes outside Dashboard container. Dashboard container already contains the Authorized Wrapper.

### Loader setup

- On `dispatch(loadingStart())` , it start loader in whole screen
- On `dispatch(loadingStart('google-icon'))` with a unique identifier, you can use `isLoading == 'google-icon'` value from redux to load button / section instead of whole screen

### Navigation / Routes / Permission

- Use `filterSidebarMenuByPermission` prop in `DashboardContainer` to filter sidebar menu by permission.
- Use `permission` key in `SIDEBAR_MAIN_MENU` to set permission for each menu item.
- Use `USER_PERMISSIONS` constant to set permission for each route.
- Use `RequireAuth` component to protect routes by session and permission.
- Use `allowedPermissions` prop in `DashboardContainer` to pass allowed permissions of user to sidebar menu.
- To navigate from one page to another page variables from ROUTES in utils

### Cache Mechanism

- Use Tanstack Query, use the existing related hooks for cache mechanism and trigger invalidate cache

### TODO

- Set Error boundary
- Fix console error for sidemenu jsx
- Add 404 , 403 proper pages
- Fix Breadcrumb and Footer template
- Set Dashboard container footer
