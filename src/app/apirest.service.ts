import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  listado = [];
  datos : any;
  private apiURL = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) { }

  getUsers()
  {
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
    let url = this.apiURL + 'posts';
    return new Promise ((resolve, reject) =>
    {this.http.get(url).subscribe((data:[]) =>
      {
        data.forEach(item => {this.listado.push(item); });
      },
      error => { console.log("Error en la solicitud!")}
      )}
    )
  }

  getPost(id:String){
    let url = this.apiURL + 'posts/' + id;
    return new Promise((resolve, reject) =>
    {
      this.http.get(url).subscribe((data:any) =>
      {
        this.datos = data;
        console.log(this.datos);
      },
      error => { console.log("Error en la solicitud!")
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
