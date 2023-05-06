package domain

import (
	"testing"
)

func TestAppGroup_MatchName(t *testing.T) {
	type fields struct {
		ID   string
		Name string
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
			fields: fields(*createExpectedAppGroup1Entity()),
			args: args{
				str: "app group name 1",
			},
			want: true,
		},
		{
			name:   "MatchName without match strings",
			fields: fields(*createExpectedAppGroup1Entity()),
			args: args{
				str: "app group name",
			},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			g := &AppGroup{
				ID:   tt.fields.ID,
				Name: tt.fields.Name,
			}
			if got := g.MatchName(tt.args.str); got != tt.want {
				t.Errorf("AppGroup.MatchName() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestAppGroup_LikeName(t *testing.T) {
	type fields struct {
		ID   string
		Name string
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
			fields: fields(*createExpectedAppGroup1Entity()),
			args: args{
				str: "app group name",
			},
			want: true,
		},
		{
			name:   "LikeName with match strings",
			fields: fields(*createExpectedAppGroup1Entity()),
			args: args{
				str: "app group name 1",
			},
			want: true,
		},
		{
			name:   "LikeName without contains strings",
			fields: fields(*createExpectedAppGroup1Entity()),
			args: args{
				str: "apps",
			},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			g := &AppGroup{
				ID:   tt.fields.ID,
				Name: tt.fields.Name,
			}
			if got := g.LikeName(tt.args.str); got != tt.want {
				t.Errorf("AppGroup.LikeName() = %v, want %v", got, tt.want)
			}
		})
	}
}
