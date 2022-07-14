para generar reporte de coverage solamente tienes que usar estos comandos

> to test -coverprofile coverage.out
> go tool cover -html coverage.out

To create cpu profile and evaluate the performance you can use the next commands

> go test -cpuprofile cpu.out
> go tool pprof cpu.out
