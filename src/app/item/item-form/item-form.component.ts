import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemService } from '../../shared/item.service';

@Component({
    selector: 'app-item-form',
    templateUrl: './item-form.component.html',
    styles: [
    ]
})
export class ItemFormComponent implements OnInit {

    constructor(public service: ItemService) { }

    ngOnInit(): void {
    }

    onSubmit(form: NgForm) {
        this.service.postItem().subscribe(
            res => {
                console.log("OK");
            },
            err => {
                console.log(err);
            }
        )
    }

}
