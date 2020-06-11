#!/bin/bash

rsync -avz --delete --checksum public/ jgosmann@hyper-world.de:~/adventures
ssh jgosmann@hyper-world.de passenger-config restart-app /var/customers/webs/jgosmann/adventures-search
