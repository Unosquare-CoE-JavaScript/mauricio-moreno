;; This synthax is similar to clojure or another lisps languages
;; Indeed they use the same commenting style with semicolons
(module
	(func $add (param $a i32) (param $b i32) (result i32)
		local.get $a
		local.get $b
		i32.add)
	(export "add" (func $add))
)
