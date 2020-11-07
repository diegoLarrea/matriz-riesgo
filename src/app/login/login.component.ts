import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAPI } from '../_services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private apiAuth: AuthAPI, private router: Router) { }

  key = {
    usuario: null,
    clave: null
  }

  loading = false;

  ngOnInit(): void {
  }

  login(){
    if(this.key.usuario != null && this.key.usuario != "" && this.key.clave != null && this.key.clave != ""){
      this.loading = true;
      this.apiAuth.login(this.key).subscribe(
        data => {
          if(data.estado == 0){
            localStorage.setItem("sesion", "S");
            localStorage.setItem("token", data.dato["X-Auth-Token"]);
            this.apiAuth.getUser().subscribe(
              data => {
                localStorage.setItem("currentUser", JSON.stringify(data.dato));
                this.router.navigate([""]); 
              }
            )
          }else{
            this.loading = false;
            // this.toastr.info("Usuario y/o contraseña incorrecta/s");
          }
        }
      )
    }else{
      // this.toastr.info("Complete los campos requeridos");
    }
    
  }

}
