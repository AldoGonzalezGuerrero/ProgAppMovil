import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  ingresado = false;
  existe = true;
  contrasena = "";
  constructor(
    private usuarioService: UsuarioService
    ) { }

  ngOnInit() {
  }

  recuperar(nom: HTMLInputElement){
    this.existe = false;
    const usuario = nom.value;
    this.contrasena = localStorage.getItem(usuario);
    try{
    if (this.contrasena == null){
      this.existe = false;
    }
    else{
      this.existe = true;
      this.ingresado = true;
    }
    }
    catch{
      this.existe = false;
    }
    /*for (let i of this.listaUsuarios){
      if (usuario == i.usuario){
        this.ingresado = true;
        this.contrasena = i.password;
        this.existe = true;
        break;
      }
    }
    if (this.ingresado === false){
      this.existe = false;
    }*/
  }
}
