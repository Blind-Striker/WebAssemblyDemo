//Fibonacci Series using Recursion
#include <stdio.h>
#include <emscripten/emscripten.h>

int EMSCRIPTEN_KEEPALIVE fib(int n)
{
   if (n <= 1)
      return n;
   return fib(n-1) + fib(n-2);
}
 
int main ()
{
  int n = 9;
  printf("%d", fib(2));
  
  emscripten_exit_with_live_runtime();
  
  return 0;
}