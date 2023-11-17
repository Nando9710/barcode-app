import { Injectable } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ShowToastrService {
  constructor(
    private toastr: ToastrService,
  ) {
  }

  showError(msg: string, secondary?: string, timeout?: number): void {
    timeout = timeout ?? 5000;
    this.toastr.error(msg, secondary, {
      timeOut: timeout,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right'
    });
  }

  showSuccess(msg: string, secondary?: string, timeout?: number): void {
    timeout = timeout ?? 5000;

    this.toastr.success(msg, secondary, {
      timeOut: timeout,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right'
    });
  }

  showInfo(msg: string, secondary?: string, timeout?: number): void {
    timeout = timeout ?? 5000;

    this.toastr.info(msg, secondary, {
      timeOut: timeout,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right'
    });
  }
}
