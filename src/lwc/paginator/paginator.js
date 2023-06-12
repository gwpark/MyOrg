/**
 * Created by MS on 2023-03-24.
 */

import { LightningElement } from 'lwc';

export default class Paginator extends LightningElement {
    previousHandler() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    nextHandler() {
        this.dispatchEvent(new CustomEvent('next'));
    }
}