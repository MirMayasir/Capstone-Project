import { Component, OnInit } from '@angular/core';
import { DrugsServiceService } from 'src/Services/drugs-service.service';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css']
})
export class DrugsComponent implements OnInit {

  drugs: any[] = [];
  Name:string;
  Region:string;

  constructor(private drugService: DrugsServiceService) { }

  ngOnInit(): void {
    this.loadDrugs();
  }

  loadDrugs(): void {
    this.drugService.getAllAvailableDrugs().subscribe(
      data => this.drugs = data,
      error => console.error('Error fetching drugs', error)
    );
  }
}
