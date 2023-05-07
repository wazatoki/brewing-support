package domain

import "strings"

type AppRole int32

const (
	Unknown AppRole = iota
	Administrator
	MasterAdin
	User
)

var appRoles = [roleEnumCnt]roleAttr{
	{Unknown, "未定義", "unknown", Unknown, Unknown},
	{Administrator, "管理者", "administrator", MasterAdin, User},
	{MasterAdin, "マスターメンテナンス管理者", "master_administrator", User, Administrator},
	{User, "一般ユーザー", "user", Administrator, MasterAdin},
}

const roleEnumCnt = 4

type roleAttr struct {
	V    AppRole
	Ja   string
	En   string
	Next AppRole
	Prev AppRole
}

func (r AppRole) get() roleAttr {
	if r < 0 || r > roleEnumCnt {
		return appRoles[0]
	}

	return appRoles[r]
}

func (r AppRole) Ja() string                  { return r.get().Ja }
func (r AppRole) En() string                  { return r.get().En }
func (r AppRole) Next() AppRole               { return r.get().Next }
func (r AppRole) Prev() AppRole               { return r.get().Prev }
func (r AppRole) IsNextOf(other AppRole) bool { return r.Prev() == other }
func (r AppRole) IsPrevOf(other AppRole) bool { return r.Next() == other }
func (r AppRole) String() string              { return r.Ja() }
func RoleValueOf(s string) AppRole {
	for _, role := range appRoles {
		if strings.EqualFold(s, role.En) || s == role.Ja {
			return role.V
		}
	}
	return Unknown
}
