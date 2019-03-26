import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { IonRating } from './ion-rating/ion-rating';
@NgModule({
	declarations: [IonRating],
	imports: [IonicModule],
	exports: [IonRating]
})
export class ComponentsModule {}
