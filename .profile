# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
# see /usr/share/doc/bash/examples/startup-files for examples.
# the files are located in the bash-doc package.

# the default umask is set in /etc/profile; for setting the umask
# for ssh logins, install and configure the libpam-umask package.
#umask 022

# if running bash
if [ -n "$BASH_VERSION" ]; then
    # include .bashrc if it exists
    if [ -f "$HOME/.bashrc" ]; then
	. "$HOME/.bashrc"
    fi
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi

export NVM_DIR="/home/ubuntu/.nvm"
[ "$BASH_VERSION" ] && npm() { if [ "$*" == "config get prefix" ]; then which node | sed "s/bin\/node//"; else $(which npm) "$@"; fi } # hack: avoid slow npm sanity check in nvm
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
unset npm # end hack
[ "$BASH_VERSION" ] && npm() { if [ "$*" == "config get prefix" ]; then which node | sed "s/bin\/node//"; else $(which npm) "$@"; fi } # hack: avoid slow npm sanity check in nvm
[ -s "/home/ubuntu/.nvm/nvm.sh" ] && . "/home/ubuntu/.nvm/nvm.sh" # This loads nvm
unset npm # end hack
