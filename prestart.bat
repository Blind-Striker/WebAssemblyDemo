call  emcc -Oz .\native\fibonacci.c -s WASM=1 -s SIDE_MODULE=1 -o .\public\fibonacci.wasm
call node towast.js