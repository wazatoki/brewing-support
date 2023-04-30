package usecases

import (
	"brewing_support/app/domain"
	mock_usecases "brewing_support/app/mock/usecases"
	"brewing_support/app/testutils"
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"

	gomock "github.com/golang/mock/gomock"
)

func createExpectedAppUser0Entity() *domain.AppUser {
	return &domain.AppUser{
		ID:        "",
		AccountID: "12345",
		Name:      "name 0",
		Password:  "password 0",
		AppGroups: createExpectedAppGroupEntity1Slice(),
	}
}

func createExpectedAppUser1Entity() *domain.AppUser {
	return &domain.AppUser{
		ID:        "appUserId1",
		AccountID: "12345",
		Name:      "name 1",
		Password:  "password 1",
		AppGroups: createExpectedAppGroupEntity1Slice(),
	}
}

func createExpectedAppUser2Entity() *domain.AppUser {
	return &domain.AppUser{
		ID:        "appUserId2",
		AccountID: "22345",
		Name:      "name 2",
		Password:  "password 2",
		AppGroups: domain.AppGroups{
			createExpectedAppGroup1Entity(),
		},
	}
}

func createExpectedAppGroup1Entity() *domain.AppGroup {
	return &domain.AppGroup{
		ID:   "appGroupId1",
		Name: "app group name 1",
	}
}

func createExpectedAppGroup2Entity() *domain.AppGroup {
	return &domain.AppGroup{
		ID:   "appGroupId2",
		Name: "app group name 2",
	}
}

func createExpectedAppGroup3Entity() *domain.AppGroup {
	return &domain.AppGroup{
		ID:   "appGroupId3",
		Name: "app group name 3",
	}
}

func createExpectedAppGroupEntity1Slice() domain.AppGroups {
	return domain.AppGroups{
		createExpectedAppGroup1Entity(),
		createExpectedAppGroup2Entity(),
	}
}

func TestAppUserSave(t *testing.T) {
	// mockのコントローラを作成する
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	// appUserRepo interfaceのmockを作成する
	appUserRepoMock := mock_usecases.NewMockappUserRepo(ctrl)

	setUpInsertMock := func(mock *mock_usecases.MockappUserRepo, appUser domain.AppUser, opeUserID string) *mock_usecases.MockappUserRepo {
		mock.EXPECT().Insert(
			testutils.NewMatcher(appUser, func(a, b interface{}) bool {
				if diff := cmp.Diff(a, b, cmpopts.IgnoreFields(domain.AppUser{}, "ID")); diff != "" {
					t.Errorf("appUserRepoMock.Insert mismatch : %s", diff)
					return false
				}
				return true
			}), gomock.Eq(opeUserID)).Return("appUserId0", nil)
		return mock
	}

	setUpUpdateMock := func(mock *mock_usecases.MockappUserRepo, appUser domain.AppUser, opeUserID string) *mock_usecases.MockappUserRepo {
		mock.EXPECT().Update(appUser, opeUserID).Return(nil)
		return mock
	}

	type args struct {
		appUser   domain.AppUser
		opeUserID string
		repo      appUserRepo
	}
	tests := []struct {
		name    string
		mock    *mock_usecases.MockappUserRepo
		args    args
		wantId  string
		wantErr bool
	}{
		{
			name: "save without id shall called insert",
			mock: setUpInsertMock(appUserRepoMock, *(createExpectedAppUser0Entity()), "appUserId1"),
			args: args{
				appUser:   *(createExpectedAppUser0Entity()),
				opeUserID: "appUserId1",
				repo:      appUserRepoMock,
			},
			wantId:  "appUserId0",
			wantErr: false,
		},
		{
			name: "save with id shall called update",
			mock: setUpUpdateMock(appUserRepoMock, *(createExpectedAppUser1Entity()), "appUserId1"),
			args: args{
				appUser:   *(createExpectedAppUser1Entity()),
				opeUserID: "appUserId1",
				repo:      appUserRepoMock,
			},
			wantId:  "appUserId1",
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {

			gotId, err := AppUserSave(tt.args.appUser, tt.args.opeUserID, tt.args.repo)

			if (err != nil) != tt.wantErr {
				t.Errorf("AppUserSave() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if gotId != tt.wantId {
				t.Errorf("AppUserSave() = %v, want %v", gotId, tt.wantId)
			}
		})
	}
}
