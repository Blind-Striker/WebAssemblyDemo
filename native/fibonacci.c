//Fibonacci Series using Recursion
#include <stdio.h>
//#include <emscripten/emscripten.h>

int fib(int n)
{
   if (n <= 1)
      return n;
   return fib(n-1) + fib(n-2);
}