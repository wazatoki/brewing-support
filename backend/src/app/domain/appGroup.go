package domain

import "strings"

// Group 利用者グループを示す構造体
type AppGroup struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func (g *AppGroup) MatchName(str string) bool {
	return g.Name == str
}

func (g *AppGroup) LikeName(str string) bool {
	return strings.Contains(g.Name, str)
}
