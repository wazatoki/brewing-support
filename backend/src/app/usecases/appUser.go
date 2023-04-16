package usecases

import (
	"brewing_support/app/domain"
	"brewing_support/app/utils"
)

type appUserRepo interface {
	Insert(appUser domain.AppUser, opeUserID string) (string, error)
	Update(appUser domain.AppUser, opeUserID string) error
	Select() ([]*domain.AppUser, error)
	SelectByID(id string) (*domain.AppUser, error)
}

func AppUserSave(appUser domain.AppUser, opeUserID string, repo appUserRepo) (id string, err error) {

	if appUser.ID == "" {
		appUser.ID = utils.CreateID()
		id, err = repo.Insert(appUser, opeUserID)

	} else {
		err = repo.Update(appUser, opeUserID)
		id = appUser.ID
	}
	return
}
