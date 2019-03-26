import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MyprojectProvider } from './../../providers/myproject/myproject';
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'ion-rating',
  templateUrl: 'ion-rating.html'
})
export class IonRating {

  @Input() numStars: number = 5;
  @Input() valor: number = 0;
  @Input() Reading: boolean = false;

  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();
  stars: string[] = [];
  item:any;
  rankingprojects: any;
  ratingprojects: any = {};
  ratingvalue:number;
  readingvalue:boolean;

  constructor(private myprojectProvider: MyprojectProvider,public navParams: NavParams) {
    this.item = this.navParams.data.projects || {};

    const subscriberanking = this.myprojectProvider.getRankingProject(this.item.key).subscribe((rankingData:any) => {
      subscriberanking.unsubscribe();
      this.rankingprojects = rankingData;

          const subscriberating = this.myprojectProvider.getRatingProject(this.item.key).subscribe((ratingData:any) => {
            subscriberating.unsubscribe();
            this.ratingprojects = ratingData;
            if (this.ratingprojects.key == null){
              this.ratingvalue = 0;
              this.readingvalue= false;
            } else {
              this.ratingvalue = parseInt(this.ratingprojects.value);
              this.readingvalue = true;
            }
            this.calc();
          });
    });

  }

  ngAfterViewInit() {
    this.calc();
  }

  calc(){
    this.stars = [];
    let tmp = this.ratingvalue;
    for(let i=0; i < this.numStars; i++, tmp--){
      if(tmp >= 1){
        this.stars.push("star");
      } else if(tmp > 0 && tmp < 1){
        this.stars.push("star-half");
      } else this.stars.push("star-outline");
    }
  }

  starClicked(index){
    if (!this.Reading){
      this.ratingvalue = index + 1;
      this.ionClick.emit(this.ratingvalue);
      this.calc();
    }
  }
}
