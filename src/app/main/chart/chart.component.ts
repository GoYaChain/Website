import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts/types/dist/echarts';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  options:EChartsOption
  // constructor(private d: EChartsOption){}

  

  ngOnInit(): void {
    this.options = {
     
        backgroundColor: '#000508',
   
     
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}'
        },
        legend: {
          // x: 'center',
          bottom :0,
          // y: 'bottom',
          data: [ 'Marketing 17%','Strategic Sale 3.3%', 'Liquidity 1.7%',
           'Rewards System 40%',
           'Team 20%', 'Treasury 10%', 'Staking 10%', 'Total Supply 100%']
        },
        // calculable: true,
        series: [
          {
            name: 'Tokenomics',
            type: 'pie',
            radius: [30, 100],
            roseType: 'radius',
            data: [
              { value: 17, name: 'Marketing 17%' },
              { value: 3.3, name: 'Strategic Sale 3.3%' },
    
              { value: 1.7, name: 'Liquidity 1.7%' },
              { value: 40, name: 'Rewards System 40%' },
              { value: 20, name: 'Team 20%' },
              { value: 10, name: 'Treasury 10%' },
              { value: 18, name: 'Staking 10%' },
              { value: 100, name: 'Total Supply 100%' }
            ]
          }
        ]
      };
  }
 
}

