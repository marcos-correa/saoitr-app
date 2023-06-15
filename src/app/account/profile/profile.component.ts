import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isLogged = false;
  user: any = {};

  showUserForm = false;

  constructor(
    private _userService: UserService,
    private _confirmationService: ConfirmationService,
    private _toast: ToastrService
  ) {}

  ngOnInit(): void {
    this._userService.isUserLogged$.subscribe((isLogged) => {
      this.isLogged = isLogged;
    });

    this._userService.user$.subscribe((user) => {
      this.user = user;
    });

    this.getUserApi();
    this.getUserFromSub();
  }

  getUserApi() {
    const { id } = this._userService.getUserFromStorage();
    this._userService.getUserById(String(id));
  }

  getUserFromSub() {
    this._userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  edituser() {
    this.showUserForm = !this.showUserForm;
  }

  saveUser() {
    let { email, name, password, id } = this.user;
    if (!password) {
      password = null;
    }

    let user = {
      email,
      name,
      password,
    };
    this._userService.updateUser(user, id).subscribe({
      next: (user) => {
        this._toast.add({
          severity: 'success',
          summary: 'Deu boa!',
          detail: 'Usuário ' + user.name + ' atualizado com sucesso.',
          life: 3000,
        });
        this.showUserForm = false;
      },
      error: (error) => {
        console.log(error);
      },
      // complete: () => {
      //   this.getUser();
      // }
    });
  }

  deleteUser() {
    // a message to confirm using primeng confirmationdialog
    const message = `Ao deletar sua própria conta, você será deslogado automaticamente. Esse processo não pode ser desfeito. Deseja continuar?`;
    this._confirmationService.confirm({
      message,
      header: 'Deletar Usuário?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this._userService.deleteUser(this.user.id).subscribe({
          next: () => {
            this._toast.add({
              severity: 'success',
              summary: 'Deu boa!',
              detail: 'Usuário deletado com sucesso.',
              life: 3000,
            });
            this._userService.resetUser();
          },
          error: (error) => {
            this._toast.add({
              severity: 'error',
              summary: 'Deu ruim!',
              detail: 'Não foi possível deletar o usuário.',
              life: 3000,
            });
          },
        });
      },
    });
  }
}
