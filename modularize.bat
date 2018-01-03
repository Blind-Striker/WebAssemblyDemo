call emcc .\public\native\fibonacci.c  -Os  -s WASM=1  -s MODULARIZE=1 -s DEMANGLE_SUPPORT=1 -s "EXPORTED_FUNCTIONS=['_fib']"  -o .\public\wasm\fib.js
call emcc .\public\native\factorial.c  -Os  -s WASM=1  -s MODULARIZE=1 -s DEMANGLE_SUPPORT=1 -s "EXPORTED_FUNCTIONS=['_factorial']"  -o .\public\wasm\facto.js
call node towast.js