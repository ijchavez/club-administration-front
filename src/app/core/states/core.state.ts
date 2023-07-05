import {Injectable, NgZone} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Action, Selector, State, StateContext, StateToken, Store} from '@ngxs/store';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {MessageType, ShowMessageAction} from '../actions/core.actions';
import {ToastrService} from 'ngx-toastr';
import {AuthModel} from '../models/auth.model';
import {
  AddCategoryTypeAction,
  CategoryTypeListActions,
  CategoryTypeListRootsActions,
  DeleteCategoryTypeAction,
  SubCategoryTypeByCategoryIdActions,
  UpdateCategoryTypeAction
} from '../actions/category-type.actions';
import {catchError, tap} from 'rxjs/operators';
import {PageModel} from '../models/page.model';
import {CategoryTypeModel} from '../models/category-type.model';
import {throwError} from 'rxjs';
import {CategoryTypesService} from '../services/category-types.service';
import {ContributionSuggestedModel} from '../models/contribution-suggested.model';
import {ContributionSuggestedService} from '../services/contribution-suggested.service';
import {
  AddContributionSuggestedAction,
  ContributionSuggestedListActions,
  DeleteContributionSuggestedAction,
  UpdateContributionSuggestedAction
} from '../actions/contribution-suggested.actions';
import {MemberModel} from '../models/member.model';
import {AddMembersAction, DeleteMembersAction, MembersListActions, UpdateMembersAction} from '../actions/members.actions';
import {MembersService} from '../services/members.service';
import {PartnerModel} from '../models/partner.model';
import {AddPartnerAction, DeletePartnerAction, PartnersListActions, UpdatePartnerAction} from '../actions/partners.actions';
import {PartnerService} from '../services/partner.service';
import {ContributionsModel} from '../models/contributions.model';
import {
  AddContributionsAction,
  ContributionsListsActions, ExportContributionsByMonthAction,
  GetContributionsByMonthAction,
  UpdateContributionsAction
} from '../actions/contributions.actions';
import {ContributionsService} from '../services/contributions.service';
import {MemberFilterModel} from '../models/member-filter.model';

export interface CoreStateModel {
  initError: string;
  login: boolean;
  token: AuthModel;
  pageCategory: PageModel<CategoryTypeModel>;
  pageMembers: PageModel<MemberModel>;
  pagePartners: PageModel<PartnerModel>;
  rootCategories: CategoryTypeModel[];
  subCategories: CategoryTypeModel[];
  categoryUpdated: boolean;
  memberUpdated: boolean;
  memberFilter: MemberFilterModel;
  partnerUpdated: boolean;
  contributionUpdated: boolean;
  pageContributionSuggested: PageModel<ContributionSuggestedModel>;
  pageContributions: PageModel<ContributionsModel>;
  contributions: ContributionsModel[];
}

const initialState: CoreStateModel = {
  initError: null,
  login: false,
  token: null,
  pageCategory: new PageModel<CategoryTypeModel>(),
  pageMembers: new PageModel<MemberModel>(),
  pagePartners: new PageModel<PartnerModel>(),
  rootCategories: [],
  subCategories: [],
  categoryUpdated: false,
  memberUpdated: false,
  partnerUpdated: false,
  contributionUpdated: false,
  memberFilter: new MemberFilterModel(),
  pageContributionSuggested: new PageModel<ContributionSuggestedModel>(),
  pageContributions: new PageModel<ContributionsModel>(),
  contributions: [],
};

const CORE_STATE_TOKEN = new StateToken<CoreStateModel>('core');

@State<CoreStateModel>({
  name: CORE_STATE_TOKEN,
  defaults: initialState
})
@Injectable()
export class CoreState {

  constructor(
    private translate: TranslateService,
    private store: Store,
    private ngZone: NgZone,
    private categoryTypesService: CategoryTypesService,
    private contributionSuggestedService: ContributionSuggestedService,
    private contributionsService: ContributionsService,
    private memberService: MembersService,
    private partnerService: PartnerService,
    private toast: ToastrService,
  ) {
  }

  @BlockUI() blockUI: NgBlockUI;

  @Selector()
  static getPageCategory(state: CoreStateModel) {
    return state.pageCategory;
  }

