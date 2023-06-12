/**
 * Created by MS on 2023-03-14.
 */

import { LightningElement, api } from 'lwc';

export default class HelloWorld extends LightningElement {
   @api firstName = "World"
}