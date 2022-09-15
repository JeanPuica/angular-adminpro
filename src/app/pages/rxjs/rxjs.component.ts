import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  intervalSubs: Subscription;

  constructor() {
    // this.retornaObservable()
    //   .pipe(retry(1))
    //   .subscribe({
    //     next: (valor) => console.log('Subs:', valor),
    //     error: (err) => console.warn('Error:', err),
    //     complete: () => console.info('Obs terminado'),
    //   });

    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);
  }
  
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    // El orden en los pipes es importante
    return interval(500).pipe(
      // take(10),
      map((valor) => valor + 1),
      filter((valor) => valor % 2 === 0)
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          // Se cancela automaticamente
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });
  }
}
