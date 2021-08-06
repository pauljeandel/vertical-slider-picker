import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
/**
 * @input {nuber} [offsetBegin] : Déplacement initial.
 * @input {nuber} [startValue] : Valeur min.
 * @input {nuber} [endValue] : Valeur max.
 * @input {any[]} [dataOverwrite] : Remplace le tableau de données par un nouveau tableau.
 * @input {string} [mainColor] : Couleur princiaple.
 * @input {string} [selectedColor] : Couleur de l'élément selectionné.
 * @output {EventEmitter<any>()} [selectedValue] : Valeur selectionnée.
 */
@Component({
    selector: 'app-vertical-slider-picker',
    templateUrl: './vertical-slider-picker.component.html',
    styleUrls: ['./vertical-slider-picker.component.scss'],
})
export class VerticalSliderPickerComponent implements OnInit {

    @ViewChild(IonContent) contentRef: IonContent;
    @Input() offsetBegin = 200;
    @Input() startValue = 0;
    @Input() endValue = 25;
    @Input() dataOverwrite: any[] = [];
    @Input() mainColor = 'var(--ion-color-secondary)';
    @Input() selectedColor = 'primary';
    @Output() selectedValue = new EventEmitter<any>();
    cssClassSelected;
    data: number[] = [];
    dataNumbers = true;
    div;
    currentScroll;

    constructor() { }

    ngOnInit() {
        if (this.dataOverwrite.length > 0) {
            this.dataNumbers = false;
        } else {
            for (let i = this.startValue; i < this.endValue + 1; i++) {
                this.data.push(i);
            }
        }

        switch (this.selectedColor) {
            case 'white':
                this.cssClassSelected = 'selectedWhite';
                break;
            default:
                this.cssClassSelected = 'selectedPrimary';
                break;
        }

        setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            this.div = this.contentRef['el'];
            this.logScrolling();
            this.checkSelected();
        }, 10);
        setTimeout(() => {
            this.contentRef.scrollToPoint(0, this.offsetBegin, 500);
        }, 500);


    }

    scrollEvent(event) {
        this.currentScroll = event.detail.scrollTop;
        this.logScrolling();
    }

    logScrolling() {

        const divHeightMiddle = this.div.offsetHeight / 2;
        const divToTop = this.div.getBoundingClientRect().y;
        //get all the elements with the class "number"
        const numbers = document.getElementsByClassName('number');

        for (const N in numbers) {
            if ((typeof numbers[N] === 'object')) {

                const relativePos = numbers[N].getBoundingClientRect().y - divToTop;

                let value = this.calculateValue(divHeightMiddle, relativePos);
                if ((relativePos < 0)) {
                    //this.swapUp();
                    value = 0;
                }
                else if ((relativePos > 2 * divHeightMiddle)) {
                    //this.swapDown();
                    value = 0;
                }

                if (Math.abs(relativePos - divHeightMiddle + 20) < 30) {
                    numbers[N].classList.add(this.cssClassSelected);
                    value = 1;
                }
                else {
                    numbers[N].classList.remove(this.cssClassSelected);
                }
                numbers[N].setAttribute('style', 'opacity: ' + value + ';' + 'transform: scale(' + value + ');');
            }
        }
    }

    calculateValue(divHeightMiddle, relativePos): number {
        return -(1 / (divHeightMiddle * divHeightMiddle)) * relativePos * relativePos + (2 / divHeightMiddle) * relativePos;
    }
    checkSelected() {
        const value = document.getElementsByClassName(this.cssClassSelected);

        if (value.length === 0) {
            this.contentRef.scrollToPoint(0, this.currentScroll - 20, 200);
            //Will loop until an element with class "selected" is found
            return 0;
        }
        else {
            this.selectedValue.emit(value[0].innerHTML);
            return 1;
        }
    }

    swapUp() {
        const valueToAppend = this.data[this.data.length - 1] + 1;
        this.data.push(valueToAppend);
        this.data.splice(0, 1);
    }

    swapDown() {
        const valueToAppend = this.data[0] - 1;
        this.data.unshift(valueToAppend);
        this.data.splice(this.data.length - 1, 1);
    }
}
