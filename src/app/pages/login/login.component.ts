import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {LoginAction} from '../../core/actions/auth.actions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginModel} from '../../core/models/login.model';
import {AuthState} from '../../core/states/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @Select(AuthState.getLogin) login$: Observable<boolean>;
  public model: LoginModel;
  public loginForm: FormGroup;

  constructor(private store: Store, private formBuilder: FormBuilder, public translate: TranslateService) {
    this.createForm();
  }

  ngOnInit() {
    this.model = new LoginModel();
    this.login$.subscribe(value => {
      if (value) {
        this.store.dispatch(new Navigate(['dashboard']));
      }
    });
  }

  ngOnDestroy() {
  }

  onCreateAccount() {
    this.store.dispatch(new Navigate(['register']));
  }

  onLogin() {
    if (this.loginForm.valid){
      this.store.dispatch(new LoginAction(this.buildLogin()));
    }
  }
  buildLogin(): LoginModel {
    return {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
