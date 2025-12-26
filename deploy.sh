#!/bin/bash

npx netlify deploy --prod -d public/
ssh jgosmann@jgosmann.de sudo systemctl restart adventures-search
