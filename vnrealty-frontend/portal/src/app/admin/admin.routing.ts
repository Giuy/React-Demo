import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from 'app/core/guards/authorize.guard';
import { AdminComponent } from './container/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'news-category',
        loadChildren: () => import('./pages/news-category/news-category.module').then((m) => m.NewsCategoryModule),
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'news',
        loadChildren: () => import('./pages/news/news.module').then((m) => m.NewsModule),
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'social-network',
        loadChildren: () => import('./pages/social-network/social-network.module').then((m) => m.SocialNetworkModule),
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'contact-email',
        loadChildren: () => import('./pages/contact-email/contact-email.module').then((m) => m.ContactEmailModule),
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'banner',
        loadChildren: () => import('./pages/banner/banner.module').then((m) => m.BannerModule),
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'attachment',
        loadChildren: () => import('./pages/attachment/attachment.module').then((m) => m.AttachmentModule),
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'common-config',
        loadChildren: () => import('./pages/common-config/common-config.module').then((m) => m.CommonConfigModule),
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'contact-customer',
        loadChildren: () =>
          import('./pages/contact-customer/contact-customer.module').then((m) => m.ContactCustomerModule),
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'contact-customer',
        loadChildren: () =>
          import('./pages/contact-customer/contact-customer.module').then((m) => m.ContactCustomerModule),
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'project-type',
        loadChildren: () => import('./pages/project-type/project-type.module').then((m) => m.ProjectTypeModule),
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'project',
        loadChildren: () => import('./pages/project/project.module').then((m) => m.ProjectModule),
        // canActivate: [AuthorizeGuard],
      },

      {
        path: 'customer-information',
        loadChildren: () =>
          import('./pages/customer-information/customer-information.module').then((m) => m.CustomerInformationModule),
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'customer-review',
        loadChildren: () =>
          import('./pages/customer-review/customer-review.module').then((m) => m.CustomerReviewModule),
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'our-services',
        loadChildren: () => import('./pages/our-services/our-services.module').then((m) => m.OurServicesModule),
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'our-teams',
        loadChildren: () => import('./pages/our-teams/our-teams.module').then((m) => m.OurTeamsModule),
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'our-partners',
        loadChildren: () => import('./pages/our-partners/our-partners.module').then((m) => m.OurPartnersModule),
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'master-data',
        loadChildren: () => import('./pages/master-data/master-data.module').then((m) => m.MasterDataModule),
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'maintenance-request',
        loadChildren: () =>
          import('./pages/maintenance-request/maintenance-request.module').then((m) => m.MaintenanceRequestModule),
     
      },
      {
        path: '',
        loadChildren: () => import('./pages/property/property.module').then((m) => m.PropertyModule),
      
      },
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   redirectTo: '/',
      // },
    ],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'login-callback',
    loadChildren: () => import('./pages/login-callback/login-callback.module').then((m) => m.LoginCallBackModule),
  },
  {
    path: 'logout-callback',
    loadChildren: () => import('./pages/logout-callback/logout-callback.module').then((m) => m.LogoutCallBackModule),
  },
  /*
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./pages/forget-password/forget-password.module').then((m) => m.ForgetPasswordModule),
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
