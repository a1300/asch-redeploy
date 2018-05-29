# asch-redeploy
A hassle-free local asch environment

# Install
```bash
git clone https://github.com/a1300/asch-redeploy

# use asch-redeploy as a global package
cd asch-redeploy
npm install
npm link # important
```

# Usage
```bash
# clone a dapp repository
git clone https://github.com/aschplatform/asch-dapp-helloworld
cd asch-dapp-helloworld

# watch for changes
asch-redeploy .
```

# Folder Structure
Your work directory should have the following structure
```
/home/user
└───────asch
        └───app.js
        └───aschd
└───────asch-dapp-helloworld
        └───(run asch-redeploy here)
└───────asch-redeploy
```
