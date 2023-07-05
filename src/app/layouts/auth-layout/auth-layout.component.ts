import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {UserInfoAction} from '../../core/actions/auth.actions';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  date: Date = new Date();
  public isCollapsed = true;
  public html: any;
  public body: any;

  constructor(private router: Router, public translate: TranslateService, public store: Store) {
  }

  ngOnInit() {
    this.html = document.getElementsByTagName('html')[0];
    this.body = document.getElementsByTagName('body')[0];
    this.html.classList.add('auth-layout');
    this.body.classList.add('bg-default');
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });

  }

  ngOnDestroy() {
    this.html.classList.remove('auth-layout');
    this.body.classList.remove('bg-default');
  }

  onSelectLanguage(lang: string) {
    this.translate.use(lang);
  }
}
