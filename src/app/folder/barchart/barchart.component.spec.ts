import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarchartComponent } from './barchart.component';

describe('BarchartComponent', () => {
  let component: BarchartComponent;
  let fixture: ComponentFixture<BarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarchartComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
