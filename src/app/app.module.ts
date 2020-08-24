import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FullCalendarModule} from 'primeng/fullcalendar';

import {AppComponent} from './app.component';
import {GraphQLModule} from './graphql.module';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink} from 'apollo-angular-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {environment} from '../environments/environment';
import {QRCodeModule} from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    GraphQLModule,
    QRCodeModule,
    FullCalendarModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      const token = environment.token;

      return {
        cache: new InMemoryCache(),
        link: new WebSocketLink({
          options: {
            reconnect: true,
            connectionParams: {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          },
          uri: 'ws://pgadmin.datweb.com.br:8080/v1/graphql'
        })
      };
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
