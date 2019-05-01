import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http : HttpClient
  ) { }

  base= 'https://jsonplaceholder.typicode.com'

  get(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
  //  return fetch('https://jsonplaceholder.typicode.com/posts')
  // .then(response => response.json())
  // .then(json => console.log(json))
  }

  post(data){
    return this.http.post(this.base + '/posts', data)
  }
}
