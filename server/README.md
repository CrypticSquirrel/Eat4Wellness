# BetterFood's Server Repository

This README purpose is to help developers get their local developement environment up and running with this app's server. 

Prerequisites
--

Node is required. Install it from their [official page](https://nodejs.org/) if you don't have it. These commands should work:
- `node -v`
- `npm -v`

MongoDB is also required. Install it from their [official page](https://docs.mongodb.com/manual/installation/) if you don't have it. The following command should work:
- `mongo -version`
- The app will create a db named `betterfood` and a collection named `users`. More will collections will be added as needed. 
- I use [Robo 3T](https://robomongo.org/) (not Studio) for MongoDB if I need a UI client. 

Initialize & Run Commands
--

```bash
# navigate to server folder
cd path/to/server

# install dependencies
npm install

# serve with node at localhost:3000
npm start

# serve with nodemon at localhost:3000
npm run dev

```

Add environment variable 
--

- Duplicate `.env.template` and rename it to `.env`
  - Replace values to the right of the equals
  - For TOKEN_SECRET, I recommend mashing your keyboard for a couple of seconds. Alternatively, you can let your cat play on your keybaord for a bit.
  - Use `3000` for PORT

Testing (w/o client)
--
1. Start up the server (see run commands above)
2. Use Postman to hit the URL you want to hit. 
    - Example: GET request to `http://localhost:3000`


Testing (w/ client)
--

1. Start up the server (see run commands above)
2. Start up live-server extension 
3. Try Signing up and then logging in. Check console in browser for logs. 
    - Shortcut: `Ctrl + Shift + J` or `Ctrl Option J` on Mac.

Custom Config (optional) 
--
- I use ESLint and Prettier (VSCode extensions) for my default formattor. The `.eslintrc.json` file contains my custom rules for both on js files. 
- As I keep autosave on, I setup custom keybaord shortcut to auto fix all javascript issues with `eslint fix all auto-fixable problems` in keyboard shortcuts.
- Deleting the .eslint.json file will turn it off. You can uninstall/install the dependencies needed for the rules if you are having issues.
```bash
# Uninstall ESLint Dev Dependencies
npm remove config-airbnb babel-eslint eslint eslint-config-prettier eslint-config-airbnb eslint-plugin-html eslint-plugin-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react prettier eslint-plugin-react-hooks
# Install ESLint Dev Dependencies
npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node; npx install-peerdeps --dev eslint-config-airbnb
```
