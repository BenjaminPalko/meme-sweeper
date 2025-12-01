# Mine Sweeper

This is a fun implementation of the classic 'mine sweeper' game, built using Django and React.

## Setup

Requirements are that you have [MISE-EN-PLACE](https://mise.jdx.dev/) installed. That's it.

1. `mise install` - Install tools
2. `mise t r client:install && mise t r server:install` - Install dependencies
3. `$(poetry --project=server env activate)` - Use python virtual env (execute this on every new terminal instance)
4. `cd` to the server directory to run server commands, `python manage.py makemigrations`, `python manage.py migrate`, `python manage.py runserver` (python doesn't seem to like mise tasks here)
5. Run client in its own terminal `mise t r client:dev`
