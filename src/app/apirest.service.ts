import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  listado = [];
  datos : any;
  post = [];
  comment = [];
  commentid = 0;
  numero = 0;
  private apiURL = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient,
    public toastController : ToastController,) { }

  getUsers()
  {
    //Hacemos clear del listado!!
    this.listado = [];
    let url = this.apiURL + 'users';
    return new Promise((resolve, reject) =>
    {
      this.http.get(url).subscribe((data: []) =>
      {
        data.forEach(item => { this.listado.push(item); });
        //console.table(this.listado);
      },
      error => { console.log("error en la solicitud")
      })
    })
  }
  
  getPosts(){
    //Hacemos clear del listado!!
    this.listado = [];
    let url = this.apiURL + 'posts';
    return new Promise ((resolve, reject) =>
    {this.http.get(url).subscribe((data:[]) =>
      {
        data.forEach(item => { this.listado.push(item); });
      },
      error => { console.log("Error en la solicitud!")
    })
  })
  }

  getPostsUsuario(id:String){
    //Hacemos clear del listado!!
    this.listado = [];
    let url = this.apiURL + 'users/' + id + '/posts';
    return new Promise ((resolve, reject) =>
    {this.http.get(url).subscribe((data:[]) =>
      {
        data.forEach(item => {this.listado.push(item); });
      },
      error => { console.log("Error en la solicitud!")}
      )}
    )
  }  
  getCommentsPost(id:String){
    //Hacemos clear del listado!!
    this.listado = [];
    this.numero = 0;
    let url = this.apiURL + 'posts/' + id + '/comments';
    return new Promise ((resolve, reject) =>
    {this.http.get(url).subscribe((data:[]) =>
      {
        data.forEach(item => {
          this.listado.push(item);
          localStorage.setItem(String(this.numero + 3), JSON.stringify(this.listado[this.numero]));
          this.numero += 1;
        });
        console.log(this.numero);
        this.savedComments();
      },

      error => { 
        console.log("Error en la solicitud!");
        for (let i in localStorage){
          this.numero +=1;
          if (this.numero >= 3 ){
          this.listado.push(JSON.parse(localStorage.getItem(i)));
          }
        }
        this.tirarError();
      }

      )}
    )
  }

  async tirarError(){
    const toast = await this.toastController.create({
      message: 'Error en la recolección de datos. ¿Estás conectado a internet?',
      duration: 2000,
      color : "danger",
      position : "bottom"
    });
    toast.present();
  }

  async savedComments(){
    const toast = await this.toastController.create({
      message: 'Comentarios guardados exitosamente.',
      duration: 2000,
      color : "success",
      position : "bottom"
    });
    toast.present();
  }

  getPost(id:String){
    //Hacemos clear del listado!!
    this.post = [];
    let url = this.apiURL + 'posts/' + id;
    return new Promise((resolve, reject) =>
    {
      this.http.get(url).subscribe((data: []) =>
      {
        this.post = data;
        console.table(this.post);
        localStorage.setItem("2", JSON.stringify(data));
      },
      error => { console.log("error en la solicitud")
      })
    })
  }

getUser(id:String)
  {
    let url = this.apiURL + 'users/' + id;
    return new Promise((resolve, reject) =>
    {
      this.http.get(url).subscribe((data: any) =>
      {
        this.datos = data;
        console.log(this.datos);
      },
      error => { console.log("error en la solicitud")
      })
    })
  }
  

}