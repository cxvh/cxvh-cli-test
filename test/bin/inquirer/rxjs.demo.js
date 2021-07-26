const { range } = require('rxjs');
const { map, filter } = require('rxjs/operators');

// range(1, 200)
//     .pipe(
//         filter(x => x % 2 === 1),
//         map(x => x + x)
//     )
//     .subscribe(x => console.log(x));

const pipe=range(1, 200)
    .pipe(
        filter(x => x % 2 === 1),
        map(x => x + x),
        filter(x => x % 3 === 0),
        filter(x => x % 5 === 0),
        filter(x => x % 9 === 0)
    )
pipe.subscribe(x => console.log('log1:',x));
pipe.subscribe(x => console.log('log2:',x*100));