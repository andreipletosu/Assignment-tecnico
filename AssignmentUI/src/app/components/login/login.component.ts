import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  muted: string = "text-muted";
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userStore: UserStoreService){}

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hideShowPass(){
      this.isText = !this.isText;
      this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
      this.isText ? this.type = "text" : this.type = "password";
      this.isText ? this.muted = "" : this.muted = "text-muted";
  }
  onLogin(){
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe({
        next:(res => {
          alert(res.message)
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          let tokenPayload = this.auth.decodedToken();
          this.userStore.setUsernameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.router.navigate(['dashboard']);
        }),
        error:(err=>{
          alert("Something went wrong!")
          this.loginForm.reset();
          console.log(err);
        })
      })
    }
    else{
      //throw error using toaster and with required field
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }

}
