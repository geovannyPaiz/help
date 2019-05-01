import { Component, OnInit, TemplateRef } from '@angular/core';
import { PostService } from '../../../services/post.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  postClass: Post = new Post()
  msgError: MsgError = new MsgError()

  constructor(
    private postService : PostService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
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
    this.msgError.userId = this.msgError.body = this.msgError.title = ''
    !this.msgError.userId ? this.msgError.userId = 'Campo requerido' : ''
    !this.msgError.title ? this.msgError.title = 'Campo requerido' : ''
    !this.msgError.body ? this.msgError.body = 'Campo requerido' : ''
    if(!this.msgError.userId || !this.msgError.title || !this.msgError.body ){
      return;
    }
    this.postService.post(this.postClass).subscribe(res=>{
      console.log(res);
    }, error=>{
      console.log(error)
    })
    
    this.modalRef.hide()
    this.getPost()
  }

}
class Post{
  userId: number;
  title: string;
  body: string
}


class MsgError{
  userId: string;
  title: string;
  body: string
}
