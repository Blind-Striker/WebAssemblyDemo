(module
  (type $t0 (func (param i32) (result i32)))
  (type $t1 (func))
  (import "env" "memoryBase" (global $g0 i32))
  (import "env" "memory" (memory $M0 256))
  (import "env" "table" (table $T0 0 anyfunc))
  (import "env" "tableBase" (global $g1 i32))
  (func $f0 (type $t0) (param $p0 i32) (result i32)
    (local $l0 i32)
    get_local $p0
    set_local $l0
    i32.const 1
    set_local $p0
    loop $L0
      get_local $l0
      if $I1
        get_local $l0
        get_local $p0
        i32.mul
        set_local $p0
        get_local $l0
        i32.const -1
        i32.add
        set_local $l0
        br $L0
      end
    end
    get_local $p0)
  (func $f1 (type $t1)
    nop)
  (func $f2 (type $t1)
    get_global $g0
    set_global $g2
    get_global $g2
    i32.const 5242880
    i32.add
    set_global $g3
    call $f1)
  (global $g2 (mut i32) (i32.const 0))
  (global $g3 (mut i32) (i32.const 0))
  (export "__post_instantiate" (func $f2))
  (export "_factorial" (func $f0))
  (export "runPostSets" (func $f1)))
