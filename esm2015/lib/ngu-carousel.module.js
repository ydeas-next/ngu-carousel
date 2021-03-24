import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NguCarouselDefDirective, NguCarouselItemDirective, NguCarouselNextDirective, NguCarouselOutlet, NguCarouselPointDirective, NguCarouselPrevDirective } from './ngu-carousel.directive';
import { NguCarousel } from './ngu-carousel/ngu-carousel.component';
import { NguItemComponent } from './ngu-item/ngu-item.component';
import { NguTileComponent } from './ngu-tile/ngu-tile.component';
export class NguCarouselModule {
}
NguCarouselModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [
                    NguCarousel,
                    NguItemComponent,
                    NguTileComponent,
                    NguCarouselPointDirective,
                    NguCarouselItemDirective,
                    NguCarouselNextDirective,
                    NguCarouselPrevDirective,
                    NguCarouselDefDirective,
                    NguCarouselOutlet
                ],
                declarations: [
                    NguCarousel,
                    NguItemComponent,
                    NguTileComponent,
                    NguCarouselPointDirective,
                    NguCarouselItemDirective,
                    NguCarouselNextDirective,
                    NguCarouselPrevDirective,
                    NguCarouselDefDirective,
                    NguCarouselOutlet
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1LWNhcm91c2VsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25ndS1jYXJvdXNlbC9zcmMvbGliL25ndS1jYXJvdXNlbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNMLHVCQUF1QixFQUN2Qix3QkFBd0IsRUFDeEIsd0JBQXdCLEVBQ3hCLGlCQUFpQixFQUNqQix5QkFBeUIsRUFDekIsd0JBQXdCLEVBQ3pCLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBMkJqRSxNQUFNLE9BQU8saUJBQWlCOzs7WUF6QjdCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRTtvQkFDUCxXQUFXO29CQUNYLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQix5QkFBeUI7b0JBQ3pCLHdCQUF3QjtvQkFDeEIsd0JBQXdCO29CQUN4Qix3QkFBd0I7b0JBQ3hCLHVCQUF1QjtvQkFDdkIsaUJBQWlCO2lCQUNsQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osV0FBVztvQkFDWCxnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIseUJBQXlCO29CQUN6Qix3QkFBd0I7b0JBQ3hCLHdCQUF3QjtvQkFDeEIsd0JBQXdCO29CQUN4Qix1QkFBdUI7b0JBQ3ZCLGlCQUFpQjtpQkFDbEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTmd1Q2Fyb3VzZWxEZWZEaXJlY3RpdmUsXG4gIE5ndUNhcm91c2VsSXRlbURpcmVjdGl2ZSxcbiAgTmd1Q2Fyb3VzZWxOZXh0RGlyZWN0aXZlLFxuICBOZ3VDYXJvdXNlbE91dGxldCxcbiAgTmd1Q2Fyb3VzZWxQb2ludERpcmVjdGl2ZSxcbiAgTmd1Q2Fyb3VzZWxQcmV2RGlyZWN0aXZlXG59IGZyb20gJy4vbmd1LWNhcm91c2VsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOZ3VDYXJvdXNlbCB9IGZyb20gJy4vbmd1LWNhcm91c2VsL25ndS1jYXJvdXNlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmd1SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbmd1LWl0ZW0vbmd1LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE5ndVRpbGVDb21wb25lbnQgfSBmcm9tICcuL25ndS10aWxlL25ndS10aWxlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTmd1Q2Fyb3VzZWwsXG4gICAgTmd1SXRlbUNvbXBvbmVudCxcbiAgICBOZ3VUaWxlQ29tcG9uZW50LFxuICAgIE5ndUNhcm91c2VsUG9pbnREaXJlY3RpdmUsXG4gICAgTmd1Q2Fyb3VzZWxJdGVtRGlyZWN0aXZlLFxuICAgIE5ndUNhcm91c2VsTmV4dERpcmVjdGl2ZSxcbiAgICBOZ3VDYXJvdXNlbFByZXZEaXJlY3RpdmUsXG4gICAgTmd1Q2Fyb3VzZWxEZWZEaXJlY3RpdmUsXG4gICAgTmd1Q2Fyb3VzZWxPdXRsZXRcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd1Q2Fyb3VzZWwsXG4gICAgTmd1SXRlbUNvbXBvbmVudCxcbiAgICBOZ3VUaWxlQ29tcG9uZW50LFxuICAgIE5ndUNhcm91c2VsUG9pbnREaXJlY3RpdmUsXG4gICAgTmd1Q2Fyb3VzZWxJdGVtRGlyZWN0aXZlLFxuICAgIE5ndUNhcm91c2VsTmV4dERpcmVjdGl2ZSxcbiAgICBOZ3VDYXJvdXNlbFByZXZEaXJlY3RpdmUsXG4gICAgTmd1Q2Fyb3VzZWxEZWZEaXJlY3RpdmUsXG4gICAgTmd1Q2Fyb3VzZWxPdXRsZXRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3VDYXJvdXNlbE1vZHVsZSB7IH1cbiJdfQ==