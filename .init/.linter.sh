#!/bin/bash
cd /home/kavia/workspace/code-generation/niceplay-tic-tac-toe-244792-244806/niceplay_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

