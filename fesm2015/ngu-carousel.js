import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Directive, TemplateRef, ViewContainerRef, EventEmitter, isDevMode, Component, ChangeDetectionStrategy, ElementRef, Renderer2, IterableDiffers, Inject, PLATFORM_ID, ChangeDetectorRef, Input, Output, ContentChildren, ViewChild, ContentChild, HostBinding, NgModule } from '@angular/core';
import { Subject, Observable, of, fromEvent, interval, merge, EMPTY } from 'rxjs';
import { takeUntil, mapTo, startWith, switchMap } from 'rxjs/operators';

class NguCarouselStore {
    constructor(touch = new Touch(), vertical = new Vertical(), interval, transform = new Transfrom(), button, visibleItems, deviceType, type = 'fixed', token = '', items = 0, load = 0, deviceWidth = 0, carouselWidth = 0, itemWidth = 0, slideItems = 0, itemWidthPer = 0, itemLength = 0, currentSlide = 0, easing = 'cubic-bezier(0, 0, 0.2, 1)', speed = 200, loop = false, dexVal = 0, touchTransform = 0, isEnd = false, isFirst = true, isLast = false, RTL = false, point = true, velocity = 1) {
        this.touch = touch;
        this.vertical = vertical;
        this.interval = interval;
        this.transform = transform;
        this.button = button;
        this.visibleItems = visibleItems;
        this.deviceType = deviceType;
        this.type = type;
        this.token = token;
        this.items = items;
        this.load = load;
        this.deviceWidth = deviceWidth;
        this.carouselWidth = carouselWidth;
        this.itemWidth = itemWidth;
        this.slideItems = slideItems;
        this.itemWidthPer = itemWidthPer;
        this.itemLength = itemLength;
        this.currentSlide = currentSlide;
        this.easing = easing;
        this.speed = speed;
        this.loop = loop;
        this.dexVal = dexVal;
        this.touchTransform = touchTransform;
        this.isEnd = isEnd;
        this.isFirst = isFirst;
        this.isLast = isLast;
        this.RTL = RTL;
        this.point = point;
        this.velocity = velocity;
    }
}
class ItemsControl {
}
class Vertical {
}
class NguButton {
}
class Touch {
}
class Transfrom {
    constructor(xs = 0, sm = 0, md = 0, lg = 0, all = 0) {
        this.xs = xs;
        this.sm = sm;
        this.md = md;
        this.lg = lg;
        this.all = all;
        this.xl = 0;
    }
}
/**
 * Default values
 * {sm: 768, md: 992, lg: 1200, xl: 1200}
 *
 * Bootstrap values:
 * {sm: 576, md: 768, lg: 992, xl: 1200}
 */
class Breakpoints {
    constructor(sm = 768, md = 992, lg = 1200, xl = 1200) {
        this.sm = sm;
        this.md = md;
        this.lg = lg;
        this.xl = xl;
    }
}
class NguCarouselConfig {
}
class NguCarouselOutletContext {
    constructor(data) {
        this.$implicit = data;
    }
}

class NguCarouselItemDirective {
}
NguCarouselItemDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[NguCarouselItem]'
            },] }
];
class NguCarouselNextDirective {
}
NguCarouselNextDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[NguCarouselNext]'
            },] }
];
class NguCarouselPrevDirective {
}
NguCarouselPrevDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[NguCarouselPrev]'
            },] }
];
class NguCarouselPointDirective {
}
NguCarouselPointDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[NguCarouselPoint]'
            },] }
];
class NguCarouselDefDirective {
    constructor(template) {
        this.template = template;
    }
}
NguCarouselDefDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[nguCarouselDef]'
            },] }
];
NguCarouselDefDirective.ctorParameters = () => [
    { type: TemplateRef }
];
// tslint:disable-next-line:directive-class-suffix
class NguCarouselOutlet {
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
    }
}
NguCarouselOutlet.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[nguCarouselOutlet]'
            },] }
];
NguCarouselOutlet.ctorParameters = () => [
    { type: ViewContainerRef }
];

