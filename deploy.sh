#!/bin/bash

#rsync -avz --delete public/ jgosmann@hyper-world.de:~/adventures
netlify deploy --prod
ssh jgosmann@hyper-world.de passenger-config restart-app /var/customers/webs/jgosmann/adventures-search
