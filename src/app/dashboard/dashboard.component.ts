import { Component, OnInit } from '@angular/core';
import { CovidStatusService } from './covid-status.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalCovidCases: number;
  recoveredCovidCases: number;
  deathCovidCases: number;
  newCovidCases: number;
  andhraState: string[];
  response: string[];
  activeCases: number[];
  active: any;
 
  recoveredCases: number[];
  districtsInAndhra: string[];
  dataSetOfGlobalCovidStatusValues: any;
  dataSetOfGlobalCovidStatusKeys: any;
  patientData: string[];
  searchText;
  districtsInTelangana: any;
  telanganaState: string[];
  activeInTs: any;
  activeCasesInTs: number[];
  chart: any;
  doughnut: any;
  pie: any;

  constructor(private covidStatusService: CovidStatusService) { }

  ngOnInit(): void {
    this.displayIndiaCovidStatus();
    this.displayWorldCovidStatus();
    this.displayPatientDetails();
  }

  displayWorldCovidStatus(): void {

    this.covidStatusService.getWorldCovidStatus().subscribe(covidCasesResponse => {
      this.newCovidCases = covidCasesResponse.Global.NewConfirmed;
      this.totalCovidCases = covidCasesResponse.Global.TotalConfirmed;
      this.deathCovidCases = covidCasesResponse.Global.TotalDeaths;
      this.recoveredCovidCases = covidCasesResponse.Global.TotalRecovered;
      this.dataSetOfGlobalCovidStatusValues = Object.values(covidCasesResponse.Global).map(data => data);
      this.dataSetOfGlobalCovidStatusKeys = Object.keys(covidCasesResponse.Global).map(data => data);


      this.doughnut = new Chart('doughnut', {
        type: 'doughnut',
        data: {
          datasets: [{
            data: this.dataSetOfGlobalCovidStatusValues,
            backgroundColor: ["#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177"],

          }],
          labels: this.dataSetOfGlobalCovidStatusKeys,

        },
        options: {

          animation: {
            duration: 3300,
          }, legend: {
            position: 'bottom',
            display: false
          },
          cutoutPercentage: 80
        }
      });

    });
  }

  displayIndiaCovidStatus(): void {
    this.covidStatusService.getIndiaCovidStatus().subscribe(data => {
      /*Andhra Pradesh Covid Status*/
      this.districtsInAndhra = data["Andhra Pradesh"].districtData;
      this.andhraState = Object.keys(this.districtsInAndhra);
      this.active = Object.values(this.districtsInAndhra);
      this.activeCases = this.active.map(data => data.active);
      this.recoveredCases = this.active.map(data => data.recovered);
      /*Telangana Covid Status */
      this.districtsInTelangana = data["Telangana"].districtData;
      this.telanganaState = Object.keys(this.districtsInTelangana);
      this.activeInTs = Object.values(this.districtsInTelangana);
      this.activeCasesInTs = this.activeInTs.map(data => data.active);

      this.chart = new Chart('chart-line', {
        type: 'line',
        data: {
          labels: this.andhraState,
          datasets: [{
            label: 'Active',
            data: this.activeCases,
            backgroundColor: 'transparent',
            borderColor: '#5b6582',
            borderWidth: 2
          },
          {
            label: 'Recovered',
            data: this.recoveredCases,
            backgroundColor: 'transparent',
            borderColor: '#36a2eb',
            borderWidth: 2,
          }
          ]
        },
        options: {
          animation: {
            duration: 3300,
          },
          scales: {
            yAxes: [{
              ticks: {
                fontColor: 'rgba(0,0,0,.6)',
                fontStyle: 'bold',
                beginAtZero: true,
                maxTicksLimit: 8,
                padding: 10
              }
            }]
          },
          responsive: true,
          legend: {
            position: 'top',
            display: false,
            labels: {
              usePointStyle: true,
            }
          },
        }
      });



      this.pie = new Chart('chart-pie', {
        type: 'pie',
        options: {
          responsive: true,
          title: {
            display: false,
          }, legend: {
            display: false,
            position: 'top',
          }, animation: {
            animateScale: true,
            animateRotate: true,
            duration: 3300,
          }
        },
        data: {
          datasets: [{
            data: this.activeCasesInTs.reverse(),
            backgroundColor: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
            '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
            '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
            '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
            '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
            '#66664D', '#991AFF', '#E666FF', '#4DB3FF'],
            label: 'Active'
          }],
          labels: this.telanganaState,
        }
      })
    });
  }

  /* dummy method to display list in table */
  displayPatientDetails(): void {
    this.covidStatusService.getPatientDetails().subscribe(patients => {
      this.patientData = patients.data;
    });
  }
}

