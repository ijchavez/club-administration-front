import { Component, OnInit } from '@angular/core';
import {UserInfoAction} from '../../core/actions/auth.actions';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(public store: Store) { }

  ngOnInit() {
    this.store.dispatch(new UserInfoAction());
  }

}