  @Selector()
  static getPageMember(state: CoreStateModel) {
    return state.pageMembers;
  }
  @Selector()
  static getMemberFilter(state: CoreStateModel) {
    return state.memberFilter;
  }
  @Selector()
  static getPagePartner(state: CoreStateModel) {
    return state.pagePartners;
  }

  @Selector()
  static getPageContributionSuggested(state: CoreStateModel) {
    return state.pageContributionSuggested;
  }

  @Selector()
  static getPageContributions(state: CoreStateModel) {
    return state.pageContributions;
  }

  @Selector()
  static getPageCategoriesRoots(state: CoreStateModel) {
    return state.rootCategories;
  }

  @Selector()
  static getSubCategories(state: CoreStateModel) {
    return state.subCategories;
  }

  @Selector()
  static getCategoryUpdated(state: CoreStateModel) {
    return state.categoryUpdated;
  }

  @Selector()
  static getContributionUpdated(state: CoreStateModel) {
    return state.contributionUpdated;
  }

  @Selector()
  static getMemberUpdated(state: CoreStateModel) {
    return state.memberUpdated;
  }
 @Selector()
  static getContributions(state: CoreStateModel) {
    return state.contributions;
  }

  @Selector()
  static getPartnerUpdated(state: CoreStateModel) {
    return state.partnerUpdated;
  }

  @Action(ContributionsListsActions)
  getContributionsListsActions(ctx: StateContext<CoreStateModel>, action: ContributionsListsActions) {
    return this.ngZone.run(() => {
      return this.contributionsService.getContributions(action.payload.page, action.payload.size).pipe(
        tap((model: PageModel<ContributionsModel>) => {
          ctx.patchState({
            pageContributions: model,
            contributionUpdated: false
          });
        }),
        catchError(err => {
          return throwError(err);
        }));
    });
  }
  @Action(GetContributionsByMonthAction)
  getContributionsByMonthAction(ctx: StateContext<CoreStateModel>, action: GetContributionsByMonthAction) {
    return this.ngZone.run(() => {
      return this.contributionsService.getContributionsByMonth(action.payload.month, action.payload.year).pipe(
        tap((model: ContributionsModel[]) => {
          ctx.patchState({
            contributions: model
          });
        }),
        catchError(err => {
          return throwError(err);
        }));
    });
  }
 @Action(ExportContributionsByMonthAction)
 exportContributionsByMonthAction(ctx: StateContext<CoreStateModel>, action: ExportContributionsByMonthAction) {
    return this.ngZone.run(() => {
      return this.contributionsService.exportContributionsByMonth(action.payload.month, action.payload.year).pipe(
        tap((model: any) => {
          console.log(model);
        }),
        catchError(err => {
          return throwError(err);
        }));
    });
  }

