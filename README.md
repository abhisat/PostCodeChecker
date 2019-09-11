# Post Code Checker

Post Code Checker is a react app for checking whether an entered address is a valid Australian address.

## Installation and Usage

After cloning the repository with:

```bash
git clone https://github.com/abhisat/PostCodeChecker.git
```

### With Docker:

Step 1: Install Docker

Link to install Docker: https://docs.docker.com/docker-for-mac/install/

Step 2: Install Yarn

```bash
brew install yarn
```

Step 3: Add the .env file attached in the email inside the client folder.
(Please rename the file to .env if the dot has disappeared due to the email.)

Step 4: Build

```bash
yarn build
```

Step 4: Run

```bash
yarn dev
```

Step 5: Open chrome in CORS mode:

(To open chrome in CORS mode: https://alfilatov.com/posts/run-chrome-without-cors/)

The app should be accessible on 0.0.0.0:3001

### With Web-pack Dev-Server:

Step 1: Install Yarn

```bash
brew install yarn
```

Step 2: cd into client dir

```bash
cd client
```
Step 3: Run

```bash
yarn install
```
Step 4: Add the .env file attached in the email inside the client folder.

Step 5: Run

```bash
yarn start
```
Step: 6: Open chrome in CORS mode:

(To open chrome in CORS mode: https://alfilatov.com/posts/run-chrome-without-cors/)

The app should be accessible on localhost:3000


## Tests

To run tests: Run 
```bash
yarn test
```
from the root or /client dir.


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)