package domain

import "strings"

// Staff 利用者グループを示す構造体
type AppUser struct {
	ID        string    `json:"id"`
	AccountID string    `json:"accountID"`
	Password  string    `json:"password"`
	Name      string    `json:"name"`
	AppGroups AppGroups `json:"appGroups"`
}

func (u *AppUser) MatchAccountID(str string) bool {
	return u.AccountID == str
}

func (u *AppUser) MatchName(str string) bool {
	return u.Name == str
}

func (u *AppUser) LikeName(str string) bool {
	return strings.Contains(u.Name, str)
}
