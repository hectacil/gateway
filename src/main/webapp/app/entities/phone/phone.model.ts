import { BaseEntity } from './../../shared';

export class Phone implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public brand?: string,
        public price?: number,
    ) {
    }
}
