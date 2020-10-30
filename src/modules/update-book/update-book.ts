import { inject } from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import './update-book.css'
@inject(DialogController)
export class UpdateBook {
  public message: string;

  constructor(private dialog: DialogController){
  }

  activate(message: string) {
    this.message = message;
  }

  ok() {
    this.dialog.ok();
  }

  cancel() {
    this.dialog.cancel();
  }

}
