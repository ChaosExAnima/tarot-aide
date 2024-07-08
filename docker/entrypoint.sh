#! /bin/sh

# From: https://github.com/c7ks7s/docker-entrypoint/blob/develop/entrypoint.sh
getSecrets() {
  for env_var in $(printenv | cut -f1 -d"=" | grep _FILE)
  do
    name="$env_var"
    eval value=\$$name

    if [ -f "$value" ]; then
      value=$(cat "${value}")
      export "${name%_FILE}"="$value"
      unset $name
    fi
  done
}

getSecrets

npx prisma db push --skip-generate

node server.js
