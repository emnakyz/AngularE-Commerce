import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {

  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  get500Error(){
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe(response=>{
      console.log(response);
    },error=>{
      console.log(error);
    })
  }

  get400Error(){
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe(response=>{
      console.log(response);
    },error=>{
      console.log(error);
    })
  }

  get400ValidationError(){
    this.http.get(this.baseUrl + 'buggy/fortywto').subscribe(response=>{
      console.log(response);
    },error=>{
      console.log(error);
    })
  }

  get404Error(){
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(response=>{
      console.log(response);
    },error=>{
      console.log(error);
    })
  }
}
