call emcc -Oz .\public\native\fibonacci.c -s WASM=1 -s SIDE_MODULE=1 -o .\public\wasm\fibonacci.wasm
call emcc -Oz .\public\native\factorial.c -s WASM=1 -s SIDE_MODULE=1 -o .\public\wasm\factorial.wasm
call node towast.js