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
  error = null;

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
            backgroundColor: ["#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8",
              "#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16",
              "#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce",
              "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997",
              "#409188", "#911e20"],
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
    }, error => {
      this.error = error.message;// error handling
    }
    );
  }
}

