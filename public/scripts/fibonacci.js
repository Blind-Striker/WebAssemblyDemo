function jsFib(n) {
    if (n === 1) return 1;
    if (n === 2) return 1;
    return jsFib(n - 1) + jsFib(n - 2);
}