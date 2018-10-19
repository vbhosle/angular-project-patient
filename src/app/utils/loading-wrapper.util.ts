import { Observable, of, Subject } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';

export class LoadingWrapper<T> {
  private readonly _errorLoading$ = new Subject<string>();
  readonly errorLoading$: Observable<String> = this._errorLoading$.pipe(
    shareReplay(1)
  );
  readonly data$: Observable<T>;

  constructor(data: Observable<T>) {
    this.data$ = data.pipe(
      shareReplay<T>(1),
      catchError(error => {
        console.log(error);
        if(error instanceof HttpErrorResponse){
            this._errorLoading$.next((<HttpErrorResponse>error).error.message);
        }
        else{
            this._errorLoading$.next('Something went wrong');
        }
        return of<T>();
      })
    );
  }

}
