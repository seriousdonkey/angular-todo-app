import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';
import { UiFacade } from '../../facade/ui.facade';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let uiFacade: UiFacade;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(async () => {
    uiFacade = {} as UiFacade;

    await TestBed.configureTestingModule({
      imports: [ContentComponent],
      providers: [{ provide: UiFacade, useValue: uiFacade }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
