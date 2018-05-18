# asch-redeploy
A hassle-free local asch environment

# Install
```
npm install -g asch-redeploy
```

# Usage
```
git clone https://github.com/aschplatform/asch-dapp-helloworld
cd asch-dapp-helloworld

# watch for changes
asch-redeploy .
```


# TODO
* Only watch on some folders and filetypes
* retry when not enough money
* Integrate chalk package for colorful console-output
* Do I need to create a softlink in asch/public/dapps? (I think the asch-binaries should be built before)
    * Softlink in /home/ma/asch/public/dist/dapps/a7ef9cd0707fe94f583334d434e39570113a43e3647c8ee730bf21ec2fe08c97
    * points to /home/ma/asch/dapps/a7ef9cd0707fe94f583334d434e39570113a43e3647c8ee730bf21ec2fe08c97/public
  