package domain

// Staff 利用者グループを示す構造体
type AppUser struct {
	ID        string    `json:"id"`
	AccountID string    `json:"accountID"`
	Password  string    `json:"password"`
	Name      string    `json:"name"`
	AppGroups AppGroups `json:"appGroups"`
}

// Group 利用者グループを示す構造体
type AppGroup struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}
