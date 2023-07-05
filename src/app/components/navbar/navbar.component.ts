import {Component, ElementRef, OnInit} from '@angular/core';
import {ROUTES} from '../sidebar/sidebar.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {LogoutAction} from '../../core/actions/auth.actions';
import {AuthState} from '../../core/states/auth.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Select(AuthState.getFullName) fullName$: Observable<string>;
  public focus;
  public listTitles: any[];
  public location: Location;

  constructor(location: Location, private element: ElementRef, private router: Router, private store: Store) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  logOut() {
    this.store.dispatch(new LogoutAction());
  }

}
