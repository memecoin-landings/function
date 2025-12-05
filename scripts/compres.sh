#!/bin/bash

find ../out -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" \) -exec gzip -k -9 {} \; -exec brotli -k -Z {} \;
