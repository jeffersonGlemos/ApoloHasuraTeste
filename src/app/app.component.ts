import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {NgxQrcodeElementTypes} from 'ngx-qrcode2';

const SUBSCRIBE_TO_AGENDAMENTO = gql`
 subscription MyQuery {
  ferramenta_agendamento {
    descricao
    inicio
    fim
    status
    uuid
    uuid_localidade
  }
}
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DemonstrativoAgenda';
  agendamento: any;
  onlineIndicator: any;
  loading = true;
  events: any[];
  options: any;

  constructor(private http: HttpClient, private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2020-08-04',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      }
    };
    this.apollo.subscribe({
      query: SUBSCRIBE_TO_AGENDAMENTO,
    }).subscribe((data) => {
      // @ts-ignore
      // tslint:disable-next-line:only-arrow-functions typedef
      console.log('got data ', data.data.agendamento);
      // this.events = data.data;
      // @ts-ignore
      // tslint:disable-next-line:only-arrow-functions typedef
      this.agendamento = Array.from(data.data.agendamento).map(function({descricao, fim, inicio, status}) {
        return {
          title: descricao,
          start: inicio,
          end: fim,
          color  : status
        };
      });
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
