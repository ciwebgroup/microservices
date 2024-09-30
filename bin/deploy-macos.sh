#!/bin/zsh

rsync -rtzv  --exclude=.git --exclude=.env --exclude=.gitignore --exclude=bin --exclude=.pnpm-store --exclude=dist --exclude=node_modules ./ root@sitemaps.vcsr.ai:/var/opt/wf.vcsr.ai/