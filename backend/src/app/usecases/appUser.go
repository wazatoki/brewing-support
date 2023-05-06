//go:generate mockgen -source=$GOFILE -package=mock_$GOPACKAGE -destination=../mock/$GOPACKAGE/$GOFILE
package usecases

import (
	"brewing_support/app/domain"
	"brewing_support/app/utils"
	"errors"
)

type appUserRepo interface {
	Insert(appUser domain.AppUser, opeUserID string) (string, error)
	Update(appUser domain.AppUser, opeUserID string) error
	Select() ([]*domain.AppUser, error)
	SelectByID(id string) (*domain.AppUser, error)
	Delete(id string, opeUserID string) error
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

func AppUserRemove(appUser domain.AppUser, opeUserID string, repo appUserRepo) (err error) {
	if appUser.ID == "" {
		return errors.New("id must be required")
	}

	err = repo.Delete(appUser.ID, opeUserID)

	return
}
