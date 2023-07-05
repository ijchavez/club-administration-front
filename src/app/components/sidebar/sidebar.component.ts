import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {LogoutAction} from '../../core/actions/auth.actions';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni ni-tv-2 text-primary', class: '' },
    { path: '/contributions', title: 'Contribuciones',  icon:'fa fa-donate text-blue', class: '' },
    { path: '/category-type', title: 'Tipos de Categorias',  icon:'fa fa-tags text-blue', class: '' },
    { path: '/contribution-suggested', title: 'Contribuciones sugeridas',  icon:'fa fa-university text-blue', class: '' },
    { path: '/members', title: 'Miembros',  icon:'fa fa-users text-blue', class: '' },
    { path: '/partners', title: 'Socios',  icon:'fa fa-handshake text-blue', class: '' }
];

export const ROUTES2: RouteInfo[] = [
  { path: '/reports', title: 'Reporte',  icon: 'fa fa-file text-primary', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public menuReports: any[];
  public isCollapsed = true;

  constructor(private router: Router, private store: Store) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.menuReports = ROUTES2.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  logOut() {
    this.store.dispatch(new LogoutAction());
  }
}
