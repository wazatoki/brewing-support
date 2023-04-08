package domain

import (
	"reflect"
	"testing"
)

func createExpectedAppUser1Entity() *AppUser {
	return &AppUser{
		ID:        "appUserId1",
		AccountID: "12345",
		Name:      "name 1",
		Password:  "password 1",
		AppGroups: createExpectedAppGroupEntity1Slice(),
	}
}

func createExpectedAppUser2Entity() *AppUser {
	return &AppUser{
		ID:        "appUserId2",
		AccountID: "22345",
		Name:      "name 2",
		Password:  "password 2",
		AppGroups: AppGroups{
			createExpectedAppGroup1Entity(),
		},
	}
}

func createExpectedAppGroup1Entity() *AppGroup {
	return &AppGroup{
		ID:   "appGroupId1",
		Name: "app group name 1",
	}
}

func createExpectedAppGroup2Entity() *AppGroup {
	return &AppGroup{
		ID:   "appGroupId2",
		Name: "app group name 2",
	}
}

func createExpectedAppGroup3Entity() *AppGroup {
	return &AppGroup{
		ID:   "appGroupId3",
		Name: "app group name 3",
	}
}

func createExpectedAppGroupEntity1Slice() AppGroups {
	return AppGroups{
		createExpectedAppGroup1Entity(),
		createExpectedAppGroup2Entity(),
	}
}

func createExpectedAppGroupEntity2Slice() AppGroups {
	return AppGroups{
		createExpectedAppGroup1Entity(),
		createExpectedAppGroup2Entity(),
		createExpectedAppGroup3Entity(),
	}
}

func TestAppGroups_Sort(t *testing.T) {
	tests := []struct {
		name string
		g    *AppGroups
		want AppGroups
	}{
		{
			name: "sort by appGroup name",
			g: &AppGroups{
				createExpectedAppGroup2Entity(),
				createExpectedAppGroup1Entity(),
				createExpectedAppGroup3Entity(),
			},
			want: AppGroups{
				createExpectedAppGroup1Entity(),
				createExpectedAppGroup2Entity(),
				createExpectedAppGroup3Entity(),
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.g.Sort(); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("AppGroups.Sort() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestAppGroups_FilterByString(t *testing.T) {
	type args struct {
		strSlice []string
	}
	tests := []struct {
		name       string
		g          *AppGroups
		args       args
		wantResult AppGroups
	}{
		{
			name: "filter without strings",
			g: &AppGroups{
				createExpectedAppGroup2Entity(),
				createExpectedAppGroup1Entity(),
				createExpectedAppGroup3Entity(),
			},
			args: args{
				strSlice: []string{},
			},
			wantResult: AppGroups{
				createExpectedAppGroup2Entity(),
				createExpectedAppGroup1Entity(),
				createExpectedAppGroup3Entity(),
			},
		},
		{
			name: "filter with ''",
			g: &AppGroups{
				createExpectedAppGroup2Entity(),
				createExpectedAppGroup1Entity(),
				createExpectedAppGroup3Entity(),
			},
			args: args{
				strSlice: []string{},
			},
			wantResult: AppGroups{
				createExpectedAppGroup2Entity(),
				createExpectedAppGroup1Entity(),
				createExpectedAppGroup3Entity(),
			},
		},
		{
			name: "filter with '1'",
			g: &AppGroups{
				createExpectedAppGroup2Entity(),
				createExpectedAppGroup1Entity(),
				createExpectedAppGroup3Entity(),
			},
			args: args{
				strSlice: []string{"1"},
			},
			wantResult: AppGroups{
				createExpectedAppGroup1Entity(),
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotResult := tt.g.FilterByString(tt.args.strSlice...); !reflect.DeepEqual(gotResult, tt.wantResult) {
				t.Errorf("AppGroups.FilterByString() = %v, want %v", gotResult, tt.wantResult)
			}
		})
	}
}
