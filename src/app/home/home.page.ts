import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApirestService } from '../apirest.service';

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
    public toastController : ToastController,
    private api : ApirestService
    ) {}

  ngOnInit() {
    this.api.getUsers();
    this.listaUsuarios = this.api.listado;
    console.log(this.listaUsuarios);
  }

 async login(user : HTMLInputElement, pass : HTMLInputElement){
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
        if (usuario == i.username){
          this.equivocacion = false;
          if (contrasena == "1234"){
            localStorage.setItem("1", JSON.stringify(i));
            this.router.navigate(['/inicio', i.id]);
            break;
          }
          else{
            toast.present();
            break;
          }
        }
        else{
          this.equivocacion = true;
        }
        if (usuario.trim() == "" && contrasena.trim() ==""){
          toast.present();
          break;
        }
      }
      if (this.equivocacion){
        toast.present();
      }
    }
    catch{
      toast.present();
      console.log("Error!");
    }
  }
  recuperar(){
    this.router.navigate(['/recuperar'])
  }
}
