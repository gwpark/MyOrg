/**
 * Created by MS on 2023-03-21.
 */

import { LightningElement } from 'lwc';
import LightningConfirm from 'lightning/confirm';

export default class MyApp extends LightningElement {
    async handleConfirmClick() {
        const result = await LightningConfirm.open({
            message: 'this is the prompt message',
            variant: 'headerless',
            label: 'this is the aria-label value',
            // setting theme would have no effect
        });
        //Result is true or false
        console.log('===result=== ' + result);
        //Confirm has been closed
        //result is true if OK was clicked
        //and false if cancel was clicked
    }
}