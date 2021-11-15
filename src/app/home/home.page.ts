import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listaUsuarios = []
  equivocacion = false;
  dato = "";
  constructor(
    private usuarioService: UsuarioService,
    private router : Router,
    public toastController : ToastController
    ) {}

  ngOnInit() {
    this.listaUsuarios = this.usuarioService.getListaUsuarios();
  }

 async login(user : HTMLInputElement, pass : HTMLInputElement){
    let posicion = 0;
    const toast = await this.toastController.create({
      message: 'Las credenciales no son correctas.',
      duration: 2000,
      color : "danger",
      position : "bottom"
    });

    try{
      const usuario = user.value;
      const contrasena = pass.value;

      for (let i of this.listaUsuarios) {
        if (usuario == i.usuario){
          if (contrasena == i.password){
            localStorage.setItem("1", JSON.stringify(i));
            this.router.navigate(['/inicio', i.id])
            break;
          }
          else{
            toast.present();
            break;
          }
        }
        toast.present();
      }
    }
    catch{
      toast.present();
    }
  }
  recuperar(){
    this.router.navigate(['/recuperar'])
  }
}
