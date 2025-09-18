import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../../models/user.model';
import { LoginContainerData } from '../models/login.model';

@Component({
  selector: 'app-login-presenter',
  templateUrl: './login-pres.template.html',
  styleUrls: ['./login-pres.style.scss']
})
export class LoginPresenterComponent implements OnInit {
  @Input() containerData: LoginContainerData | null = null;
  @Output() loginSubmit = new EventEmitter<LoginRequest>();

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid && !this.containerData?.isLoading) {
      const credentials: LoginRequest = this.loginForm.value;
      this.loginSubmit.emit(credentials);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get isFormValid(): boolean {
    return this.loginForm.valid;
  }

  loginWithQuickUser(email: string, password: string): void {
    this.loginForm.setValue({
      email: email,
      password: password
    });
    this.onSubmit();
  }
}
