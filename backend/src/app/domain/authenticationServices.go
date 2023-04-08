package domain

import (
	"sort"
	"strings"
)

type AppGroups []*AppGroup

/*
FilterByString is filter appGroup slice by string
*/
func (g *AppGroups) FilterByString(strSlice ...string) (result AppGroups) {
	staffGroups := *g

	if len(strSlice) == 0 {

		result = staffGroups

		return
	}

	isContains := func(appGroup *AppGroup, str string) bool {

		if str == "" {
			return true
		}

		return strings.Contains(appGroup.Name, str)
	}

	for _, s := range strSlice {
		result = AppGroups{}
		for _, group := range staffGroups {

			if isContains(group, s) {
				result = append(result, group)
			}
		}
		staffGroups = result
	}

	return

}

/*
Sort is sort appGroup slice by name
*/
func (g *AppGroups) Sort() AppGroups {
	staffGroups := *g
	sort.Slice(staffGroups, func(i int, j int) bool {

		return staffGroups[i].Name < staffGroups[j].Name

	})
	return staffGroups
}
