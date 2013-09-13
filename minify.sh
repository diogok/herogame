#!/bin/bash

for f in $(ls js/*.js); do
    curl -s -d compilation_level=SIMPLE_OPTIMIZATIONS  -d output_format=text -d output_info=compiled_code --data-urlencode "js_code@$f" http://closure-compiler.appspot.com/compile > "target/$f"
done