// @dynamic
// @dynamic
// tslint:disable-next-line:component-class-suffix
class NguCarousel extends NguCarouselStore {
    constructor(_el, _renderer, _differs, platformId, cdr) {
        super();
        this._el = _el;
        this._renderer = _renderer;
        this._differs = _differs;
        this.platformId = platformId;
        this.cdr = cdr;
        this.withAnim = true;
        this.isHovered = false;
        this.carouselLoad = new EventEmitter();
        // tslint:disable-next-line:no-output-on-prefix
        this.onMove = new EventEmitter();
        this._intervalController$ = new Subject();
        this.pointNumbers = [];
    }
    get dataSource() {
        return this._dataSource;
    }
    set dataSource(data) {
        if (data) {
            this._switchDataSource(data);
        }
    }
    /** The setter is used to catch the button if the button has ngIf
     * issue id #91
     */
    set nextBtn(btn) {
        this.listener2 && this.listener2();
        if (btn) {
            this.listener2 = this._renderer.listen(btn.nativeElement, 'click', () => this._carouselScrollOne(1));
        }
    }
    /** The setter is used to catch the button if the button has ngIf
     * issue id #91
     */
    set prevBtn(btn) {
        this.listener1 && this.listener1();
        if (btn) {
            this.listener1 = this._renderer.listen(btn.nativeElement, 'click', () => this._carouselScrollOne(0));
        }
    }
    /**
     * Tracking function that will be used to check the differences in data changes. Used similarly
     * to `ngFor` `trackBy` function. Optimize Items operations by identifying a Items based on its data
     * relative to the function to know if a Items should be added/removed/moved.
     * Accepts a function that takes two parameters, `index` and `item`.
     */
    get trackBy() {
        return this._trackByFn;
    }
    set trackBy(fn) {
        if (isDevMode() && fn != null && typeof fn !== 'function' && console && console.warn) {
            console.warn(`trackBy must be a function, but received ${JSON.stringify(fn)}.`);
        }
        this._trackByFn = fn;
    }
    ngOnInit() {
        this._dataDiffer = this._differs.find([]).create((_i, item) => {
            return this.trackBy ? this.trackBy(_i, item) : item;
        });
    }
    ngDoCheck() {
        this.arrayChanges = this._dataDiffer.diff(this.dataSource);
        if (this.arrayChanges && this._defDirec) {
            this._observeRenderChanges();
        }
    }
    _switchDataSource(dataSource) {
        this._dataSource = dataSource;
        if (this._defDirec) {
            this._observeRenderChanges();
        }
    }
    _observeRenderChanges() {
        let dataStream;
        if (this._dataSource instanceof Observable) {
            dataStream = this._dataSource;
        }
        else if (Array.isArray(this._dataSource)) {
            dataStream = of(this._dataSource);
        }
        if (dataStream) {
            this._dataSubscription = dataStream
                .pipe(takeUntil(this._intervalController$))
                .subscribe(data => {
                this.renderNodeChanges(data);
                this.isLast = false;
            });
        }
    }
    renderNodeChanges(data, viewContainer = this._nodeOutlet.viewContainer) {
        if (!this.arrayChanges)
            return;
        this.arrayChanges.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
            const node = this._getNodeDef(data[currentIndex], currentIndex);
            if (item.previousIndex == null) {
                const context = new NguCarouselOutletContext(data[currentIndex]);
                context.index = currentIndex;
                viewContainer.createEmbeddedView(node.template, context, currentIndex);
            }
            else if (currentIndex == null) {
                viewContainer.remove(adjustedPreviousIndex);
            }
            else {
                const view = viewContainer.get(adjustedPreviousIndex);
                viewContainer.move(view, currentIndex);
            }
        });
        this._updateItemIndexContext();
        if (this.carousel) {
            this._storeCarouselData();
        }
    }
    /**
     * Updates the index-related context for each row to reflect any changes in the index of the rows,
     * e.g. first/last/even/odd.
     */
    _updateItemIndexContext() {
        const viewContainer = this._nodeOutlet.viewContainer;
        for (let renderIndex = 0, count = viewContainer.length; renderIndex < count; renderIndex++) {
            const viewRef = viewContainer.get(renderIndex);
            const context = viewRef.context;
            context.count = count;
            context.first = renderIndex === 0;
            context.last = renderIndex === count - 1;
            context.even = renderIndex % 2 === 0;
            context.odd = !context.even;
            context.index = renderIndex;
        }
    }
    _getNodeDef(data, i) {
        if (this._defDirec.length === 1) {
            return this._defDirec.first;
        }
        const nodeDef = this._defDirec.find(def => def.when && def.when(i, data)) || this._defaultNodeDef;
        return nodeDef;
    }
    ngAfterViewInit() {
        this.carousel = this._el.nativeElement;
        this._inputValidation();
        this.carouselCssNode = this._createStyleElem();
        if (isPlatformBrowser(this.platformId)) {
            this._carouselInterval();
            if (!this.vertical.enabled) {
                this._touch();
            }
            this.listener3 = this._renderer.listen('window', 'resize', event => {
                this._onResizing(event);
            });
            this._onWindowScrolling();
        }
    }
    ngAfterContentInit() {
        this._observeRenderChanges();
        this.cdr.markForCheck();
    }
    _inputValidation() {
        this.inputs.gridBreakpoints = this.inputs.gridBreakpoints ? this.inputs.gridBreakpoints : new Breakpoints();
        if (this.inputs.grid.xl === undefined) {
            this.inputs.grid.xl = this.inputs.grid.lg;
        }
        this.type = this.inputs.grid.all !== 0 ? 'fixed' : 'responsive';
        this.loop = this.inputs.loop || false;
        this.inputs.easing = this.inputs.easing || 'cubic-bezier(0, 0, 0.2, 1)';
        this.touch.active = this.inputs.touch || false;
        this.RTL = this.inputs.RTL ? true : false;
        this.interval = this.inputs.interval || null;
        this.velocity = typeof this.inputs.velocity === 'number' ? this.inputs.velocity : this.velocity;
        if (this.inputs.vertical && this.inputs.vertical.enabled) {
            this.vertical.enabled = this.inputs.vertical.enabled;
            this.vertical.height = this.inputs.vertical.height;
        }
        this.directionSym = this.RTL ? '' : '-';
        this.point =
            this.inputs.point && typeof this.inputs.point.visible !== 'undefined'
                ? this.inputs.point.visible
                : true;
        this._carouselSize();
    }
    ngOnDestroy() {
        this.carouselInt && this.carouselInt.unsubscribe();
        this._intervalController$.unsubscribe();
        this.carouselLoad.complete();
        this.onMove.complete();
        /** remove listeners */
        clearTimeout(this.onScrolling);
        for (let i = 1; i <= 4; i++) {
            const str = `listener${i}`;
            this[str] && this[str]();
        }
    }
    _onResizing(event) {
        clearTimeout(this.onResize);
        this.onResize = setTimeout(() => {
            if (this.deviceWidth !== event.target.outerWidth) {
                this._setStyle(this.nguItemsContainer.nativeElement, 'transition', ``);
                this._storeCarouselData();
            }
        }, 500);
    }
    /** Get Touch input */
    _touch() {
        if (this.inputs.touch) {
            import('hammerjs').then(() => {
                const hammertime = new Hammer(this.touchContainer.nativeElement);
                hammertime.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
                hammertime.on('panstart', (ev) => {
                    this.carouselWidth = this.nguItemsContainer.nativeElement.offsetWidth;
                    this.touchTransform = this.transform[this.deviceType];
                    this.dexVal = 0;
                    this._setStyle(this.nguItemsContainer.nativeElement, 'transition', '');
                });
                if (this.vertical.enabled) {
                    hammertime.on('panup', (ev) => {
                        this._touchHandling('panleft', ev);
                    });
                    hammertime.on('pandown', (ev) => {
                        this._touchHandling('panright', ev);
                    });
                }
                else {
                    hammertime.on('panleft', (ev) => {
                        this._touchHandling('panleft', ev);
                    });
                    hammertime.on('panright', (ev) => {
                        this._touchHandling('panright', ev);
                    });
                }
                hammertime.on('panend pancancel', (ev) => {
                    const delta = this.vertical.enabled ? ev.deltaY : ev.deltaX;
                    const velocity = Math.abs(ev.velocity) > Math.abs(ev.overallVelocity) ? ev.velocity : ev.overallVelocity;
                    if (Math.abs(delta + velocity / .7 * this.itemWidth / 2) > this.itemWidth / 2) {
                        this.touch.velocity = velocity;
                        let direc = 0;
                        if (!this.RTL) {
                            direc = delta > 0 ? 0 : 1;
                        }
                        else {
                            direc = delta > 0 ? 1 : 0;
                        }
                        this._carouselScrollOne(direc);
                    }
                    else {
                        this.dexVal = 0;
                        this._setStyle(this.nguItemsContainer.nativeElement, 'transition', 'transform 324ms cubic-bezier(0, 0, 0.2, 1)');
                        this._setStyle(this.nguItemsContainer.nativeElement, 'transform', '');
                    }
                });
                hammertime.on('hammer.input', ev => {
                    // allow nested touch events to no propagate, this may have other side affects but works for now.
                    // TODO: It is probably better to check the source element of the event and only apply the handle to the correct carousel
                    ev.srcEvent.stopPropagation();
                });
            });
        }
    }
    /** handle touch input */
    _touchHandling(e, ev) {
        // vertical touch events seem to cause to panstart event with an odd delta
        // and a center of {x:0,y:0} so this will ignore them
        if (ev.center.x === 0) {
            return;
        }
        ev = Math.abs(this.vertical.enabled ? ev.deltaY : ev.deltaX);
        let valt = ev - this.dexVal;
        valt =
            this.type === 'responsive'
                ? (Math.abs(ev - this.dexVal) /
                    (this.vertical.enabled ? this.vertical.height : this.carouselWidth)) *
                    100
                : valt;
        this.dexVal = ev;
        this.touch.swipe = e;
        this._setTouchTransfrom(e, valt);
        this._setTransformFromTouch();
    }
    _setTouchTransfrom(e, valt) {
        const condition = this.RTL ? 'panright' : 'panleft';
        this.touchTransform = e === condition ? valt + this.touchTransform : this.touchTransform - valt;
    }
    _setTransformFromTouch() {
        if (this.touchTransform < 0) {
            this.touchTransform = 0;
        }
        const type = this.type === 'responsive' ? '%' : 'px';
        this._setStyle(this.nguItemsContainer.nativeElement, 'transform', this.vertical.enabled
            ? `translate3d(0, ${this.directionSym}${this.touchTransform}${type}, 0)`
            : `translate3d(${this.directionSym}${this.touchTransform}${type}, 0, 0)`);
    }
    /** this fn used to disable the interval when it is not on the viewport */
    _onWindowScrolling() {
        const top = this.carousel.offsetTop;
        const scrollY = window.scrollY;
        const heightt = window.innerHeight;
        const carouselHeight = this.carousel.offsetHeight;
        const isCarouselOnScreen = top <= scrollY + heightt - carouselHeight / 4 && top + carouselHeight / 2 >= scrollY;
        if (isCarouselOnScreen) {
            this._intervalController$.next(1);
        }
        else {
            this._intervalController$.next(0);
        }
    }
    /** store data based on width of the screen for the carousel */
    _storeCarouselData() {
        const breakpoints = this.inputs.gridBreakpoints;
        this.deviceWidth = isPlatformBrowser(this.platformId) ? window.innerWidth : breakpoints.xl;
        this.carouselWidth = this.carouselMain1.nativeElement.offsetWidth;
        if (this.type === 'responsive') {
            this.deviceType =
                this.deviceWidth >= breakpoints.xl
                    ? 'xl'
                    : this.deviceWidth >= breakpoints.lg
                        ? 'lg'
                        : this.deviceWidth >= breakpoints.md
                            ? 'md'
                            : this.deviceWidth >= breakpoints.sm
                                ? 'sm'
                                : 'xs';
            this.items = this.inputs.grid[this.deviceType];
            this.itemWidth = this.carouselWidth / this.items;
        }
        else {
            this.items = Math.trunc(this.carouselWidth / this.inputs.grid.all);
            this.itemWidth = this.inputs.grid.all;
            this.deviceType = 'all';
        }
        this.slideItems = +(this.inputs.slide < this.items ? this.inputs.slide : this.items);
        this.load = this.inputs.load >= this.slideItems ? this.inputs.load : this.slideItems;
        this.speed = this.inputs.speed && this.inputs.speed > -1 ? this.inputs.speed : 400;
        this._carouselPoint();
    }
    /** Used to reset the carousel */
    reset(withOutAnimation) {
        withOutAnimation && (this.withAnim = false);
        this.carouselCssNode.innerHTML = '';
        this.moveTo(0);
        this._carouselPoint();
    }
    /** Init carousel point */
    _carouselPoint() {
        const Nos = this.dataSource.length - (this.items - this.slideItems);
        this.pointIndex = Math.ceil(Nos / this.slideItems);
        const pointers = [];
        if (this.pointIndex > 1 || !this.inputs.point.hideOnSingleSlide) {
            for (let i = 0; i < this.pointIndex; i++) {
                pointers.push(i);
            }
        }
        this.pointNumbers = pointers;
        this._carouselPointActiver();
        if (this.pointIndex <= 1) {
            this._btnBoolean(1, 1);
        }
        else {
            if (this.currentSlide === 0 && !this.loop) {
                this._btnBoolean(1, 0);
            }
            else {
                this._btnBoolean(0, 0);
            }
        }
    }
    /** change the active point in carousel */
    _carouselPointActiver() {
        const i = Math.ceil(this.currentSlide / this.slideItems);
        this.activePoint = i;
        this.cdr.markForCheck();
    }
    /** this function is used to scoll the carousel when point is clicked */
    moveTo(slide, withOutAnimation) {
        // slide = slide - 1;
        withOutAnimation && (this.withAnim = false);
        if (this.activePoint !== slide && slide < this.pointIndex) {
            let slideremains;
            const btns = this.currentSlide < slide ? 1 : 0;
            switch (slide) {
                case 0:
                    this._btnBoolean(1, 0);
                    slideremains = slide * this.slideItems;
                    break;
                case this.pointIndex - 1:
                    this._btnBoolean(0, 1);
                    slideremains = this.dataSource.length - this.items;
                    break;
                default:
                    this._btnBoolean(0, 0);
                    slideremains = slide * this.slideItems;
            }
            this._carouselScrollTwo(btns, slideremains, this.speed);
        }
    }
    /** set the style of the carousel based the inputs data */
    _carouselSize() {
        this.token = this._generateID();
        let dism = '';
        this.styleid = `.${this.token} > .ngucarousel > .ngu-touch-container > .ngucarousel-items`;
        if (this.inputs.custom === 'banner') {
            this._renderer.addClass(this.carousel, 'banner');
        }
        if (this.inputs.animation === 'lazy') {
            dism += `${this.styleid} > .item {transition: transform .6s ease;}`;
        }
        const breakpoints = this.inputs.gridBreakpoints;
        let itemStyle = '';
        if (this.vertical.enabled) {
            const itemWidthXS = `${this.styleid} > .item {height: ${this.vertical.height /
                +this.inputs.grid.xs}px}`;
            const itemWidthSM = `${this.styleid} > .item {height: ${this.vertical.height /
                +this.inputs.grid.sm}px}`;
            const itemWidthMD = `${this.styleid} > .item {height: ${this.vertical.height /
                +this.inputs.grid.md}px}`;
            const itemWidthLG = `${this.styleid} > .item {height: ${this.vertical.height /
                +this.inputs.grid.lg}px}`;
            const itemWidthXL = `${this.styleid} > .item {height: ${this.vertical.height /
                +this.inputs.grid.xl}px}`;
            itemStyle = `@media (max-width:${breakpoints.sm - 1}px){${itemWidthXS}}
                    @media (max-width:${breakpoints.sm}px){${itemWidthSM}}
                    @media (min-width:${breakpoints.md}px){${itemWidthMD}}
                    @media (min-width:${breakpoints.lg}px){${itemWidthLG}}
                    @media (min-width:${breakpoints.xl}px){${itemWidthXL}}`;
        }
        else if (this.type === 'responsive') {
            const itemWidthXS = this.inputs.type === 'mobile'
                ? `${this.styleid} .item {flex: 0 0 ${95 / +this.inputs.grid.xs}%; width: ${95 /
                    +this.inputs.grid.xs}%;}`
                : `${this.styleid} .item {flex: 0 0 ${100 / +this.inputs.grid.xs}%; width: ${100 /
                    +this.inputs.grid.xs}%;}`;
            const itemWidthSM = `${this.styleid} > .item {flex: 0 0 ${100 /
                +this.inputs.grid.sm}%; width: ${100 / +this.inputs.grid.sm}%}`;
            const itemWidthMD = `${this.styleid} > .item {flex: 0 0 ${100 /
                +this.inputs.grid.md}%; width: ${100 / +this.inputs.grid.md}%}`;
            const itemWidthLG = `${this.styleid} > .item {flex: 0 0 ${100 /
                +this.inputs.grid.lg}%; width: ${100 / +this.inputs.grid.lg}%}`;
            const itemWidthXL = `${this.styleid} > .item {flex: 0 0 ${100 /
                +this.inputs.grid.xl}%; width: ${100 / +this.inputs.grid.xl}%}`;
            itemStyle = `@media (max-width:${breakpoints.sm - 1}px){${itemWidthXS}}
                    @media (min-width:${breakpoints.sm}px){${itemWidthSM}}
                    @media (min-width:${breakpoints.md}px){${itemWidthMD}}
                    @media (min-width:${breakpoints.lg}px){${itemWidthLG}}
                    @media (min-width:${breakpoints.xl}px){${itemWidthXL}}`;
        }
        else {
            itemStyle = `${this.styleid} .item {flex: 0 0 ${this.inputs.grid.all}px; width: ${this.inputs.grid.all}px;}`;
        }
        this._renderer.addClass(this.carousel, this.token);
        if (this.vertical.enabled) {
            this._renderer.addClass(this.nguItemsContainer.nativeElement, 'nguvertical');
            this._renderer.setStyle(this.carouselMain1.nativeElement, 'height', `${this.vertical.height}px`);
        }
        // tslint:disable-next-line:no-unused-expression
        this.RTL && !this.vertical.enabled && this._renderer.addClass(this.carousel, 'ngurtl');
        this._createStyleElem(`${dism} ${itemStyle}`);
        this._storeCarouselData();
    }
    /** logic to scroll the carousel step 1 */
    _carouselScrollOne(Btn) {
        let itemSpeed = this.speed;
        let translateXval = 0;
        let currentSlide = 0;
        const touchMove = Math.ceil(this.dexVal / this.itemWidth);
        this._setStyle(this.nguItemsContainer.nativeElement, 'transform', '');
        if (this.pointIndex === 1) {
            return;
        }
        else if (Btn === 0 && ((!this.loop && !this.isFirst) || this.loop)) {
            const currentSlideD = this.currentSlide - this.slideItems;
            const MoveSlide = currentSlideD + this.slideItems;
            this._btnBoolean(0, 1);
            if (this.currentSlide === 0) {
                currentSlide = this.dataSource.length - this.items;
                itemSpeed = 400;
                this._btnBoolean(0, 1);
            }
            else if (this.slideItems >= MoveSlide) {
                currentSlide = translateXval = 0;
                this._btnBoolean(1, 0);
            }
            else {
                this._btnBoolean(0, 0);
                if (touchMove > this.slideItems) {
                    currentSlide = this.currentSlide - touchMove;
                    itemSpeed = 200;
                }
                else {
                    currentSlide = this.currentSlide - this.slideItems;
                }
            }
            this._carouselScrollTwo(Btn, currentSlide, itemSpeed);
        }
        else if (Btn === 1 && ((!this.loop && !this.isLast) || this.loop)) {
            if (this.dataSource.length <= this.currentSlide + this.items + this.slideItems &&
                !this.isLast) {
                currentSlide = this.dataSource.length - this.items;
                this._btnBoolean(0, 1);
            }
            else if (this.isLast) {
                currentSlide = translateXval = 0;
                itemSpeed = 400;
                this._btnBoolean(1, 0);
            }
            else {
                this._btnBoolean(0, 0);
                if (touchMove > this.slideItems) {
                    currentSlide = this.currentSlide + this.slideItems + (touchMove - this.slideItems);
                    itemSpeed = 200;
                }
                else {
                    currentSlide = this.currentSlide + this.slideItems;
                }
            }
            this._carouselScrollTwo(Btn, currentSlide, itemSpeed);
        }
    }
    /** logic to scroll the carousel step 2 */
    _carouselScrollTwo(Btn, currentSlide, itemSpeed) {
        // tslint:disable-next-line:no-unused-expression
        if (this.dexVal !== 0) {
            const val = Math.abs(this.touch.velocity);
            let somt = Math.floor((this.dexVal / val / this.dexVal) * (this.deviceWidth - this.dexVal));
            somt = somt > itemSpeed ? itemSpeed : somt;
            itemSpeed = somt < 200 ? 200 : somt;
            this.dexVal = 0;
        }
        if (this.withAnim) {
            this._setStyle(this.nguItemsContainer.nativeElement, 'transition', `transform ${itemSpeed}ms ${this.inputs.easing}`);
            this.inputs.animation &&
                this._carouselAnimator(Btn, currentSlide + 1, currentSlide + this.items, itemSpeed, Math.abs(this.currentSlide - currentSlide));
        }
        else {
            this._setStyle(this.nguItemsContainer.nativeElement, 'transition', ``);
        }
        this.itemLength = this.dataSource.length;
        this._transformStyle(currentSlide);
        this.currentSlide = currentSlide;
        this.onMove.emit(this);
        this._carouselPointActiver();
        this._carouselLoadTrigger();
        this.withAnim = true;
    }
    /** boolean function for making isFirst and isLast */
    _btnBoolean(first, last) {
        this.isFirst = !!first;
        this.isLast = !!last;
    }
    _transformString(grid, slide) {
        let collect = '';
        collect += `${this.styleid} { transform: translate3d(`;
        if (this.vertical.enabled) {
            this.transform[grid] = (this.vertical.height / this.inputs.grid[grid]) * slide;
            collect += `0, -${this.transform[grid]}px, 0`;
        }
        else {
            this.transform[grid] = (100 / this.inputs.grid[grid]) * slide;
            collect += `${this.directionSym}${this.transform[grid]}%, 0, 0`;
        }
        collect += `); }`;
        return collect;
    }
    /** set the transform style to scroll the carousel  */
    _transformStyle(slide) {
        let slideCss = '';
        if (this.type === 'responsive') {
            const breakpoints = this.inputs.gridBreakpoints;
            slideCss = `@media (max-width: ${breakpoints.sm - 1}px) {${this._transformString('xs', slide)}}
      @media (min-width: ${breakpoints.sm}px) {${this._transformString('sm', slide)} }
      @media (min-width: ${breakpoints.md}px) {${this._transformString('md', slide)} }
      @media (min-width: ${breakpoints.lg}px) {${this._transformString('lg', slide)} }
      @media (min-width: ${breakpoints.xl}px) {${this._transformString('xl', slide)} }`;
        }
        else {
            this.transform.all = this.inputs.grid.all * slide;
            slideCss = `${this.styleid} { transform: translate3d(${this.directionSym}${this.transform.all}px, 0, 0);`;
        }
        this.carouselCssNode.textContent = slideCss;
    }
    /** this will trigger the carousel to load the items */
    _carouselLoadTrigger() {
        if (typeof this.inputs.load === 'number') {
            this.dataSource.length - this.load <= this.currentSlide + this.items &&
                this.carouselLoad.emit(this.currentSlide);
        }
    }
    /** generate Class for each carousel to set specific style */
    _generateID() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 6; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return `ngucarousel${text}`;
    }
    /** handle the auto slide */
    _carouselInterval() {
        const container = this.carouselMain1.nativeElement;
        if (this.interval && this.loop) {
            this.listener4 = this._renderer.listen('window', 'scroll', () => {
                clearTimeout(this.onScrolling);
                this.onScrolling = setTimeout(() => {
                    this._onWindowScrolling();
                }, 600);
            });
            const play$ = fromEvent(container, 'mouseleave').pipe(mapTo(1));
            const pause$ = fromEvent(container, 'mouseenter').pipe(mapTo(0));
            const touchPlay$ = fromEvent(container, 'touchstart').pipe(mapTo(1));
            const touchPause$ = fromEvent(container, 'touchend').pipe(mapTo(0));
            const interval$ = interval(this.inputs.interval.timing).pipe(mapTo(1));
            setTimeout(() => {
                this.carouselInt = merge(play$, touchPlay$, pause$, touchPause$, this._intervalController$)
                    .pipe(startWith(1), switchMap(val => {
                    this.isHovered = !val;
                    this.cdr.markForCheck();
                    return val ? interval$ : EMPTY;
                }))
                    .subscribe(res => {
                    this._carouselScrollOne(1);
                });
            }, this.interval.initialDelay);
        }
    }
    _updateItemIndexContextAni() {
        const viewContainer = this._nodeOutlet.viewContainer;
        for (let renderIndex = 0, count = viewContainer.length; renderIndex < count; renderIndex++) {
            const viewRef = viewContainer.get(renderIndex);
            const context = viewRef.context;
            context.count = count;
            context.first = renderIndex === 0;
            context.last = renderIndex === count - 1;
            context.even = renderIndex % 2 === 0;
            context.odd = !context.even;
            context.index = renderIndex;
        }
    }
    /** animate the carousel items */
    _carouselAnimator(direction, start, end, speed, length, viewContainer = this._nodeOutlet.viewContainer) {
        let val = length < 5 ? length : 5;
        val = val === 1 ? 3 : val;
        const collectIndex = [];
        if (direction === 1) {
            for (let i = start - 1; i < end; i++) {
                collectIndex.push(i);
                val = val * 2;
                const viewRef = viewContainer.get(i);
                const context = viewRef.context;
                context.animate = { value: true, params: { distance: val } };
            }
        }
        else {
            for (let i = end - 1; i >= start - 1; i--) {
                collectIndex.push(i);
                val = val * 2;
                const viewRef = viewContainer.get(i);
                const context = viewRef.context;
                context.animate = { value: true, params: { distance: -val } };
            }
        }
        this.cdr.markForCheck();
        setTimeout(() => {
            this._removeAnimations(collectIndex);
        }, speed * 0.7);
    }
    _removeAnimations(indexs) {
        const viewContainer = this._nodeOutlet.viewContainer;
        indexs.forEach(i => {
            const viewRef = viewContainer.get(i);
            const context = viewRef.context;
            context.animate = { value: false, params: { distance: 0 } };
        });
        this.cdr.markForCheck();
    }
    /** Short form for setElementStyle */
    _setStyle(el, prop, val) {
        this._renderer.setStyle(el, prop, val);
    }
    /** For generating style tag */
    _createStyleElem(datas) {
        const styleItem = this._renderer.createElement('style');
        if (datas) {
            const styleText = this._renderer.createText(datas);
            this._renderer.appendChild(styleItem, styleText);
        }
        this._renderer.appendChild(this.carousel, styleItem);
        return styleItem;
    }
}
NguCarousel.decorators = [
    { type: Component, args: [{
                selector: 'ngu-carousel',
                template: "<div #ngucarousel class=\"ngucarousel\">\n  <ng-content select=\"[NguCarouselPrev]\"></ng-content>\n  <div #touchContainer class=\"ngu-touch-container\">\n    <div #nguItemsContainer class=\"ngucarousel-items\">\n      <ng-container nguCarouselOutlet></ng-container>\n    </div>\n  </div>\n  <div class=\"nguclearFix\"></div>\n  <ng-content select=\"[NguCarouselNext]\"></ng-content>\n</div>\n<ng-content select=\"[NguCarouselPoint]\"></ng-content>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;position:relative}:host.ngurtl{direction:rtl}.ngucarousel{height:100%;overflow:hidden;position:relative}.ngucarousel .ngucarousel-items{display:flex;height:100%;position:relative}.nguvertical{flex-direction:column}.banner .ngucarouselPointDefault .ngucarouselPoint{bottom:20px;position:absolute;width:100%}.banner .ngucarouselPointDefault .ngucarouselPoint li{background:hsla(0,0%,100%,.55)}.banner .ngucarouselPointDefault .ngucarouselPoint li.active{background:#fff}.banner .ngucarouselPointDefault .ngucarouselPoint li:hover{cursor:pointer}.ngucarouselPointDefault .ngucarouselPoint{box-sizing:border-box;list-style-type:none;margin:0;overflow:auto;padding:12px;text-align:center;white-space:nowrap}.ngucarouselPointDefault .ngucarouselPoint li{background:rgba(0,0,0,.55);border-radius:50%;display:inline-block;margin:0 4px;padding:4px;transition:.4s;transition-timing-function:cubic-bezier(.17,.67,.83,.67)}.ngucarouselPointDefault .ngucarouselPoint li.active{background:#6b6b6b;transform:scale(1.8)}.ngucarouselPointDefault .ngucarouselPoint li:hover{cursor:pointer}.nguclearFix{clear:both}"]
            },] }
];
NguCarousel.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: IterableDiffers },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ChangeDetectorRef }
];
NguCarousel.propDecorators = {
    inputs: [{ type: Input }],
    carouselLoad: [{ type: Output }],
    onMove: [{ type: Output }],
    dataSource: [{ type: Input, args: ['dataSource',] }],
    _defDirec: [{ type: ContentChildren, args: [NguCarouselDefDirective,] }],
    _nodeOutlet: [{ type: ViewChild, args: [NguCarouselOutlet, { static: true },] }],
    nextBtn: [{ type: ContentChild, args: [NguCarouselNextDirective, /* TODO: add static flag */ { read: ElementRef },] }],
    prevBtn: [{ type: ContentChild, args: [NguCarouselPrevDirective, /* TODO: add static flag */ { read: ElementRef },] }],
    carouselMain1: [{ type: ViewChild, args: ['ngucarousel', { read: ElementRef, static: true },] }],
    nguItemsContainer: [{ type: ViewChild, args: ['nguItemsContainer', { read: ElementRef, static: true },] }],
    touchContainer: [{ type: ViewChild, args: ['touchContainer', { read: ElementRef, static: true },] }],
    trackBy: [{ type: Input }]
};

class NguItemComponent {
    constructor() {
        this.classes = true;
    }
}
NguItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngu-item',
                template: "<ng-content></ng-content>\n",
                styles: [""]
            },] }
];
NguItemComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ['class.item',] }]
};

class NguTileComponent {
    constructor() {
        this.classes = true;
    }
}
NguTileComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngu-tile',
                template: "<div class=\"tile\">\n  <ng-content></ng-content>\n</div>\n",
                styles: [":host{box-sizing:border-box;padding:10px}.tile{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}"]
            },] }
];
NguTileComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ['class.item',] }]
};

class NguCarouselModule {
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

/*
 * Public API Surface of carousel
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NguCarousel, NguCarouselConfig, NguCarouselDefDirective, NguCarouselItemDirective, NguCarouselModule, NguCarouselNextDirective, NguCarouselOutlet, NguCarouselPointDirective, NguCarouselPrevDirective, NguCarouselStore, NguItemComponent, NguTileComponent, ItemsControl as ɵa, NguButton as ɵb };
//# sourceMappingURL=ngu-carousel.js.map
