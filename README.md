# About The Project

This code can mimic a linux and windows terminal in discord channel. Can be used to control and access server when you are feeling lazy.<br>
I recommend not to add the console channel to any public server you have i.e unknown admins, anyhow this is secure and only owner and coowners can only access the terminal. Also be aware of the Better Discord's "ShowHiddenChannels" mod.

## How It's Build

Very simple, it's built using javascript's inbuilt childprocess, which can be used to run any OS command using the programming language. This code can run almost in all servers! (Win10, Win11, Ubuntu, Kali Linux, also MacOS if you have).

## Get Started

Here are the list of commands before you get started.

```sh
npm install
npm --no-warnings index.js
```

Note that you need node.js version 16+

```sh
curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh
bash install_nvm.sh
source ~/.bash_profile # or manually restart terminal
nvm install --lts
node --version
which node # note down the path
```

Here is how you automatically run after server restart (Only Linux)

```sh
cd Console # your file directory
mkdir logs
cd /etc/systemd/system
sudo nano discordconsole.service
```

Copy and paste the following <br>
Here "UserName" means your Linux username

```sh
[Unit]
Description=Mod-Phase
After=network.target

[Service]
CPUQuota=70%
CPUQuotaPeriodSec=1ms
Type=simple
Restart=always
RestartSec=60
RemainAfterExit=true
#KillMode=process
WorkingDirectory=/home/UserName/Console
# Replace your node directory which you've copied above
ExecStart=/home/UserName/.config/nvm/versions/node/v18.8.0/bin/node --no-warnings /home/UserName/Console/index.js
User=root # if not required, replace your username here
StandardOutput=append:/home/UserName/Console/logs/std.log
StandardError=append:/home/UserName/Console/logs/err.log

[Install]
WantedBy=multi-user.target
```

Then save the file "Ctrl + X" and Press "Enter".

```sh
sudo systemctl enable discordconsole
sudo systemctl start discordconsole
sudo systemctl status discordconsole # This will allow to check your bot is running or not
```

Congratulations you've completed the tutorial!

<p align="right">(<a href="#readme-top">Back To Top</a>)</p>
