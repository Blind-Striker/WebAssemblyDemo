call emcc -Oz .\native\fibonacci.c -s WASM=1 -s SIDE_MODULE=1 -o .\public\fibonacci.wasm
call emcc -Oz .\native\factorial.c -s WASM=1 -s SIDE_MODULE=1 -o .\public\factorial.wasm
call node towast.js