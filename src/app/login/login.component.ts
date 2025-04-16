import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule], // ✅ Import this here!
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public loginFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authentticateservice: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")
    });
  }

  login(): void {
    const username = this.loginFormGroup.value.username;
    const password = this.loginFormGroup.value.password;
    const auth = this.authentticateservice.login(username, password);

    if (auth) {
      this.router.navigateByUrl("/admin");
    }
  }
}
