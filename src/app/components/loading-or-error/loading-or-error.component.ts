import { Component, ViewChild, Input, TemplateRef } from '@angular/core';
import { LoadingWrapper } from '../../utils/loading-wrapper.util';
import { NgIfContext } from '../../../../node_modules/@angular/common';

@Component({
  selector: 'loading-or-error',
  templateUrl: './loading-or-error.component.html',
  styleUrls: ['./loading-or-error.component.css']
})
export class LoadingOrErrorComponent {
  /**
   * The template that should get created when we are in a loading or error state.
   * Use it in the else condition of *ngIf.
   */
  @ViewChild('template') template: TemplateRef<NgIfContext>|null = null;
  /**
   * The loading wrapper that should be used to show the loading/error state
   */
  @Input('loadingWrapper') loadingWrapper: LoadingWrapper<any>|null = null;
  /**
   * A configurable error message for error cases.
   */
  @Input('errorMessage') errorMessage = 'A error occured!';
}
