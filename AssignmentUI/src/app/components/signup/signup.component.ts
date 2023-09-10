import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent  implements OnInit{
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  muted: string = "text-muted";
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}

  ngOnInit(): void{
    this.signupForm = this.fb.group({
      firstName:['', Validators.required ],
      lastName:[ '' , Validators.required ],
      email:[ '' , Validators.required ],
      username:[ '' , Validators.required ],
      password:[ '' , Validators.required ]
    });
  }

  hideShowPass(){
      this.isText = !this.isText;
      this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
      this.isText ? this.type = "text" : this.type = "password";
      this.isText ? this.muted = "" : this.muted = "text-muted";
  }

  onSignup(){
    if(this.signupForm.valid){
      // Send obj to database
      this.auth.signUp(this.signupForm.value).subscribe({
        next:(res=>{
          // alert(res.message)
          this.signupForm.reset();
          this.router.navigate(['login']);

        }),
        error:(err=>{
          alert(err?.error.message)
          this.signupForm.reset();
        })
      })
    }
    else{
      //throw error using toaster and with required field
      ValidateForm.validateAllFormFields(this.signupForm);
    }
  }
}
