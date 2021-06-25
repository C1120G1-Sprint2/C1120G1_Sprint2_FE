import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  textType: boolean = false;
  form: FormGroup;
  password: Boolean;
  repass: string;
  defaultAvatar: string = 'https://firebasestorage.googleapis.com/v0/b/c1120g1.appspot.com' +
    '/o/SPRINT_02%2Fusers%2Favatar.png?alt=media&token=b54ffd5e-9a20-4110-a2e2-de839d8915a7';

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$'),
        Validators.minLength(6), Validators.maxLength(45)]],
      password: ['', [Validators.required,
        Validators.minLength(6), Validators.maxLength(45)]],
      repassword: ['', [Validators.required,
        Validators.minLength(6), Validators.maxLength(45)]],
      email: ['', [Validators.required,
        Validators.pattern('^([a-zA-Z0-9]+-*_*.*)+\\@(gmail|yahoo)\\.com$'),
        Validators.maxLength(253)
      ]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(45)]],
      birthday: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      idCard: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^0[\\d]{9,10}$')]],
      ward: ['', [Validators.required]],
      district: [''],
      province: [''],
    });
  }

  secondForm() {
    // if (this.password){
    document.getElementById('first-form').style.display = 'none';
    document.getElementById('second-form').style.display = 'table';
    // this.repass = '';
    // } else {
    //   this.repass = 'Mật khẩu không trùng khớp';
    // }
  }

  firstForm() {
    document.getElementById('first-form').style.display = 'table';
    document.getElementById('second-form').style.display = 'none';
  }

  toggleShowHide() {
    this.textType = !this.textType;
  }

  submitForm() {

  }
}
