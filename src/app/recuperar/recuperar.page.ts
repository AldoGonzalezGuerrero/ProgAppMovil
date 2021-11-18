import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { ApirestService } from '../apirest.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  ingresado = false;
  existe = true;
  contrasena = "1234";
  listado = [];
  constructor(
    private usuarioService: UsuarioService,
    private api : ApirestService,
    public toastController : ToastController,
    ) { }

  ngOnInit() {
  this.api.getUsers();
  }

  recuperar(nom: HTMLInputElement){
    this.existe = false;
    const usuario = nom.value;
    this.listado = this.api.listado;
    try{
      for (let i of this.listado){
        if (usuario == i.username){
          this.existe = true;
          this.ingresado = true;
          break;
        }
        else{
          console.log("Error 1")
        }
      }
      if (this.existe == false){
        this.noExiste();
      }
    }
    catch{
      console.log("Error 2")
      this.noExiste();
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
  async noExiste(){
    const toast = await this.toastController.create({
      message: 'El nombre de usuario ingresado NO existe...',
      duration: 2000,
      color : "danger",
      position : "bottom"
    });
    toast.present();
  }
}
