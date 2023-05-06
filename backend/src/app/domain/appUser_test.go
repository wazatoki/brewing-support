package domain

import (
	"testing"
)

func TestAppUser_MatchAccountID(t *testing.T) {
	type fields struct {
		ID        string
		AccountID string
		Password  string
		Name      string
		AppGroups AppGroups
	}
	type args struct {
		str string
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		want   bool
	}{
		{
			name:   "MatchAccountID with match strings",
			fields: fields(*createExpectedAppUser1Entity()),
			args: args{
				str: "12345",
			},
			want: true,
		},
		{
			name:   "MatchAccountID without match strings",
			fields: fields(*createExpectedAppUser1Entity()),
			args: args{
				str: "1234512345",
			},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			u := &AppUser{
				ID:        tt.fields.ID,
				AccountID: tt.fields.AccountID,
				Password:  tt.fields.Password,
				Name:      tt.fields.Name,
				AppGroups: tt.fields.AppGroups,
			}
			if got := u.MatchAccountID(tt.args.str); got != tt.want {
				t.Errorf("AppUser.MatchAccountID() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestAppUser_MatchName(t *testing.T) {
	type fields struct {
		ID        string
		AccountID string
		Password  string
		Name      string
		AppGroups AppGroups
	}
	type args struct {
		str string
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		want   bool
	}{
		{
			name:   "MatchName with match strings",
			fields: fields(*createExpectedAppUser1Entity()),
			args: args{
				str: "name 1",
			},
			want: true,
		},
		{
			name:   "MatchName without match strings",
			fields: fields(*createExpectedAppUser1Entity()),
			args: args{
				str: "name",
			},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			u := &AppUser{
				ID:        tt.fields.ID,
				AccountID: tt.fields.AccountID,
				Password:  tt.fields.Password,
				Name:      tt.fields.Name,
				AppGroups: tt.fields.AppGroups,
			}
			if got := u.MatchName(tt.args.str); got != tt.want {
				t.Errorf("AppUser.MatchName() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestAppUser_LikeName(t *testing.T) {
	type fields struct {
		ID        string
		AccountID string
		Password  string
		Name      string
		AppGroups AppGroups
	}
	type args struct {
		str string
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		want   bool
	}{
		{
			name:   "LikeName with contains strings",
			fields: fields(*createExpectedAppUser1Entity()),
			args: args{
				str: "name",
			},
			want: true,
		},
		{
			name:   "LikeName with match strings",
			fields: fields(*createExpectedAppUser1Entity()),
			args: args{
				str: "name 1",
			},
			want: true,
		},
		{
			name:   "LikeName without contains strings",
			fields: fields(*createExpectedAppUser1Entity()),
			args: args{
				str: "name3",
			},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			u := &AppUser{
				ID:        tt.fields.ID,
				AccountID: tt.fields.AccountID,
				Password:  tt.fields.Password,
				Name:      tt.fields.Name,
				AppGroups: tt.fields.AppGroups,
			}
			if got := u.LikeName(tt.args.str); got != tt.want {
				t.Errorf("AppUser.LikeName() = %v, want %v", got, tt.want)
			}
		})
	}
}
