import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  public form : FormGroup;
  shouldPlotNotification: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({ 
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      category: ["", [Validators.required]],
      extintstatus: ["", [Validators.required]],
      fullname: ["", [Validators.required]],
      statusextint: ["", [Validators.required]]
     });
  }

  onSubmit() {
    if (this.form.invalid) return this.plotNotification();

    const data = this.form.value;
    console.log("Enviar", data);
  }

  plotNotification (){
    this.shouldPlotNotification = true;

    setTimeout(() => {
      this.shouldPlotNotification = false;
    }, 3000);
  }

}
