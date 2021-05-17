#!/bin/bash

#rsync -avz --delete public/ jgosmann@hyper-world.de:~/adventures
npx netlify deploy --prod -d public/
ssh jgosmann@hyper-world.de passenger-config restart-app /var/customers/webs/jgosmann/adventures-search
