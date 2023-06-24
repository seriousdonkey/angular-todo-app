import { TestBed } from '@angular/core/testing';
import { UiFacade } from './ui.facade';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';

describe('UiFacade', () => {
  let facade: UiFacade;
  let store: MockStore;

  const initialState = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiFacade, provideMockStore({ initialState })],
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(UiFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should create the mockstore', () => {
    expect(store).toBeTruthy();
  });

  it('should dispatch startLoading action', () => {
    const expected = cold('a', {
      a: { type: '[UI] Start Loading' },
    });

    facade.startLoading();

    expect(store.scannedActions$).toBeObservable(expected);
  });

  it('should dispatch stopLoading action', () => {
    const expected = cold('a', {
      a: { type: '[UI] Stop Loading' },
    });

    facade.stopLoading();

    expect(store.scannedActions$).toBeObservable(expected);
  });
});
