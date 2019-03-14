import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from 'projects/carousel/src/public_api';
import { Observable, interval } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { slider } from '../slide-animation';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
  animations: [slider]
})
export class CurrentComponent implements OnInit {
  @ViewChild('myCarousel')
  myCarousel: NguCarousel<any>;

  hideShow = true;
  imgags = Array(50)
    .fill('')
    .map(() =>
      randoms([
        'assets/bg.jpg',
        'assets/car.png',
        'assets/bg.jpg',
        'assets/canberra.jpg',
        'assets/car.png',
        'assets/holi.jpg',
        'assets/canberra.jpg',
        'assets/holi.jpg'
      ])
    );
  dataCounts = [1, 2, 3, 4, 5, 6, 7, 8];
  public carouselTileItems: Array<any> = [0, 1, 2, 3, 4, 5];
  public carouselTiles = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
  };
  public carouselTile: NguCarouselConfig = {
    grid: { size: 1, slide: 3 },
    speed: 350,
    interval: {
      timing: 3000,
      initialDelay: 1000
    },
    point: {
      visible: true
    },
    load: 2,
    velocity: 0,
    loop: true,
    touch: true,
    animation: 'lazy',
    easing: '500ms cubic-bezier(0.35, 0, 0.25, 1)'
  };

  public carouselTileItems$: Observable<string[]>;
  public carouselTileConfig: NguCarouselConfig = {
    grid: { size: 5, offset: 0, type: 'responsive', slide: 2 },
    speed: 700,
    point: {
      visible: true,
      hideOnSingleSlide: true
    },
    touch: true,
    loop: true,
    load: 2,
    // interval: { timing: 850 },
    // vertical: { enabled: true, height: 200 },
    velocity: 0,
    animation: 'lazy',
    easing: 'cubic-bezier(0.35, 0, 0.25, 1)',
    RTL: false
  };
  tempData: any[];

  constructor(public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.tempData = [];
    this.carouselTileItems.forEach(el => {
      this.carouselTileLoad(el);
    });

    this.carouselTileItems$ = interval(100000).pipe(
      startWith(this.imgags),
      map(e => {
        return this.shuffle(this.imgags);
      })
    );
    // setTimeout(() => {
    //   for (let i = 0; i < 50; i++) {
    //     setTimeout(() => {
    //       this.hideShow = !this.hideShow;
    //     }, i * 50);
    //   }
    // }, 1000);
    // this.myCarousel.
    // this.carouselTileItems$ = interval(3000).pipe(
    //   startWith(-1),
    //   take(3),
    //   map(val => {
    //     console.log(val);
    //     const data = (this.tempData = [...this.tempData, this.imgags[val]]);
    //     return data;
    //   })
    // );
  }

  // switchMap(val => {
  //   const data =
  //     val >= 5
  //       ? this.shuffle(this.tempData)
  //       : (this.tempData = [
  //           ...this.tempData,
  //           this.imgags[Math.floor(Math.random() * this.imgags.length)]
  //         ]);
  //   return of(data);
  // })

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  changeGridConfig() {
    this.myCarousel.changeGridConfig(this.carouselTileConfig.grid);
  }

  public carouselTileLoad(j) {
    // console.log(this.carouselTiles[j]);
    const len = this.carouselTiles[j].length;
    if (len <= 30) {
      for (let i = len; i < len + 100; i++) {
        this.carouselTiles[j].push(this.imgags[Math.floor(Math.random() * this.imgags.length)]);
      }
    }
  }

  loadCarousel(carousel) {
    // console.log('loadCalled');
    const len = carousel.length;
    if (len <= 30) {
      for (let i = len; i < len + 4; i++) {
        carousel.push(this.imgags[Math.floor(Math.random() * this.imgags.length)]);
      }
    }
  }

  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  touch(arr) {
    this.myCarousel[arr ? 'enableTouch' : 'disableTouch']();
  }
}

function randoms(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}