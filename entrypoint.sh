#!/bin/sh
set -e

printenv | grep NEXT_PUBLIC_ | while read -r line ; do
  key=$(echo $line | cut -d "=" -f1)
  value=$(echo $line | cut -d "=" -f2)

  find /opt/app/.next/ -type f -exec sed -i "s|$key|$value|g" {} \;
done

exec "$@"
