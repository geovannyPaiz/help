import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostModuleRoutingModule } from './post-module-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { FormsModule} from '@angular/forms'

@NgModule({
  declarations: [PostListComponent],
  imports: [
    CommonModule,
    PostModuleRoutingModule,
    FormsModule,
  ]
})
export class PostModuleModule { }
