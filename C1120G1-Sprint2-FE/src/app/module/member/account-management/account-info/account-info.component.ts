import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
  private rfEditForm: FormGroup;

  constructor(public router: Router,
              public formBuilder: FormBuilder,
             ) { }

  ngOnInit(): void {
    this.rfEditForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[^\\d`~!@#$%^&*()_\\-+=|\\\\{}\\[\\]:;"\'<>,.?\/]+$')]],
      birthday: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      idCard: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^(09)[\\d]{8}$')]]
    });
  }

  onSubmit() {
  }
}
