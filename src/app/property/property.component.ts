import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,Validators } from '@angular/forms';
import { Properties } from '../property';

import { PropertyService } from '../property.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  public allProterties:Properties[] = [];
  public msg:string='Loading...';
  constructor(private propertySer:PropertyService,private fb:FormBuilder) { 
    this.getAllProperties();
  }
  public name = new FormControl('', [Validators.required]);
  public description = new FormControl('', [Validators.required]);
  public size = new FormControl('', [Validators.required]);


  propertyForm = this.fb.group({
    name:this.name,
    description:this.description,
    size:this.size
  })

  ngOnInit(): void {
  }
  public getAllProperties(){
    this.propertySer.getProperties().subscribe((data:any)=>{
      this.allProterties = data
      if(this.allProterties.length == 0 ){
        this.msg = 'Oops!! Property List is empty!!'
      }
    })
  }
  public addProperty(){
    let {name,description,size} = this.propertyForm.value
    let propertyObj= {
      name:name,
      description:description,
      size:size
    }
    this.propertySer.addProperty(propertyObj).subscribe(data=>{
      console.log(data)
      this.getAllProperties()
    })
    this.clearForm()
    
  }
  public clearForm(){
    this.propertyForm.reset()
  }

  public deleteProperty(indx:any){
    let id = indx._id;
    this.propertySer.deleteProperty(id).subscribe((data:any)=>{
      console.log('Deleted successfully',data)
      this.getAllProperties()
    });
  }
}
