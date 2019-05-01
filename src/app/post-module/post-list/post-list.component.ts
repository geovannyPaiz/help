import { Component, OnInit, TemplateRef } from '@angular/core';
import { PostService } from '../../../services/post.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { post } from '../../../models/post'
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  post : any 
  totalRec : number;  
  modalRef: BsModalRef;
  page: number = 1;
  postClass: post = new post()
  msgError: MsgError = new MsgError()
  postForm: FormGroup;
  constructor(
    private postService : PostService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      userId: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    })
    this.getPost()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getPost(){
    this.postService.get().subscribe(post=>{
      this.post = post
      this.totalRec = this.post.length;
      console.log(this.post)
    },error=>{
      console.log(error)
    })
  }

  onCreate(){
    const formulario = this.postForm.value
    this.msgError.userId = this.msgError.body = this.msgError.title = ''
    !formulario.userId ? this.msgError.userId = 'Campo requerido' : ''
    !formulario.title ? this.msgError.title = 'Campo requerido' : ''
    !formulario.body ? this.msgError.body = 'Campo requerido' : ''
    
    if(!formulario.userId || !formulario.title || !formulario.body ){
      return;
    }
    this.postClass.userId = formulario.userId;
    this.postClass.title = formulario.title;
    this.postClass.body = formulario.body
    this.postService.post(this.postClass).subscribe(res=>{
      console.log(res);
    }, error=>{
      console.log(error)
    })
    
    this.modalRef.hide()
    this.getPost()
  }
  limpiar(){

  }

}


class MsgError{
  userId: string;
  title: string;
  body: string
}
