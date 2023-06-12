/**
 * Created by MS on 2023-03-20.
 */

import { LightningElement, api } from 'lwc';
export default class TodoItem extends LightningElement {
    @api itemName = 'New Item';
}