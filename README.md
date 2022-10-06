# React Native + React Native Web

### How to run
- `$ git clone ...`
- `$ cd RNW`
- `$ yarn`
- Web
  - [WEB] `$ yarn web:start`
- Mobile
  - [iOS] `$ yarn ios:start`
  - [Android] `$ yarn android:start`

### Chrome extension
- `$ yarn web:build`
- Visit `chrome://extensions/` on your Chrome browser and enable the developer mode
- Click `Load unpacked` and select `dist` folder from the project root
- Use extension

### Github actions
#### Locally
- Install [Act](https://github.com/nektos/act)
- Run `yarn act` command from project root 