#!/bin/bash

rsync -avz --delete --checksum public/ jgosmann@hyper-world.de:~/adventures
