#!/bin/bash

rsync -a --exclude "node_modules" . root@node.pymnts.com:/home/adobe-api/