  @Action(AddContributionsAction)
  addContributionsAction(ctx: StateContext<CoreStateModel>, action: AddContributionsAction) {
    this.blockUI.start();
    return this.ngZone.run(() => {
      return this.contributionsService.addContributions(action.payload).pipe(
        tap(() => {
          this.blockUI.stop();
          ctx.patchState({
            contributionUpdated: true
          });
          ctx.dispatch(new ShowMessageAction({msg: 'Contribución ingresada satisfactoriamente', type: MessageType.SUCCESS, title: ''}));
        }),
        catchError(err => {
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({msg: 'Ha ocurrido un error al ingrsar la contribución', type: MessageType.ERROR, title: ''}));
          return throwError(err);
        }));
    });
  }

  @Action(UpdateContributionsAction)
  updateContributionsAction(ctx: StateContext<CoreStateModel>, action: UpdateContributionsAction) {
    this.blockUI.start();
    return this.ngZone.run(() => {
      return this.contributionsService.updateContributions(action.payload).pipe(
        tap(() => {
          this.blockUI.stop();
          ctx.patchState({
            contributionUpdated: true
          });
          ctx.dispatch(new ShowMessageAction({msg: 'Contribución actualizada satisfactoriamente', type: MessageType.SUCCESS, title: ''}));
        }),
        catchError(err => {
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Ha ocurrido un error al modificar la contribución',
            type: MessageType.ERROR, title: ''
          }));
          return throwError(err);
        }));
    });
  }

  @Action(ContributionSuggestedListActions)
  getContributionSuggestedListActions(ctx: StateContext<CoreStateModel>, action: ContributionSuggestedListActions) {
    return this.ngZone.run(() => {
      return this.contributionSuggestedService.getContributionSuggested(action.payload.page, action.payload.size).pipe(
        tap((model: PageModel<ContributionSuggestedModel>) => {
          ctx.patchState({
            pageContributionSuggested: model,
            categoryUpdated: false
          });
        }),
        catchError(err => {
          return throwError(err);
        }));
    });
  }

  // MEMBERS
  @Action(MembersListActions)
  getMembersListActions(ctx: StateContext<CoreStateModel>, action: MembersListActions) {
    ctx.patchState({
      memberUpdated: false,
      memberFilter: action.payload.filter
    });
    return this.ngZone.run(() => {
      return this.memberService.getMembers(action.payload.page, action.payload.size, action.payload.filter).pipe(
        tap((model: PageModel<MemberModel>) => {
          ctx.patchState({
            pageMembers: model
          });
        }),
        catchError(err => {
          return throwError(err);
        }));
    });
  }

  @Action(DeleteMembersAction)
  deleteMembersAction(ctx: StateContext<CoreStateModel>, action: DeleteMembersAction) {
    this.blockUI.start();
    return this.ngZone.run(() => {
      return this.memberService.deleteMember(action.payload).pipe(
        tap(() => {
          const page = this.store.selectSnapshot(CoreState.getPageMember);
          const filter = this.store.selectSnapshot(CoreState.getMemberFilter);
          ctx.dispatch(new MembersListActions({page: page.number, size: page.size, filter}));
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Miembro eliminado satisfactoriamente',
            type: MessageType.SUCCESS,
            title: ''
          }));
        }),
        catchError(err => {
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Ha ocurrido un error al eliminar el miembro.',
            type: MessageType.ERROR,
            title: ''
          }));
          return throwError(err);
        }));
    });
  }

  @Action(AddMembersAction)
  addMembersAction(ctx: StateContext<CoreStateModel>, action: AddMembersAction) {
    this.blockUI.start();
    return this.ngZone.run(() => {
      return this.memberService.addMember(action.payload).pipe(
        tap(() => {
          ctx.patchState({
            memberUpdated: true
          });
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Miembro adicionado satisfactoriamente',
            type: MessageType.SUCCESS,
            title: ''
          }));
        }),
        catchError(err => {
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Ha ocurrido un error al adicionar el miembro.',
            type: MessageType.ERROR,
            title: ''
          }));
          return throwError(err);
        }));
    });
  }

  @Action(UpdateMembersAction)
  updateMembersAction(ctx: StateContext<CoreStateModel>, action: UpdateMembersAction) {
    this.blockUI.start();
    return this.ngZone.run(() => {
      return this.memberService.updateMember(action.payload).pipe(
        tap(() => {
          ctx.patchState({
            memberUpdated: true
          });
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Miembro actualizado satisfactoriamente',
            type: MessageType.SUCCESS,
            title: ''
          }));
        }),
        catchError(err => {
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Ha ocurrido un error al actualizar el miembro.',
            type: MessageType.ERROR,
            title: ''
          }));
          return throwError(err);
        }));
    });
  }

  // CONTRIBUTIONS SUGGESTED
  @Action(AddContributionSuggestedAction)
  addContributionSuggestedAction(ctx: StateContext<CoreStateModel>, action: AddContributionSuggestedAction) {
    this.blockUI.start();
    return this.ngZone.run(() => {
      return this.contributionSuggestedService.addContributionSuggested(action.payload).pipe(
        tap(() => {
          ctx.patchState({
            categoryUpdated: true
          });
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Contribucion sugerida adicionada satisfactoriamente',
            type: MessageType.SUCCESS,
            title: ''
          }));
        }),
        catchError(err => {
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Ha ocurrido un error al adicionar la contribución sugerida',
            type: MessageType.ERROR,
            title: ''
          }));
          return throwError(err);
        }));
    });
  }

  @Action(UpdateContributionSuggestedAction)
  updateContributionSuggestedAction(ctx: StateContext<CoreStateModel>, action: UpdateContributionSuggestedAction) {
    this.blockUI.start();
    return this.ngZone.run(() => {
      return this.contributionSuggestedService.updateContributionSuggested(action.payload).pipe(
        tap(() => {
          ctx.patchState({
            categoryUpdated: true
          });
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Contribucion sugerida actualizada satisfactoriamente',
            type: MessageType.SUCCESS,
            title: ''
          }));
        }),
        catchError(err => {
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Ha ocurrido un error al actualizar la contribución sugerida',
            type: MessageType.ERROR,
            title: ''
          }));
          return throwError(err);
        }));
    });
  }

  @Action(DeleteContributionSuggestedAction)
  deleteContributionSuggestedAction(ctx: StateContext<CoreStateModel>, action: DeleteContributionSuggestedAction) {
    this.blockUI.start();
    return this.ngZone.run(() => {
      return this.contributionSuggestedService.deleteContributionSuggested(action.payload).pipe(
        tap(() => {
          const page = this.store.selectSnapshot(CoreState.getPageContributionSuggested);
          ctx.dispatch(new ContributionSuggestedListActions({page: page.number, size: page.size}));
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Contribucion sugerida eliminada satisfactoriamente',
            type: MessageType.SUCCESS,
            title: ''
          }));
        }),
        catchError(err => {
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Ha ocurrido un error al eliminar la contribución sugerida',
            type: MessageType.ERROR,
            title: ''
          }));
          return throwError(err);
        }));
    });
  }

  @Action(CategoryTypeListActions)
  getCategoryTypeListActions(ctx: StateContext<CoreStateModel>, action: CategoryTypeListActions) {
    return this.ngZone.run(() => {
      return this.categoryTypesService.getCategoryTypes(action.payload.page, action.payload.size).pipe(
        tap((model: PageModel<CategoryTypeModel>) => {
          ctx.patchState({
            pageCategory: model,
            categoryUpdated: false
          });
        }),
        catchError(err => {
          return throwError(err);
        }));
    });
  }

  @Action(CategoryTypeListRootsActions)
  getCategoryTypeListRootsActions(ctx: StateContext<CoreStateModel>) {
    return this.ngZone.run(() => {
      return this.categoryTypesService.getCategoryTypesRoots().pipe(
        tap((categoryRoots: CategoryTypeModel[]) => {
          ctx.patchState({
            rootCategories: categoryRoots
          });
        }),
        catchError(err => {
          return throwError(err);
        }));
    });
  }

  @Action(SubCategoryTypeByCategoryIdActions)
  subCategoryTypeByCategoryIdActions(ctx: StateContext<CoreStateModel>, action: SubCategoryTypeByCategoryIdActions) {
    if (action.payload && action.payload.id) {
      return this.ngZone.run(() => {
        return this.categoryTypesService.getSubCategoryTypeById(action.payload).pipe(
          tap((subCategories: CategoryTypeModel[]) => {
            ctx.patchState({
              subCategories
            });
          }),
          catchError(err => {
            return throwError(err);
          }));
      });
    } else {
      ctx.patchState({
        subCategories: []
      });
    }

  }

  @Action(UpdateCategoryTypeAction)
  updateCategoryTypeAction(ctx: StateContext<CoreStateModel>, action: UpdateCategoryTypeAction) {
    this.blockUI.start();
    return this.ngZone.run(() => {
      return this.categoryTypesService.updateCategoryType(action.payload).pipe(
        tap(() => {
          ctx.patchState({
            categoryUpdated: true
          });
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Tipo de categoría actualizada satisfactoriamente',
            type: MessageType.SUCCESS,
            title: ''
          }));
        }),
        catchError(err => {
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Ha ocurrido un error al actualizar el tipo de categoría',
            type: MessageType.ERROR,
            title: ''
          }));
          return throwError(err);
        }));
    });
  }

  @Action(AddCategoryTypeAction)
  addCategoryTypeAction(ctx: StateContext<CoreStateModel>, action: AddCategoryTypeAction) {
    this.blockUI.start();
    return this.ngZone.run(() => {
      return this.categoryTypesService.addCategoryType(action.payload).pipe(
        tap(() => {
          ctx.patchState({
            categoryUpdated: true
          });
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Tipo de categoría adicionada satisfactoriamente',
            type: MessageType.SUCCESS,
            title: ''
          }));
        }),
        catchError(err => {
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Ha ocurrido un error al adicionar el tipo de categoría',
            type: MessageType.ERROR,
            title: ''
          }));
          return throwError(err);
        }));
    });
  }

  @Action(DeleteCategoryTypeAction)
  deleteCategoryTypeAction(ctx: StateContext<CoreStateModel>, action: DeleteCategoryTypeAction) {
    this.blockUI.start();
    return this.ngZone.run(() => {
      return this.categoryTypesService.deleteCategoryType(action.payload).pipe(
        tap(() => {
          const page = this.store.selectSnapshot(CoreState.getPageCategory);
          ctx.dispatch(new CategoryTypeListActions({page: page.number, size: page.size}));
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Tipo de categoría eliminada satisfactoriamente',
            type: MessageType.SUCCESS,
            title: ''
          }));
        }),
        catchError(err => {
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Ha ocurrido un error al eliminar el tipo de categoría',
            type: MessageType.ERROR,
            title: ''
          }));
          return throwError(err);
        }));
    });
  }


  // PARTNER
  @Action(PartnersListActions)
  getPartnersListActions(ctx: StateContext<CoreStateModel>, action: PartnersListActions) {
    ctx.patchState({
      partnerUpdated: false
    });
    return this.ngZone.run(() => {
      return this.partnerService.getPartners(action.payload.page, action.payload.size).pipe(
        tap((model: PageModel<PartnerModel>) => {
          ctx.patchState({
            pagePartners: model
          });
        }),
        catchError(err => {
          return throwError(err);
        }));
    });
  }

  @Action(AddPartnerAction)
  addPartnerAction(ctx: StateContext<CoreStateModel>, action: AddPartnerAction) {
    this.blockUI.start();
    return this.ngZone.run(() => {
      return this.partnerService.addPartner(action.payload).pipe(
        tap(() => {
          ctx.patchState({
            partnerUpdated: true
          });
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Socio adicionado satisfactoriamente',
            type: MessageType.SUCCESS,
            title: ''
          }));
        }),
        catchError(err => {
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Ha ocurrido un error al adicionar el socio',
            type: MessageType.ERROR,
            title: ''
          }));
          return throwError(err);
        }));
    });
  }

  @Action(UpdatePartnerAction)
  updatePartnerAction(ctx: StateContext<CoreStateModel>, action: UpdatePartnerAction) {
    return this.ngZone.run(() => {
      this.blockUI.start();
      return this.partnerService.updatePartner(action.payload).pipe(
        tap(() => {
          ctx.patchState({
            partnerUpdated: true
          });
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Socio actualizado satisfactoriamente',
            type: MessageType.SUCCESS,
            title: ''
          }));
        }),
        catchError(err => {
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Ha ocurrido un error al actualizar el socio',
            type: MessageType.ERROR,
            title: ''
          }));
          return throwError(err);
        }));
    });
  }

  @Action(DeletePartnerAction)
  deletePartnerAction(ctx: StateContext<CoreStateModel>, action: DeletePartnerAction) {
    this.blockUI.start();
    return this.ngZone.run(() => {
      return this.partnerService.deletePartner(action.payload).pipe(
        tap(() => {
          const page = this.store.selectSnapshot(CoreState.getPagePartner);
          ctx.dispatch(new PartnersListActions({page: page.number, size: page.size}));
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Socio eliminado satisfactoriamente',
            type: MessageType.SUCCESS,
            title: ''
          }));
        }),
        catchError(err => {
          this.blockUI.stop();
          ctx.dispatch(new ShowMessageAction({
            msg: 'Ha ocurrido un error al eliminar el socio',
            type: MessageType.ERROR,
            title: ''
          }));
          return throwError(err);
        }));
    });
  }


  @Action(ShowMessageAction)
  showMessageAction(ctx: StateContext<CoreStateModel>, action: ShowMessageAction) {

    const {msg, title, type, options} = action.payload;

    const translatedMsg = this.translate.instant(msg);
    const translatedTitle = title ? this.translate.instant(title) : title;

    return this.ngZone.run(() => {
      switch (type) {
        case MessageType.ERROR:
          this.toast.error(translatedMsg, translatedTitle, options);
          break;

        case MessageType.WARNING:
          this.toast.warning(translatedMsg, translatedTitle, options);
          break;

        case MessageType.INFO:
          this.toast.info(translatedMsg, translatedTitle, options);
          break;

        default:
          this.toast.success(translatedMsg, translatedTitle, options);
          break;
      }
    });
  }

}
