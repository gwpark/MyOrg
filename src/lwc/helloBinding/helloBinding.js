/**
 * Created by MS on 2023-03-14.
 */

import { LightningElement } from 'lwc';

export default class HelloBinding extends LightningElement {
    greeting = 'World';

    handleChange(event) {
        this.greeting = event.target.value;
    }
}