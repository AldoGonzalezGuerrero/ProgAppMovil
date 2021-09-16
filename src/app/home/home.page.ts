import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listaUsuarios = []
  equivocacion = false;
  constructor(
    private usuarioService: UsuarioService,
    private router : Router
    ) {}

  ngOnInit() {
    this.listaUsuarios = this.usuarioService.getListaUsuarios();

  }

  login(user : HTMLInputElement, pass : HTMLInputElement){
    try{
      const usuario = user.value;
      const contrasena = pass.value;

      for (let i of this.listaUsuarios) {
        if (usuario == i.usuario){
          if (contrasena == i.password){
            this.equivocacion = false;
            this.router.navigate(['/inicio', i.id])
            break;
          }
          else{
            this.equivocacion = true;
            break;
          }
        }
        this.equivocacion = true;
      }
    }

    catch{
      this.equivocacion = true;
    }
  }
  recuperar(){
    this.router.navigate(['/recuperar'])
  }
}
