import {
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { ObserverSpy } from '@hirez_io/observer-spy';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

export function expectAction(
  obs: Observable<Action>,
  action: Action,
  expectedAction: Action,
  actionSetter: (actions$: Actions) => void
): void {
  expectActions(
    obs,
    'a',
    { a: action },
    'a',
    { a: expectedAction },
    actionSetter
  );
}

export function expectActions(
  obs: Observable<Action>,
  marbles: string,
  actions: { [index: string]: Action },
  expectedMarbles: string,
  expectedActions: { [index: string]: Action },
  actionSetter: (actions$: Actions) => void
): void {
  getTestScheduler().run(({ expectObservable, hot }) => {
    actionSetter(hot(marbles, actions));
    expectObservable(obs).toBe(expectedMarbles, expectedActions);
  });
}

export function expectLastValue<T>(
  obs: Observable<T>,
  expectedValue: T | jasmine.AsymmetricMatcher<any>
): void {
  expectObservable(obs, 'a', { a: expectedValue });
}

export function expectNoAction(
  obs: Observable<Action>,
  action: Action,
  actionSetter: (actions$: Actions) => void
): void {
  expectActions(obs, 'a', { a: action }, '', {}, actionSetter);
}

export function expectObservable<T>(
  obs: Observable<T>,
  marbles: string,
  expected?: { [index: string]: T },
  errorValue?: unknown
): void {
  getTestScheduler().run(({ expectObservable: expectObs }) =>
    expectObs(obs).toBe(marbles, expected, errorValue)
  );
}

export function expectStream<T>(
  obs: Observable<T>,
  stream: (T | jasmine.AsymmetricMatcher<any>)[],
  testActions: () => void
): void {
  const spy = new ObserverSpy<T>();
  obs.subscribe(spy);

  testActions();

  expect(spy.getValues()).toEqual(stream);
}

export function flushDeleteUrl(
  httpMock: HttpTestingController,
  url: string,
  response: Response
) {
  return flushUrl(httpMock, url, 'DELETE', response);
}

export function flushGetUrl(
  httpMock: HttpTestingController,
  url: string,
  response: Response
) {
  return flushUrl(httpMock, url, 'GET', response);
}

export function flushPostUrl(
  httpMock: HttpTestingController,
  url: string,
  response: Response,
  expectedBody?: unknown
): TestRequest {
  return flushUrl(httpMock, url, 'POST', response, expectedBody);
}

export function flushPutUrl(
  httpMock: HttpTestingController,
  url: string,
  response: Response,
  expectedBody?: unknown
): TestRequest {
  return flushUrl(httpMock, url, 'PUT', response, expectedBody);
}

function flushUrl(
  httpMock: HttpTestingController,
  url: string,
  method: string,
  response: Response,
  expectedBody?: unknown
) {
  const request = httpMock.expectOne({ method, url });

  if (expectedBody) {
    expect(request.request.body).toEqual(expectedBody);
  }

  request.flush(response);

  return request;
}

export function getTestScheduler(): TestScheduler {
  return new TestScheduler((actual, expected) =>
    expect(actual).toEqual(expected)
  );
}

export type Response =
  | string
  | number
  | boolean
  | Object
  | ArrayBuffer
  | Blob
  | (string | number | boolean | Object | null);
